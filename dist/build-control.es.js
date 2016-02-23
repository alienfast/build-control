import extend from 'extend';
import stringify from 'stringify-object';
import shelljs from 'shelljs';
import chalk from 'chalk';
import fancyLog from 'fancy-log';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import pathIsAbsolute from 'path-is-absolute';
import url from 'url';
import semver from 'semver';

const Default$1 = {
  debug: false,
  sensitive: {}
}

const Base = class {

  /**
   *
   * @param config - customized overrides
   */
  constructor(config) {
    this.config = extend(true, {}, Default$1, config)

    // TODO: tests override #log and we need to complete construction before logging....not sure how to make that happen, setTimeout is hokey and doesn't work right
    //this.debug(`[${this.constructor.name}] using resolved config: ${stringify(this.config)}`)
  }

  // ----------------------------------------------
  // protected

  codeExec(command, logResult = true) {
    let code = this.exec(command, logResult, true)
    this.debug(`codeExec result: ${code}`)
    return code
  }

  booleanExec(command) {
    if (this.codeExec(command, false) == 0) {
      return true
    }
    else {
      return false
    }
  }

  /**
   * Wraps shellJs calls that act on the file structure to give better output and error handling
   * @param command
   * @param logResult - return output from the execution, defaults to true. If false, will return code instead
   * @param returnCode - defaults to false which will throw Error on error, true will return result code
   */
  exec(command, logResult = true, returnCode = false) {
    let options = {silent: true}
    if (this.config.cwd) {
      options['cwd'] = this.config.cwd
    }
    else {
      this.notifyError('cwd is required')
    }

    this.debug(`Executing \`${command}\` with cwd: ${options['cwd']}`)
    let shellResult = shelljs.exec(command, options)
    let output = this.logShellOutput(shellResult, logResult);

    if (shellResult.code === 0 || shellResult.code === 1) {

      // ---
      // determine the return value
      if (returnCode) {
        return shellResult.code
      }
      else {
        return output
      }
    }
    else {
      if (returnCode) {
        return shellResult.code
      }
      else {
        this.notifyError(`Command failed \`${command}\`, cwd: ${options.cwd}: ${shellResult.stderr}.`)
      }
    }
  }

  notifyError(msg){
    this.error(msg)
    throw new Error(this.maskSensitive(msg))
  }

  logShellOutput(shellResult, logResult) {
    //this.debug(`[exit code] ${shellResult.code}`)

    // ---
    // Log the result
    // strangely enough, sometimes useful messages from git are an stderr even when it is a successful command with a 0 result code
    let output = shellResult.stdout
    if (output == '') {
      output = shellResult.stderr
    }

    //this.log(stringify(shellResult))
    if (output != '') {
      if (logResult) {
        this.log(output)
      }
      else {
        this.debug(`[output] \n${output}`)
      }
    }
    return output;
  }

  log(message, level = null){
    let msg = ``
    if(level){
      msg += level
    }
    msg += `[${chalk.grey(this.constructor.name)}] ${message}`
    fancyLog(this.maskSensitive(msg))
  }

  error(msg) {
    this.log(msg, `[${chalk.red('error')}]`)
  }

  debug(msg) {
    if (this.config.debug) {
      this.log(msg, `[${chalk.cyan('debug')}]`)
    }
  }

  maskSensitive(str) {
    let result = str
    for(let key of Object.keys(this.config.sensitive)){
      result = result.replace(key, this.config.sensitive[key], 'gmi')
    }
    return result
  }

  debugDump(msg, obj) {
    this.debug(`${msg}:\n${stringify(obj)}`)
  }
}

const Default$2 = {}

