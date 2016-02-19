import Base from './base'
import Git from './git'
import extend from 'extend'
import fs from 'fs'
import path from 'path'
import url from 'url'
import semver from 'semver'
import shelljs from 'shelljs'

const Default = {
  branch: 'dist',     // The branch to commit to.
  dir: 'dist',        // The directory that contains your built code.
  remote: {
    repo: '../',      // The remote repo to push to (URL|RemoteName|FileSystemPath). Common examples include:
                      //   - `git@github.com:alienfast/foo.git` - your main project's remote (gh-pages branch)
                      //   - `../` - the local project repository itself

    // If token && login are provided, the remote.repo will be formatted to include these
    login: undefined,
    token: undefined,
    branch: undefined// The remote branch to push to. Common usage would be for Heroku's master branch requirement.
  },
  tag: {
    name: undefined   // fn or string.  Default will autoresolve from the package.json version if possible.  Pass false to avoid tagging.
  },
  push: false,        // Pushes `branch` to remote. If tag is set, pushes the specified tag as well.
  commit: {
    auto: false,      // Commits built code to `branch`. A new commit is only created if the built code has changed.

    // The commit template to use when committing. (special characters must be escaped)
    //  The following tokens are replaced:
    //    - %sourceName%:   the package.json name or the project directory name
    //    - %sourceTag%: the current tag i.e. v1.0.0
    //    - %sourceBranch%: the current branch
    //    - %sourceCommit%: the most recent commit
    template: `Built %sourceName% %sourceTag% from commit %sourceCommit% on branch %sourceBranch%`
  },
  connectCommits: true,// Make sure that every commit on the built code branch matches a commit on the main project branch. If the main project's working directory has uncommitted changes, a commit task will throw an error.
  fetch: {
    shallow: false    // Fetches branch from remote with the flag --depth=1. Which makes a shallow clone with a history truncated to the last revision. Might bring some boost on long-history repositories.
  },
  git: {
    config: {}         // [git config](http://git-scm.com/docs/git-config) settings for the repository when preparing the repository. e.g. `{'user.name': 'John Doe'}`
  },
  force: false     // Pushes branch to remote with the flag --force. This will NOT checkout the remote branch, and will OVERRIDE remote with the repo commits.  Use with caution.
}

