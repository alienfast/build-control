import BaseSourced from './baseSourced'
import Git from './git'
import Npm from './npm'
import extend from 'extend'
import fs from 'fs-extra'
import path from 'path'
import url from 'url'
import semver from 'semver'

const Default = {
  branch: 'dist',     // The branch to commit to.
  versionBump: 'patch',   // Will bump the versino if package.json is present https://docs.npmjs.com/cli/version.  Pass false to avoid bump.
  remote: {
    repo: '../',      // The remote repo to push to (URL|RemoteName|FileSystemPath). Common examples include:
                      //   - `git@github.com:alienfast/foo.git` - your main project's remote (gh-pages branch)
                      //   - `../` - the local project repository itself

    // If token && login are provided, the remote.repo will be formatted to include these
    login: undefined,
    token: undefined,
    branch: undefined// The remote branch to push to. Common usage would be for Heroku's master branch requirement.
  },
  clean: { // clean the cwd dir before/after a run
    before: false,
    after: false
  },
  tag: {
    name: undefined,   // fn or string.  Default will autoresolve from the package.json version if possible.  Pass false to avoid tagging.
    existsFailure: true // if tag already exists, fail the execution
  },
  push: true,        // Pushes `branch` to remote. If tag is set, pushes the specified tag as well. false will disable
  disableRelativeAutoPush: false, // when testing, we may have nothing to push to.  By default, if using a remote repo that is relative, will try to push using the config.branch using the sourceGit all the way to the server.
  commit: {
    auto: true,      // Commits built code to `branch`. A new commit is only created if the built code has changed. false will disable

    // The commit template to use when committing. (special characters must be escaped)
    //  The following tokens are replaced:
    //    - %sourceName%:   the package.json name or the project directory name
    //    - %sourceTag%: the current tag i.e. v1.0.0
    //    - %sourceBranch%: the current branch
    //    - %sourceCommit%: the most recent commit
    template: `Built %sourceName% %sourceTag% from commit %sourceCommit% on branch %sourceBranch%`,
    ensure: true // require the source and build to be fully committed prior to running.
  },
  fetch: {
    shallow: false    // Fetches branch from remote with the flag --depth=1. Which makes a shallow clone with a history truncated to the last revision. Might bring some boost on long-history repositories.
  },
  git: {
    config: {}         // [git config](http://git-scm.com/docs/git-config) settings for the repository when preparing the repository. e.g. `{'user.name': 'John Doe'}`
  },
  force: false     // Pushes branch to remote with the flag --force. This will NOT checkout the remote branch, and will OVERRIDE remote with the repo commits.  Use with caution.
}

