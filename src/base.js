import extend from 'extend'
import stringify from 'stringify-object'
import shelljs from 'shelljs'
import chalk from 'chalk'
import fancyLog from 'fancy-log'
import pathIsAbsolute from 'path-is-absolute'
import path from 'path'

export const Default = {
  debug: false,
  sensitive: {}
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
      throw new Error('cwd is required')
    }

    this.debug(`Executing \`${command}\` with cwd: ${options['cwd']}`)
    let shellResult = shelljs.exec(command, options)
    if (shellResult.code === 0 || shellResult.code === 1) {

      let output = this.logShellOutput(shellResult, logResult);

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
        let msg = `Command failed \`${command}\`, cwd: ${options.cwd}: ${shellResult.stderr}.`
        this.error(msg)
        throw new Error(this.maskSensitive(msg))
      }
    }
  }

  logShellOutput(shellResult, logResult) {
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

export default Base
