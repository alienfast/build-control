import Base from './base'
import extend from 'extend'
import fs from 'fs'
import crypto from 'crypto'
import shelljs from 'shelljs'
import path from 'path'

const Default = {}

const Git = class extends Base {

  constructor(config = {}) {
    super(extend(true, {}, Default, config))
  }

  version() {
    return (this.exec('git --version', false).match(/\d+\.\d+\.\d+/) || []).shift()
  }

  diff() {
    return this.exec('git diff', false)
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
    this.exec(`git branch --track ${branch} ${remoteName}/${remoteBranch}`, false)
  }

  checkout(branch) {
    this.exec(`git checkout --orphan ${branch}`)
  }

  branchRemote(branch, remoteName, remoteBranch) {
    this.exec(`git branch --set-upstream-to=${remoteName}/${remoteBranch} ${this.config.branch}`)
  }

  branch(branch) {
    this.exec(`git config branch.${branch}.remote`, false).replace(/\n/g, '')
  }

  branchExists(branch) {
    return this.booleanExec(`git show-ref --verify --quiet refs/heads/${branch}`, false)
  }

  branchRemoteExists(branch, remoteName) {
    return this.booleanExec(`git ls-remote --exit-code ${remoteName} ${branch}`, false)
  }

  /**
   *
   */
  status() {
    let result = this.safeExec('git status -sb --porcelain', false)

    //this.log(`\n\nstatus result:\n${result}`)
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
    return this.booleanExec(`git ls-remote --tags --exit-code ${remoteName} ${tag}`, false)
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
