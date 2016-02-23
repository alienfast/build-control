import path from 'path'
import pathIsAbsolute from 'path-is-absolute'

const Paths = class {

  static resolveCwd(base, cwd) {
    if (!pathIsAbsolute(cwd)) {
      return path.join(base, cwd)
    }
    else {
      return cwd
    }
  }
}

export default Paths
