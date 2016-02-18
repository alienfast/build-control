import extend from 'extend'
import Util from 'gulp-util'
import notify from 'gulp-notify'
import stringify from 'stringify-object'
import gulpHelp from 'gulp-help'
import console from 'console'
import shelljs from 'shelljs'

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

  /**
   * Wraps shellJs calls that act on the file structure to give better output and error handling
   * @param command
   * @param verbose - show output on the cli after execution, defaults to true
   * @param stream - stream the command, defaults to false
   */
  execWrap(command, verbose = true, stream = false) {
    if (stream) {
      verbose = false
    }

    if (this.config.login && this.config.token) {
      stream = false
    }

    let shellResult = shelljs.exec(command, {silent: (!stream)})
    if (shellResult.code === 0) {
      if (verbose) {
        this.log(shellResult.output)
      }
    }
    else {
      throw this.maskSensitive(shellResult.output)
    }
  }

  log(msg) {
    Util.log(this.maskSensitive(msg))
  }

  maskSensitive(str) {
    if (!this.config.token) return str

    return str
      .replace(this.config.login + ':' + this.config.token, '<CREDENTIALS>', 'gm')
      .replace(this.config.token, '<TOKEN>', 'gmi')
  }

  debug(msg) {
    if (this.config.debug) {
      this.log(`[${Util.colors.cyan('debug')}][${Util.colors.cyan(this.constructor.name)}] ${msg}`)
    }
  }

  debugDump(msg, obj) {
    this.debug(`${msg}:\n${stringify(obj)}`)
  }
}

export default Base
