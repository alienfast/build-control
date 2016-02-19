import Base from './base'
import Git from './git'
import extend from 'extend'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import url from 'url'
import semver from 'semver'
import shelljs from 'shelljs'

const Default = {
  force: false,
  branch: 'dist',
  dir: 'dist',
  remote: '../',
  remoteBranch: '',
  login: '',
  token: '',
  commit: false,
  tag: false,
  push: false,
  commit: {
    message: `Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%`
  },
  connectCommits: true,
  fetch: {
    shallow: false
  },
  config: {}
}

const BuildControl = class extends Base {

  constructor(config = {}) {
    super(extend(true, {}, Default, config))

    this.git = new Git()
    this.originalCwd = shelljs.pwd()

    // Build remote if sensitive information is passed in
    if (this.config.login && this.config.token) {
      let remote = url.parse(this.config.remote)

      this.config.remote = url.format({
        protocol: remote.protocol,
        auth: this.config.login + ':' + this.config.token,
        host: remote.host,
        pathname: remote.pathname
      })
    }

    this.package = this.readPackage()
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
    if (!fs.existsSync(path.join(this.originalCwd, this.config.dir, '.git'))) {
      this.log('Creating git repository in "' + this.config.dir + '".')

      this.git.init()
    }
  }

  /**
   * Initialize the git config
   */
  initConfig() {
    for (let key of Object.keys(this.config.config)) {
      this.git.configure(key, this.config.config[key])
    }
  }

  /**
   * Create a named remote if one doesn't exist
   */
  ensureRemote() {
    let remoteName = this.git.hash('remote', this.config.remote)
    if (!this.git.remote().includes(remoteName)) {
      this.log('Creating remote.')
      this.git.remoteAdd(remoteName, this.config.remote)
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
    let branch = (this.config.remoteBranch || this.config.branch) + (dest ? ':' + this.config.branch : '');
    this.log(`Fetching "${this.config.branch}" ${(this.config.fetch.shallow ? 'files' : 'history')} from ${this.config.remote}.`);
    this.git.fetch(remoteName, branch, this.config.fetch.shallow)
  }

  /**
   * Set branch to track remote
   */
  ensureLocalBranchTracksRemote() {
    let remoteBranch = this.config.remoteBranch || this.config.branch;
    if (this.git.branch(this.config.branch) !== remoteName) {
      this.git.branchRemote(this.config.branch, remoteName, remoteBranch)
    }
  }

  sourceName() {
    if (this.package != null) {
      return this.package.name
    }
    else {
      return process.cwd().split('/').pop()
    }
  }

  /**
   * Stage and commit to a branch
   */
  commit() {
    let message = this.config.commit.message
      .replace(/%sourceName%/g, this.sourceName())
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
    if (this.git.tagExists(this.config.tag, remoteName)) {
      this.log(`The tag "${this.config.tag}" already exists on remote. Skipping tagging.`)
      return
    }

    this.log(`Tagging the local repository with ${this.config.tag}`)
    this.git.tag(this.config.tag)
  }


  /**
   * Push branch to remote
   */
  push() {
    let branch = this.config.branch

    if (this.config.remoteBranch) {
      branch += `:${this.config.remoteBranch}`
    }

    this.git.push(remoteName, branch, this.config.force)
    if (this.config.tag) {
      this.git.pushTag(remoteName, tag)
    }
  }


  run() {
    // Run task
    try {

      // Prepare
      this.checkRequirements()
      if (this.config.remote === '../') this.verifyRepoBranchIsTracked()

      // Change working directory
      shelljs.cd(this.config.dir)

      // Set up repository
      this.ensureGitInit()
      this.initConfig()

      let remoteName = this.config.remote

      // Regex to test for remote url
      let remoteUrlRegex = new RegExp('[\/\\:]')
      if (remoteUrlRegex.test(remoteName)) {
        this.ensureRemote()
      }

      // Set up local branch
      let localBranchExists = this.git.branchExists(this.config.branch)
      let remoteBranchExists = this.git.branchRemoteExists((this.config.remoteBranch || this.config.branch), remoteName)

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
        this.git.track(this.config.branch, remoteName, (this.config.remoteBranch || this.config.branch))
      }
      else if (!remoteBranchExists && !localBranchExists) {
        // Create local branch
        this.log(`Creating branch "${this.config.branch}".`)
        this.git.checkout(this.config.branch)
      }

      // Perform actions
      this.git.symbolicRefHead(this.config.branch)
      this.git.reset()

      if (this.config.commit) {
        this.commit()
      }

      if (this.config.tag) {
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
