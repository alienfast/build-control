import extend from 'extend'
import stringify from 'stringify-object'
import shelljs from 'shelljs'
import chalk from 'chalk'
import fancyLog from 'fancy-log'

export const Default = {
  debug: false,
  sensitive: {},
  cwd: 'dist'        // The directory that contains your built code.
}

const Base = class {

  /**
   *
   * @param config - customized overrides
   */
  constructor(...configs) {
    this.config = extend(true, {}, Default, ...configs)

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

export default Base
