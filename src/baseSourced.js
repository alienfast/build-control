import Base from './base'
import Paths from './paths'
import shelljs from 'shelljs'

// NOTE: shelljs.pwd() appears to be returning an object that is a string, but enhanced.  We _just_ want the string so it doesn't cause problems downstream.
const Default = {
  sourceCwd: `${shelljs.pwd()}`, // The base directory of the source e.g. the directory of the package.json (not usually necessary to specify, but useful for odd structures and tests)
  cwd: 'dist'        // The directory that contains your built code.
}

const BaseSourced = class extends Base {

  constructor(...configs) {
    super(Default, ...configs)

    // get a fully resolved sourceCwd based on the process cwd (if not an absolute path)
    this.config.sourceCwd = Paths.resolveCwd(`${shelljs.pwd()}`, this.config.sourceCwd)

    // get a fully resolved cwd based on the sourceCwd (if not an absolute path)
    this.config.cwd = Paths.resolveCwd(this.config.sourceCwd, this.config.cwd)
  }
}

export default BaseSourced