const BuildControl = class extends Base {

  constructor(config = {}) {
    super(extend(true, {},
      Default,
      {tag: {name: () => this.autoResolveTagName()}}, // tag package version auto resolver
      config
    ))

    this.originalCwd = shelljs.pwd()

    // Build remote repo if sensitive information is passed in
    if (this.config.remote.login && this.config.remote.token) {
      let remote = url.parse(this.config.remote)

      this.config.remote.repo = url.format({
        protocol: remote.protocol,
        auth: this.config.remote.login + ':' + this.config.remote.token,
        host: remote.host,
        pathname: remote.pathname
      })
    }

    this.git = new Git()
    this.package = this.readPackage()
  }

  /**
   * convenience to resolve from a fn or string
   */
  tagName() {
    if (this.config.tag.name === false) {
      return false
    }
    else if (typeof this.config.tag.name === 'function') {
      return this.config.tag.name()
    }
    else {
      return this.config.tag.name()
    }
  }

  resolveBranch() {
    return (this.config.remote.branch || this.config.branch)
  }

  /**
   * Resolver plugged into options as tag: {name: ()} that can be overridden by a string or other fn
   * @returns {*}
   */
  autoResolveTagName() {
    if (this.package && this.package.version) {
      return `v${this.package.version}`
    }
    else {
      return false
    }
  }

  readPackage() {
    if (shelljs.test('-f', 'package.json', {silent: true})) {
      return JSON.parse(fs.readFileSync('package.json', 'utf8'))
    }
    else {
      return null
    }
  }

  /**
   *
   */
  checkRequirements() {
    // Check if git version meets requirements
    let version = this.git.version()
    if (!version || semver.lt(version, '1.8.0')) {
      throw(`Current Git version is ${version}. This plugin requires Git >= 1.8.0.`)
    }

    // Check that build directory exists
    if (!fs.existsSync(this.config.dir)) {
      throw(`Build directory ${this.config.dir} doesn't exist. Nothing to version.`)
    }

    // Check that build directory conteins files
    if (fs.readdirSync(this.config.dir).length === 0) {
      throw(`Build directory ${this.config.dir} is empty. Nothing to version.`)
    }

    // If connectCommits is true check that the main project's working directory is clean
    if (this.config.connectCommits) {
      let diff = this.git.diff()
      if (diff !== '') {
        throw new Error('There are uncommitted changes in your working directory. \n' +
          'Please commit changes to the main project before you commit to \n' +
          'the built code.\n')
      }
    }

    if (this.config.fetch.shallow && semver.lt(version, '1.9.0')) {
      throw new Error(`Option "fetch.shallow" is supported on Git >= 1.9.0 and your version is ${version}.`)
    }
  }

  /**
   * Attempt to track a branch from origin. It may fail on times that the branch is already tracking another remote. There is no problem when that happens, nor does it have any affect
   */
  verifyRepoBranchIsTracked() {
    this.git.track(this.config.branch)
  }

  /**
   * Initialize git repo if one doesn't exist
   */
  ensureGitInit() {
    let repo = path.join(this.originalCwd, this.config.dir, '.git')
    if (!fs.existsSync(repo)) {
      this.log(`Creating git repository in ${this.config.dir}.`)
      this.git.init()
    }
  }

  /**
   * Initialize the git config
   */
  configureGit() {
    for (let key of Object.keys(this.config.git.config)) {
      this.git.configure(key, this.config.git.config[key])
    }
  }

  /**
   * Create a named remote if one doesn't exist
   */
  ensureRemote() {
    let remoteUrlRegex = new RegExp('[\/\\:]')
    if (remoteUrlRegex.test(this.config.remote.repo)) {
      let remoteName = this.git.hash('remote', this.config.remote.repo)
      if (!this.git.remote().includes(remoteName)) {
        this.log('Creating remote.')
        this.git.remoteAdd(remoteName, this.config.remote.repo)
      }
    }
  }

  /**
   * Check if local branch can safely merge upstream (requires fetched refs)
   * @returns {boolean}
   */
  shouldUpdate() {
    // Make sure you understand what this does.
    // With force, we're not even going to attempt to check out
    // We're just going to push the repo and override EVERYTHING in the remote
    if (this.config.force === true) return false

    let status = this.git.status()
    if (status) {
      let ahead = status.includes('ahead')
      let behind = status.includes('behind')

      if (ahead && behind) {
        throw('The remote and local branches have diverged please\n' +
        'resolve manually. Deleting the local **built code**\n' +
        '.git directory will usually fix things up.')
      }
      else if (ahead) {
        return false
      }
      else if (behind) {
        return true
      }
    }
  }

  /**
   * Fetch remote refs to a specific branch, equivalent to a pull without checkout
   * @param dest
   */
  fetch(dest) {
    let branch = this.resolveBranch() + (dest ? ':' + this.config.branch : '');
    this.log(`Fetching "${this.config.branch}" ${(this.config.fetch.shallow ? 'files' : 'history')} from ${this.config.remote.repo}.`);
    this.git.fetch(this.config.remote.repo, branch, this.config.fetch.shallow)
  }

  /**
   * Set branch to track remote
   */
  ensureLocalBranchTracksRemote() {
    let remoteBranch = this.config.remote.branch || this.config.branch;
    if (this.git.branch(this.config.branch) !== this.config.remote.repo) {
      this.git.branchRemote(this.config.branch, this.config.remote.repo, remoteBranch)
    }
  }

  sourceName() {
    if (this.package != null) {
      return this.package.name
    }
    else {
      return shelljs.cwd().split('/').pop()
    }
  }

  /**
   * Stage and commit to a branch
   */
  commit() {
    let message = this.config.commit.template
      .replace(/%sourceName%/g, this.sourceName())
      .replace(/%sourceTag%/g, this.config.tag.name())
      .replace(/%sourceCommit%/g, this.git.sourceCommit())
      .replace(/%sourceBranch%/g, this.git.sourceBranch())

    // If there are no changes, skip commit
    if (this.git.status() === '') {
      this.log('No changes to your branch. Skipping commit.')
      return
    }

    this.log(`Committing changes to "${this.config.branch}".`)
    this.git.add()
    this.git.commit(message)
  }

  /**
   * Tag local branch
   */
  tagLocalBranch() {
    // If the tag exists, skip tagging
    if (this.git.tagExists(this.tagName(), this.config.remote.repo)) {
      this.log(`The tag "${this.tagName()}" already exists on remote. Skipping tagging.`)
      return
    }

    this.log(`Tagging the local repository with ${this.tagName()}`)
    this.git.tag(this.config.tag.name())
  }


  /**
   * Push branch to remote
   */
  push() {
    let branch = this.config.branch

    if (this.config.remote.branch) {
      branch += `:${this.config.remote.branch}`
    }

    this.git.push(this.config.remote.repo, branch, this.config.force)
    if (this.tagName()) {
      this.git.pushTag(this.config.remote.repo, this.tagName())
    }
  }


  run() {
    // Run task
    try {

      // Prepare
      this.checkRequirements()
      if (this.config.remote.repo === '../') this.verifyRepoBranchIsTracked()

      // Change working directory
      shelljs.cd(this.config.dir)

      // Set up repository
      this.ensureGitInit()
      this.configureGit()
      this.ensureRemote()

      // Set up local branch
      let localBranchExists = this.git.branchExists(this.config.branch)
      let remoteBranchExists = this.git.branchRemoteExists(this.resolveBranch(), this.config.remote.repo)

      if (remoteBranchExists) {
        this.fetch()
      }

      if (remoteBranchExists && localBranchExists) {
        // Make sure local is tracking remote
        this.ensureLocalBranchTracksRemote()

        // Update local branch history if necessary
        if (this.shouldUpdate()) {
          this.fetch(true)
        }
      }
      else if (remoteBranchExists && !localBranchExists) { //// TEST THIS ONE
        // Create local branch that tracks remote
        this.git.track(this.config.branch, this.config.remote.repo, this.resolveBranch())
      }
      else if (!remoteBranchExists && !localBranchExists) {
        // Create local branch
        this.log(`Creating branch "${this.config.branch}".`)
        this.git.checkout(this.config.branch)
      }

      // Perform actions
      this.git.symbolicRefHead(this.config.branch)
      this.git.reset()

      if (this.config.commit.auto) {
        this.commit()
      }

      if (this.config.tag.name()) {
        this.tagLocalBranch()
      }

      if (this.config.push) {
        this.push()
      }
    }
    catch (e) {
      throw e
    }
    finally {
      // Revert working directory
      shelljs.cd(this.originalCwd)
    }
  }
}

export default BuildControl
