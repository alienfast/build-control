import Base from './base'
import extend from 'extend'
import fs from 'fs'
import crypto from 'crypto'
import path from 'path'

const Default = {}

const Git = class extends Base {

  constructor(config = {}) {
    super(extend(true, {}, Default, config))
  }

  version() {
    return (this.exec('git --version', false).match(/\d+\.\d+\.\d+/) || []).shift()
  }

  diff(logResult = true) {
    return this.exec('git diff', logResult)
  }

  ensureCommitted(){
    let diff = this.diff(false)
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

export default Git
