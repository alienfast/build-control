import extend from 'extend';
import stringify from 'stringify-object';
import shelljs from 'shelljs';
import chalk from 'chalk';
import fancyLog from 'fancy-log';
import path from 'path';
import pathIsAbsolute from 'path-is-absolute';
import fs from 'fs';
import crypto from 'crypto';
import fs$1 from 'fs-extra';
import url from 'url';
import semver from 'semver';

const Default$2 = {
  debug: false,
  sensitive: {},
  cwd: 'dist'        // The directory that contains your built code.
}

const Base = class {

  /**
   *
   * @param config - customized overrides
   */
  constructor(config) {
    this.config = extend(true, {}, Default$2, config)

    this.debug(`[${this.constructor.name}] using resolved config: ${stringify(this.config)}`)
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

    if(command.includes(`undefined`)){
      this.notifyError(`Invalid command: ${command}`)
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

const Default$1 = {
  sourceCwd: shelljs.pwd(), // The base directory of the source e.g. the directory of the package.json (not usually necessary to specify, but useful for odd structures and tests)
  cwd: 'dist'        // The directory that contains your built code.
}

const BaseSourced = class extends Base {

  constructor(config = {}) {
    super(extend(true, {}, Default$1, config))

    // get a fully resolved sourceCwd based on the process cwd (if not an absolute path)
    this.config.sourceCwd = Paths.resolveCwd(shelljs.pwd(), this.config.sourceCwd)

    // get a fully resolved cwd based on the sourceCwd (if not an absolute path)
    this.config.cwd = Paths.resolveCwd(this.config.sourceCwd, this.config.cwd)
  }
}

const Default$3 = {}

const Git = class extends Base {

  constructor(config = {}) {
    super(extend(true, {}, Default$3, config))
  }

  version() {
    return (this.exec('git --version', false).match(/\d+\.\d+\.\d+/) || []).shift()
  }

  diff() {
    return this.exec('git diff', true)
  }

  ensureCommitted(){
    let diff = this.diff()
    if (diff !== '') {
      this.notifyError(`There are uncommitted changes in your working directory ${this.config.cwd}. Please commit the changes first.`)
    }
    else {
      this.debug(`No diffs (uncommitted changes) found.`)
    }
  }

  sourceBranch() {
    return this.exec('git rev-parse --abbrev-ref HEAD', false).replace(/\n/g, '')
  }

  sourceCommit() {
    return this.exec('git rev-parse --short HEAD', false).replace(/\n/g, '')
  }

  sourceCommitFull() {
    return this.exec('git rev-parse HEAD', false).replace(/\n/g, '')
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
    this.codeExec(`git branch --track ${branch} ${remoteName}/${remoteBranch}`, false)
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

  status(file = '') {
    let result = this.exec(`git status -sb --porcelain ${file}`, false)
    if (result === '') {
      return null
    }
    else {
      return result
    }
  }

  add(file = `.`) {
    this.exec(`git add -A ${file}`)
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

const Default$4 = {}

const Npm = class extends BaseSourced {

  constructor(config = {}) {
    super(extend(true, {}, Default$4, config))
    this.sourceGit = new Git({cwd: this.config.sourceCwd, debug: this.config.debug, sensitive: this.config.sensitive})
  }

  publish() {
    if(!this.hasPackage()){
      return
    }

    this.exec('npm publish')
  }

  bump() {
    if(!this.hasPackage()){
      return
    }

    if(!this.config.versionBump){
      return
    }

    this.sourceGit.ensureCommitted()

    let fromVersion = this.package().version
    this.exec(`npm --no-git-tag-version version ${this.config.versionBump}`)
    this._package = null

    let toVersion = this.package().version
    this.sourceGit.add('package.json')
    this.sourceGit.commit(`Bumped version from ${fromVersion} to ${toVersion}`)
  }

  package() {
    if (this._package) {
      return this._package
    }
    else {
      return this._package = this.readPackage()
    }
  }

  packageFile(){
    return path.join(this.config.sourceCwd, 'package.json')
  }

  hasPackage(){
    let file = this.packageFile()
    if (shelljs.test('-f', file, {silent: true})) {
      this.debug(`Found package.json at ${file}`)
      return true
    }
    else {
      this.debug(`package.json not found at ${file}`)
      return false
    }
  }

  readPackage() {
    if (this.hasPackage()) {
      return JSON.parse(fs$1.readFileSync(this.packageFile(), 'utf8'))
    }
    else {
      return null
    }
  }
}

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
    existsFailure: false // if tag already exists, fail the executions
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
    fs$1.ensureDirSync(this.config.cwd)
  }

  cleanBefore() {
    // clean dir
    if (this.config.clean.before) {
      fs$1.removeSync(this.config.cwd)
    }
  }

  cleanAfter() {
    // clean dir
    if (this.config.clean.after) {
      fs$1.removeSync(this.config.cwd)
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

    // trigger message if tag exists in remote.
    this.tagName()
  }


  prepublishBuildCheck() {
    this.prepublishCheck()

    // Check that build directory contains files
    if (fs$1.readdirSync(this.config.cwd).length === 0) {
      throw(`Build directory ${this.config.cwd} is empty. Nothing to version.`)
    }

    // Check that build directory exists
    if (!fs$1.existsSync(this.config.cwd)) {
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
    if (!fs$1.existsSync(repo)) {
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
        this.source.pushTag(remote, this.tagName())
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

export { BuildControl, Git };
//# sourceMappingURL=build-control.es.js.map