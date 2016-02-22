import extend from 'extend'
import stringify from 'stringify-object'
import shelljs from 'shelljs'
import chalk from 'chalk'
import fancyLog from 'fancy-log'
import pathIsAbsolute from 'path-is-absolute'
import path from 'path'

export const Default = {}

const Base = class {

  /**
   *
   * @param config - customized overrides
   */
  constructor(config) {
    this.config = extend(true, {}, Default, config)

    // get a fully resolved cwd
    if(!pathIsAbsolute(this.config.cwd)){
      this.config.cwd = path.join(shelljs.pwd(), this.config.cwd)
    }

    this.debug(`[${this.constructor.name}] using resolved config: ${stringify(this.config)}`)
  }

  // ----------------------------------------------
  // protected

  booleanExec(command, logResult = true) {
    if (this.exec(command, logResult, true) == 0) {
      return true
    }
    else {
      return false
    }
  }

  safeExec(command, logResult = true) {
    return this.exec(command, logResult, true)
  }

  /**
   * Wraps shellJs calls that act on the file structure to give better output and error handling
   * @param command
   * @param logResult - show output on the cli after execution, defaults to true
   * @param stream - stream the command, defaults to false
   */
  exec(command, logResult = true, allowError = false) {
    this.debug(command)
    let options = {silent: true}
    if(this.config.cwd) {
      options['cwd'] = this.config.cwd
    }
    else{
      throw new Error('cwd is required')
    }

    this.debug(`Executing \`${command}\` with cwd: ${options['cwd']}`)
    let shellResult = shelljs.exec(command, options)
    if (shellResult.code === 0) {
      let output = shellResult.output
      if (logResult && output != '') {
        this.log(output)
      }
      return output
    }
    else {
      if (allowError) {
        return shellResult.code
      }
      else {
        let msg = `Command failed \`${command}\`: ${shellResult.stderr}.  CWD: ${shelljs.pwd()}`
        this.error(msg)
        throw new Error(this.maskSensitive(msg))
      }
    }
  }

  log(msg) {
    fancyLog(this.maskSensitive(msg))
  }

  error(msg) {
    this.log(`[${chalk.red('error')}][${chalk.cyan(this.constructor.name)}] ${msg}`)
  }

  debug(msg) {
    if (this.config.debug) {
      this.log(`[${chalk.cyan('debug')}][${chalk.cyan(this.constructor.name)}] ${msg}`)
    }
  }

  maskSensitive(str) {
    if (!this.config.token) return str

    return str
      .replace(this.config.login + ':' + this.config.token, '<CREDENTIALS>', 'gm')
      .replace(this.config.token, '<TOKEN>', 'gmi')
  }

  debugDump(msg, obj) {
    this.debug(`${msg}:\n${stringify(obj)}`)
  }
}

export default Base
