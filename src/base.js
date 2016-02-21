import extend from 'extend'
import stringify from 'stringify-object'
import shelljs from 'shelljs'
import chalk from 'chalk'
import fancyLog from 'fancy-log'

export const Default = {}

const Base = class {

  /**
   *
   * @param config - customized overrides
   */
  constructor(config) {
    this.config = extend(true, {}, Default, config)
    this.debug(`[${this.constructor.name}] using resolved config: ${stringify(this.config)}`)
  }

  // ----------------------------------------------
  // protected

  booleanExec(command, logResult = true) {
    try {
      this.exec(command, logResult)
      return true
    }
    catch (error) {
      return false
    }
  }

  safeExec(command, logResult = true) {
    try {
      return this.exec(command, logResult)
    }
    catch (error) {
      return ''
    }
  }

  /**
   * Wraps shellJs calls that act on the file structure to give better output and error handling
   * @param command
   * @param logResult - show output on the cli after execution, defaults to true
   * @param stream - stream the command, defaults to false
   */
  exec(command, logResult = true) {
    this.debug(command)

    let shellResult = shelljs.exec(command, {silent: true})
    if (shellResult.code === 0) {

      let result = shellResult.output
      if (logResult && result != '') {
        this.log(result)
      }
      return result
    }
    else {
      throw new Error(this.maskSensitive(shellResult.output))
    }
  }

  log(msg) {
    fancyLog(this.maskSensitive(msg))
  }

  maskSensitive(str) {
    if (!this.config.token) return str

    return str
      .replace(this.config.login + ':' + this.config.token, '<CREDENTIALS>', 'gm')
      .replace(this.config.token, '<TOKEN>', 'gmi')
  }

  debug(msg) {
    if (this.config.debug) {
      this.log(`[${chalk.cyan('debug')}][${chalk.cyan(this.constructor.name)}] ${msg}`)
    }
  }

  debugDump(msg, obj) {
    this.debug(`${msg}:\n${stringify(obj)}`)
  }
}

export default Base
