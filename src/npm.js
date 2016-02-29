import BaseSourced from './baseSourced'
import Git from './git'
import extend from 'extend'
import fs from 'fs-extra'
import path from 'path'
import shelljs from 'shelljs'

const Default = {}

const Npm = class extends BaseSourced {

  constructor(config = {}) {
    super(extend(true, {}, Default, config))
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

    if(!this.config.versionBump()){
      return
    }

    this.sourceGit.ensureCommitted()

    let fromVersion = this.package().version
    this.exec(`npm --no-git-tag-version version ${this.config.versionBump}`)
    this._package = null

    let toVersion = this.package().version
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
      return JSON.parse(fs.readFileSync(this.packageFile(), 'utf8'))
    }
    else {
      return null
    }
  }
}

export default Npm