const BuildControl = class extends BaseSourced {

  constructor(config = {}) {
    super(extend(true, {},
      Default,
      {tag: {name: () => this.autoResolveTagName()}}, // tag package version auto resolver
      config
    ))

    // modify

    // Build remote repo if sensitive information is passed in
    if (this.config.remote.login && this.config.remote.token) {
      let remote = url.parse(this.config.remote.repo)

      this.config.remote.repo = url.format({
        protocol: remote.protocol,
        auth: this.config.remote.login + ':' + this.config.remote.token,
        host: remote.host,
        pathname: remote.pathname
      })

      // configure sensitive information
      this.config.sensitive[`${this.config.remote.login}:${this.config.remote.token}`] = '<credentials>'
      this.config.sensitive[this.config.remote.token] = '<token>'
    }

    this.sourceGit = new Git({
      debug: this.config.debug,
      cwd: this.config.sourceCwd,
      sensitive: this.config.sensitive
    })

    this.git = new Git({
      debug: this.config.debug,
      cwd: this.config.cwd,
      sensitive: this.config.sensitive
    })

    this.npm = new Npm({
      debug: this.config.debug,
      cwd: this.config.cwd,
      versionBump: this.config.versionBump,
      sourceCwd: this.config.sourceCwd,
      sensitive: this.config.sensitive
    })

    // Ensure/initialize
    this.cleanBefore()
    this.ensureDir()
    if (this.config.remote.repo === '../') {
      this.verifySourceBranchIsTracked()
    }

    // Set up repository
    this.ensureGitInit()
    this.configureGit()
    this.ensureRemote()
  }

  ensureDir() {
    // reestablish a build dir
    fs.ensureDirSync(this.config.cwd)
  }

  cleanBefore() {
    // clean dir
    if (this.config.clean.before) {
      fs.removeSync(this.config.cwd)
    }
  }

  cleanAfter() {
    // clean dir
    if (this.config.clean.after) {
      fs.removeSync(this.config.cwd)
    }
  }

  resolveBranch() {
    return (this.config.remote.branch || this.config.branch)
  }

  /**
   *  Can run prior to tests etc to ensure versions are ready as well as commits.
   */
  prepublishCheck() {
    // Check if git version meets requirements
    let version = this.git.version()
    if (!version || semver.lt(version, '1.8.0')) {
      throw(`Current Git version is ${version}. This plugin requires Git >= 1.8.0.`)
    }

    // If config.commit.ensure is true check that the main project's working directory is clean
    if (this.config.commit.ensure) {
      this.git.ensureCommitted()
      this.sourceGit.ensureCommitted()
    }

    if (this.config.fetch.shallow && semver.lt(version, '1.9.0')) {
      this.notifyError(`Option "fetch.shallow" is supported on Git >= 1.9.0 and your version is ${version}.`)
    }
  }

  prepublishBuildCheck() {
    this.prepublishCheck()

    // trigger message if tag exists in remote.
    this.tagName()

    // Check that build directory contains files
    if (fs.readdirSync(this.config.cwd).length === 0) {
      throw(`Build directory ${this.config.cwd} is empty. Nothing to version.`)
    }

    // Check that build directory exists
    if (!fs.existsSync(this.config.cwd)) {
      throw(`Build directory ${this.config.cwd} doesn't exist. Nothing to version.`)
    }
  }

  /**
   * Attempt to track a branch from origin. It may fail on times that the branch is already tracking another remote. There is no problem when that happens, nor does it have any affect
   */
  verifySourceBranchIsTracked() {
    this.sourceGit.track(this.config.branch)
  }

  /**
   * Initialize git repo if one doesn't exist
   */
  ensureGitInit() {
    let repo = path.join(this.config.cwd, '.git')
    if (!fs.existsSync(repo)) {
      this.log(`Creating git repository in ${this.config.cwd}.`)
      this.git.init()
    }
    else {
      this.debug(`Git repo already exists in ${this.config.cwd}.`)
    }
  }

  /**
   * Initialize the git config
   */
  configureGit() {

    this.debugDump(`this.config.git.config`, this.config.git.config)
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
      this.config.remote.name = this.git.hash('remote', this.config.remote.repo)
      if (!this.git.remote().includes(this.config.remote.name)) {
        this.log(`Creating remote ${this.config.remote.name}`)
        this.git.remoteAdd(this.config.remote.name, this.config.remote.repo)
      }
    }
  }

  /**
   * Check if local branch can safely merge upstream (requires fetched refs)
   * @returns {boolean}
   */
  shouldUpdate() {
    // WARNING: With force, we're not even going to attempt to check out, We're just going to push the repo and override EVERYTHING in the remote
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
    this.log(`Fetching '${this.config.branch}' ${(this.config.fetch.shallow ? 'files' : 'history')} from ${this.config.remote.repo}.`);
    this.git.fetch(this.config.remote.name, branch, this.config.fetch.shallow)
  }

  /**
   * Set branch to track remote
   */
  ensureLocalBranchTracksRemote() {
    let remoteBranch = this.config.remote.branch || this.config.branch;
    if (this.git.configBranchRemote(this.config.branch) !== this.config.remote.name) {
      this.git.branchRemote(this.config.branch, this.config.remote.name, remoteBranch)
    }
  }

  sourceName() {
    if (this._sourceName) {
      return this._sourceName
    }
    else {
      if (this.npm.package() != null) {
        this._sourceName = this.npm.package().name
      }
      else {
        this._sourceName = this.config.sourceCwd.split('/').pop()
      }

      return this._sourceName
    }
  }

  sourceCommit() {
    if (this._sourceCommit) {
      return this._sourceCommit
    }
    return this._sourceCommit = this.sourceGit.sourceCommit()
  }

  sourceCommitFull() {
    if (this._sourceCommitFull) {
      return this._sourceCommitFull
    }
    return this._sourceCommitFull = this.sourceGit.sourceCommitFull()
  }

  sourceCommitLink() {
    return `[\`%sourceCommit%\`](../../commit/%sourceCommitFull%)`
      .replace(/%sourceCommit%/g, this.sourceCommit())
      .replace(/%sourceCommitFull%/g, this.sourceCommitFull())

  }

  sourceBranch() {
    if (this._sourceBranch) {
      return this._sourceBranch
    }
    return this._sourceBranch = this.sourceGit.sourceBranch()
  }

  sourceTag() {
    if (this._sourceTag) {
      return this._sourceTag
    }
    ''

    let name = this.tagName()
    if (name) {
      this._sourceTag = name
    }
    else {
      this._sourceTag = ''
    }

    return this._sourceTag
  }

  sourceTagLink() {
    if (this.tagName()) {
      return `[\`%sourceTag%\`](../../releases/tag/%sourceTag%)`
        .replace(/%sourceTag%/g, this.sourceTag())
    }
    else {
      return ''
    }
  }


  interpolate(template) {
    return template
      .replace(/%sourceName%/g, this.sourceName())
      .replace(/%sourceTag%/g, this.sourceTag())
      .replace(/%sourceTagLink%/g, this.sourceTagLink())
      .replace(/%sourceCommit%/g, this.sourceCommit())
      .replace(/%sourceCommitFull%/g, this.sourceCommitFull())
      .replace(/%sourceCommitLink%/g, this.sourceCommitLink())
      .replace(/%sourceBranch%/g, this.sourceBranch())
  }

  /**
   * Stage and commit to a branch
   */
  commit() {

    if (!this.config.commit.auto) {
      return
    }

    let message = this.interpolate(this.config.commit.template)

    // If there are no changes, skip commit
    if (!this.git.status()) {
      this.log('No changes to your branch. Skipping commit.')
      return
    }

    this.log(`Committing changes to '${this.config.branch}'.`)
    this.git.add()
    this.git.commit(message)
  }

  /**
   * Tag local branch
   */
  tag() {
    let tagName = this.tagName()
    if (!tagName) {
      return
    }

    this.log(`Tagging the local repository with ${tagName}`)
    this.git.tag(tagName)
  }

  /**
   * Convenience to resolve from a fn or string.  If tag already exists in a remote, it will return false (don't forget to bump your version in the package.json!)
   */
  tagName() {
    if (this._tagName !== undefined) {
      return this._tagName
    }

    if (this.config.tag.name === false) {
      this._tagName = false
    }
    else if (this.config.tag.name === undefined) {
      this._tagName = false
    }
    else {
      let name = null
      if (typeof this.config.tag.name === 'function') {
        name = this.config.tag.name()
      }
      else {
        name = this.config.tag.name
      }

      // If the tag exists, skip tagging
      if (name && this.tagExists(name)) {
        let msg = `The tag "${name}" already exists on ${this.config.remote.name}`
        if (this.config.tag.existsFailure) {
          this.notifyError(msg)
        }
        else {
          this.log(`WARNING: ${msg}, skipping tagging.`)
        }

        name = false
      }

      this._tagName = name
    }

    return this._tagName
  }

  /**
   * Resolver plugged into options as tag: {name: ()} that can be overridden by a string or other fn
   */
  autoResolveTagName() {
    if (this.npm.package() && this.npm.package().version) {
      return `v${this.npm.package().version}`
    }
    else {
      return false
    }
  }

  tagExists(name) {
    if (this.git.tagExists(name, this.config.remote.name)) {
      return true
    }
    else {
      return false
    }
  }

  /**
   * Push branch to remote
   */
  push() {
    if (!this.config.push) {
      return
    }

    let branch = this.config.branch

    if (this.config.remote.branch) {
      branch += `:${this.config.remote.branch}`
    }

    this.git.push(this.config.remote.name, branch, this.config.force)
    if (this.tagName()) {
      this.git.pushTag(this.config.remote.name, this.tagName())
    }

    // if this was pushed to a relative path, go ahead and try and push that up to the origin
    if (!this.config.disableRelativeAutoPush && this.config.remote.repo.includes('..')) {
      let remote = 'origin'
      this.log(`Repo is using relative path, pushing ${branch} from the source directory...`)
      this.sourceGit.push(remote, branch)

      if (this.tagName()) {
        this.sourceGit.pushTag(remote, this.tagName())
      }
    }
  }

  localBranchExists() {
    return this.git.branchExists(this.config.branch)
  }

  remoteBranchExists() {
    return this.git.branchRemoteExists(this.resolveBranch(), this.config.remote.name)
  }

  run() {
    // Run task
    this.log(this.interpolate(`Starting %sourceName% for commit %sourceCommit% on branch %sourceBranch% using directory ${this.config.cwd}...`))

    // Prepare
    this.prepublishBuildCheck()

    // Set up local branch
    let localBranchExists = this.localBranchExists()
    let remoteBranchExists = this.remoteBranchExists()

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
      this.git.track(this.config.branch, this.config.remote.name, this.resolveBranch())
    }
    else if (!remoteBranchExists && !localBranchExists) {
      // Create local branch
      this.log(`Creating branch '${this.config.branch}'.`)
      this.git.checkout(this.config.branch)
    }

    // Perform actions
    this.git.symbolicRefHead(this.config.branch)
    this.git.reset()

    this.commit()
    this.tag()
    this.push()
    this.cleanAfter()
  }
}

export default BuildControl
