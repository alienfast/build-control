import extend from 'extend'
import stringify from 'stringify-object'
import shelljs from 'shelljs'
import chalk from 'chalk'
import fancyLog from 'fancy-log'
import pathIsAbsolute from 'path-is-absolute'
import path from 'path'

export const Default = {
  debug: false
}

const Base = class {

  /**
   *
   * @param config - customized overrides
   */
  constructor(config) {
    this.config = extend(true, {}, Default, config)

    // get a fully resolved cwd
    if (!pathIsAbsolute(this.config.cwd)) {
      this.config.cwd = path.join(shelljs.pwd(), this.config.cwd)
    }

    // hack - tests override #log and we need to complete construction before logging
    setTimeout(() => {
      this.debug(`[${this.constructor.name}] using resolved config: ${stringify(this.config)}`)
    }, 1)
  }

  // ----------------------------------------------
  // protected

  codeExec(command, logResult = true) {
    return this.exec(command, logResult, true)
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
    this.debug(command)
    let options = {silent: true}
    if (this.config.cwd) {
      options['cwd'] = this.config.cwd
    }
    else {
      throw new Error('cwd is required')
    }

    this.debug(`Executing \`${command}\` with cwd: ${options['cwd']}`)
    let shellResult = shelljs.exec(command, options)
    if (shellResult.code === 0) {


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

      // ---
      // determine the return value
      if(returnCode){
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
