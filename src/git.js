import Base from './base'
import extend from 'extend'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import url from 'url'
import semver from 'semver'
import shelljs from 'shelljs'

const Default = {}

const Git = class extends Base {

  constructor(config = {}) {
    super(extend(true, {}, Default, config))
  }

  version() {
    return (shelljs.exec('git --version', {silent: true}).output.match(/\d+\.\d+\.\d+/) || []).shift()
  }

  diff() {
    return shelljs.exec('git diff').output
  }

  sourceBranch() {
    let result = shelljs.exec('git rev-parse --abbrev-ref HEAD', {silent: true})
    if (result.code === 0) {
      return result.output.replace(/\n/g, '')
    }
    else {
      return null
    }
  }

  sourceCommit() {
    let result = shelljs.exec('git rev-parse --short HEAD', {silent: true})
    if (result.code === 0) {
      return result.output.replace(/\n/g, '')
    }
    else {
      return null
    }
  }

  init() {
    this.execWrap('git init')
  }

  configure(key, value) {
    this.execWrap(`git config "${key}" "${value}"`)
  }

  remote() {
    return shelljs.exec('git remote', {silent: true}).output
  }

  remoteAdd(name, location) {
    this.execWrap(`git remote add ${name} ${location}`)
  }

  /**
   * Fetch remote refs to a specific branch, equivalent to a pull without checkout
   */
  fetch(remoteName, branch, shallow = false) {
    let depth = shallow ? '--depth=1 ' : ''
    // `--update-head-ok` allows fetch on a branch with uncommited changes
    this.execWrap(`git fetch --progress --verbose --update-head-ok ${depth}${remoteName} ${branch}`, false, true)
  }

  /**
   * Make the current working tree the branch HEAD without checking out files
   * @param branch
   */
  symbolicRefHead(branch) {
    this.execWrap(`git symbolic-ref HEAD refs/heads/${branch}`)
  }

  /**
   * Make sure the stage is clean
   */
  reset() {
    this.execWrap('git reset', false)
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
    shelljs.exec(`git branch --track ${branch} ${remoteName}/${remoteBranch}`, {silent: true})
  }

  checkout(branch) {
    execWrap(`git checkout --orphan ${branch}`)
  }

  branchRemote(branch, remoteName, remoteBranch) {
    this.execWrap(`git branch --set-upstream-to=${remoteName}/${remoteBranch} ${this.config.branch}`)
  }

  branch(branch) {
    shelljs.exec(`git config branch.${branch}.remote`, {silent: true}).output.replace(/\n/g, '')
  }

  branchExists(branch) {
    return (shelljs.exec(`git show-ref --verify --quiet refs/heads/${branch}`, {silent: true}).code === 0)
  }

  branchRemoteExists(branch, remoteName) {
    return (shelljs.exec(`git ls-remote --exit-code ${remoteName} ${branch}`, {silent: true}).code === 0)
  }

  /**
   *
   */
  status() {
    let result = shelljs.exec('git status -sb --porcelain', {silent: true})
    if (result.code === 0) {
      return result.output
    }
    else {
      return null
    }
  }

  add() {
    this.execWrap('git add -A .')
  }

  hash(prefix, text) {
    return `${prefix}-${crypto.createHash('md5').update(text).digest('hex').substring(0, 6)}`
  }

  commit(message) {
    // generate commit message
    let commitMessageFile = this.hash('commitMessageFile', message)
    fs.writeFileSync(commitMessageFile, message)

    this.execWrap(`git commit --file=${commitMessageFile}`)

    fs.unlinkSync(commitMessageFile)
  }

  tag(tag) {
    this.execWrap(`git tag ${tag}`)
  }

  tagExists(tag, remoteName) {
    return (shelljs.exec(`git ls-remote --tags --exit-code ${remoteName} ${tag}`, {silent: true}).code === 0)
  }

  push(remoteName, branch, force = false) {
    let withForce = force ? ' --force ' : ''

    this.log(`Pushing ${branch} to ${remoteName}${withForce}`)
    this.execWrap(`git push ${withForce}${remoteName} ${branch}`, false, true)
  }

  pushTag(remoteName, tag) {
    this.execWrap(`git push ${remoteName} ${tag}`)
  }
}

export default Git