const Git = class extends Base {

  constructor(config = {}) {
    super(extend(true, {}, Default$2, config))
  }

  version() {
    return (this.exec('git --version', false).match(/\d+\.\d+\.\d+/) || []).shift()
  }

  diff() {
    return this.exec('git diff', true)
  }

  sourceBranch() {
    return this.exec('git rev-parse --abbrev-ref HEAD', false).replace(/\n/g, '')
  }

  sourceCommit() {
    return this.exec('git rev-parse --short HEAD', false).replace(/\n/g, '')
  }

  init() {
    this.exec('git init')
  }

  configure(key, value) {
    this.exec(`git config "${key}" "${value}"`)
  }

  remote() {
    return this.exec('git remote', false)
  }

  remoteAdd(name, location) {
    this.exec(`git remote add ${name} ${location}`)
  }

  /**
   * Fetch remote refs to a specific branch, equivalent to a pull without checkout
   */
  fetch(remoteName, branch, shallow = false) {
    let depth = shallow ? '--depth=1 ' : ''
    // `--update-head-ok` allows fetch on a branch with uncommited changes
    this.exec(`git fetch --progress --verbose --update-head-ok ${depth}${remoteName} ${branch}`) //, false, true)
  }

  /**
   * Make the current working tree the branch HEAD without checking out files
   * @param branch
   */
  symbolicRefHead(branch) {
    this.exec(`git symbolic-ref HEAD refs/heads/${branch}`)
  }

  /**
   * Make sure the stage is clean
   */
  reset() {
    this.exec('git reset', false)
  }

  /**
   *
   * @param branch
   * @param remoteName
   * @param remoteBranch
   */
  track(branch, remoteName = 'origin', remoteBranch = null) {
    if (remoteBranch == null) {
      remoteBranch = branch
    }
    // Attempt to track a branch from origin
    //  It may fail on times that the branch is already tracking another remote. There is no problem when that happens, nor does it have any affect
    this.codeExec(`git branch --track ${branch} ${remoteName}/${remoteBranch}`)
  }

  checkout(branch) {
    this.exec(`git checkout --orphan ${branch}`)
  }

  branchRemote(branch, remoteName, remoteBranch) {
    this.exec(`git branch --set-upstream-to=${remoteName}/${remoteBranch} ${branch}`)
  }

  configBranchRemote(branch) {
    try {
      return this.exec(`git config branch.${branch}.remote`, false).replace(/\n/g, '')
    }
    catch (error) {
      return null
    }
  }

  branchExists(branch) {
    return this.booleanExec(`git show-ref --verify --quiet refs/heads/${branch}`)
  }

  branchRemoteExists(branch, remoteName) {
    return this.booleanExec(`git ls-remote --exit-code ${remoteName} ${branch}`)
  }

  status() {
    let result = this.exec('git status -sb --porcelain', false)
    if (result === '') {
      return null
    }
    else {
      return result
    }
  }

  add() {
    this.exec('git add -A .')
  }

  hash(prefix, text) {
    return `${prefix}-${crypto.createHash('md5').update(text).digest('hex').substring(0, 6)}`
  }

  commit(message) {
    // generate commit message
    let commitMessageFile = path.join(this.config.cwd, this.hash('commitMessageFile', message))
    fs.writeFileSync(commitMessageFile, message)
    this.exec(`git commit --file=${commitMessageFile}`)

    fs.unlinkSync(commitMessageFile)
  }

  tag(tag) {
    this.exec(`git tag ${tag}`)
  }

  tagExists(tag, remoteName) {
    return this.booleanExec(`git ls-remote --tags --exit-code ${remoteName} ${tag}`)
  }

  push(remoteName, branch, force = false) {
    let withForce = force ? ' --force ' : ''

    this.log(`Pushing ${branch} to ${remoteName}${withForce}`)
    this.exec(`git push ${withForce}${remoteName} ${branch}`) //, false, true)
  }

  pushTag(remoteName, tag) {
    this.exec(`git push ${remoteName} ${tag}`)
  }
}

const Paths = class {

  static resolveCwd(base, cwd) {
    if (!pathIsAbsolute(cwd)) {
      return path.join(base, cwd)
    }
    else {
      return cwd
    }
  }
}

const Default = {
  sourceCwd: shelljs.pwd(), // The base directory of the source e.g. the directory of the package.json (not usually necessary to specify, but useful for odd structures and tests)
  cwd: 'dist',        // The directory that contains your built code.
  branch: 'dist',     // The branch to commit to.
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
  push: true,        // Pushes `branch` to remote. If tag is set, pushes the specified tag as well. false will disable
  commit: {
    auto: true,      // Commits built code to `branch`. A new commit is only created if the built code has changed. false will disable

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

    // get a fully resolved sourceCwd based on the process cwd (if not an absolute path)
    this.config.sourceCwd = Paths.resolveCwd(shelljs.pwd(), this.config.sourceCwd)
    // get a fully resolved cwd based on the sourceCwd (if not an absolute path)
    this.config.cwd = Paths.resolveCwd(this.config.sourceCwd, this.config.cwd)

    this.sourceGit = new Git({cwd: this.config.sourceCwd, debug: this.config.debug, sensitive: this.config.sensitive})
    this.git = new Git({cwd: this.config.cwd, debug: this.config.debug, sensitive: this.config.sensitive})
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
    else if (this.config.tag.name === undefined) {
      return false
    }
    else {
      return this.config.tag.name
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
    let file = path.join(this.config.sourceCwd, 'package.json')
    if (shelljs.test('-f', file, {silent: true})) {
      this.debug(`Found package.json at ${file}`)
      return JSON.parse(fs.readFileSync(file, 'utf8'))
    }
    else {
      this.debug(`package.json not found at ${file}`)
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
    if (!fs.existsSync(this.config.cwd)) {
      throw(`Build directory ${this.config.cwd} doesn't exist. Nothing to version.`)
    }

    // Check that build directory contains files
    if (fs.readdirSync(this.config.cwd).length === 0) {
      throw(`Build directory ${this.config.cwd} is empty. Nothing to version.`)
    }

    // If connectCommits is true check that the main project's working directory is clean
    if (this.config.connectCommits) {
      let diff = this.git.diff()
      if (diff !== '') {
        this.notifyError('There are uncommitted changes in your working directory. Please commit changes to the main project before you commit to the built code.')
      }
      else {
        this.debug(`No diffs found.`)
      }
    }

    if (this.config.fetch.shallow && semver.lt(version, '1.9.0')) {
      this.notifyError(`Option "fetch.shallow" is supported on Git >= 1.9.0 and your version is ${version}.`)
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
    this.log(`Fetching "${this.config.branch}" ${(this.config.fetch.shallow ? 'files' : 'history')} from ${this.config.remote.repo}.`);
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
      if (this.package != null) {
        this._sourceName = this.package.name
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

  sourceBranch() {
    if (this._sourceBranch) {
      return this._sourceBranch
    }
    return this._sourceBranch = this.sourceGit.sourceBranch()
  }

  /**
   * Stage and commit to a branch
   */
  commit() {
    let message = this.config.commit.template
      .replace(/%sourceName%/g, this.sourceName())
      .replace(/%sourceTag%/g, this.config.tag.name())
      .replace(/%sourceCommit%/g, this.sourceCommit())
      .replace(/%sourceBranch%/g, this.sourceBranch())

    // If there are no changes, skip commit
    if (!this.git.status()) {
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
    if (this.git.tagExists(this.tagName(), this.config.remote.name)) {
      this.log(`The tag "${this.tagName()}" already exists on ${this.config.remote.name}. Skipping tagging.`)
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

    this.git.push(this.config.remote.name, branch, this.config.force)
    if (this.tagName()) {
      this.git.pushTag(this.config.remote.name, this.tagName())
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
    this.log(`Starting ${this.sourceName()} for commit ${this.sourceCommit()} on branch ${this.sourceBranch()} using directory ${this.config.cwd}...`)

    // Prepare
    this.checkRequirements()
    if (this.config.remote.repo === '../') this.verifySourceBranchIsTracked()

    // Set up repository
    this.ensureGitInit()
    this.configureGit()
    this.ensureRemote()

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
}

export { BuildControl, Git };
//# sourceMappingURL=build-control.es.js.map