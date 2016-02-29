'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var require$$2 = _interopDefault(require('path'));
var require$$1 = _interopDefault(require('fs'));
var require$$0 = _interopDefault(require('os'));
var require$$0$1 = _interopDefault(require('child_process'));
var crypto = _interopDefault(require('crypto'));
var require$$1$1 = _interopDefault(require('util'));
var require$$2$1 = _interopDefault(require('stream'));
var require$$5 = _interopDefault(require('assert'));
var require$$0$2 = _interopDefault(require('constants'));
var require$$8 = _interopDefault(require('events'));

var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }


var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

var index = __commonjs(function (module) {
	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0],
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target === 'undefined' ? 'undefined' : babelHelpers.typeof(target)) !== 'object' && typeof target !== 'function' || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
								target[name] = copy;
							}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};
});

var extend = index && (typeof index === 'undefined' ? 'undefined' : babelHelpers.typeof(index)) === 'object' && 'default' in index ? index['default'] : index;

var index$2 = __commonjs(function (module) {
	'use strict';

	var toString = Object.prototype.toString;

	module.exports = function (x) {
		var prototype;
		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
	};
});

var require$$0$3 = index$2 && (typeof index$2 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$2)) === 'object' && 'default' in index$2 ? index$2['default'] : index$2;

var index$3 = __commonjs(function (module) {
	'use strict';

	module.exports = function (re) {
		return Object.prototype.toString.call(re) === '[object RegExp]';
	};
});

var require$$1$2 = index$3 && (typeof index$3 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$3)) === 'object' && 'default' in index$3 ? index$3['default'] : index$3;

var index$1 = __commonjs(function (module) {
	'use strict';

	var isRegexp = require$$1$2;
	var isPlainObj = require$$0$3;

	module.exports = function (val, opts, pad) {
		var seen = [];

		return function stringify(val, opts, pad) {
			opts = opts || {};
			opts.indent = opts.indent || '\t';
			pad = pad || '';

			if (val === null || val === undefined || typeof val === 'number' || typeof val === 'boolean' || typeof val === 'function' || isRegexp(val)) {
				return String(val);
			}

			if (val instanceof Date) {
				return 'new Date(\'' + val.toISOString() + '\')';
			}

			if (Array.isArray(val)) {
				if (val.length === 0) {
					return '[]';
				}

				return '[\n' + val.map(function (el, i) {
					var eol = val.length - 1 === i ? '\n' : ',\n';
					return pad + opts.indent + stringify(el, opts, pad + opts.indent) + eol;
				}).join('') + pad + ']';
			}

			if (isPlainObj(val)) {
				if (seen.indexOf(val) !== -1) {
					return '"[Circular]"';
				}

				var objKeys = Object.keys(val);

				if (objKeys.length === 0) {
					return '{}';
				}

				seen.push(val);

				var ret = '{\n' + objKeys.map(function (el, i) {
					if (opts.filter && !opts.filter(val, el)) {
						return '';
					}

					var eol = objKeys.length - 1 === i ? '\n' : ',\n';
					var key = /^[a-z$_][a-z$_0-9]*$/i.test(el) ? el : stringify(el, opts);
					return pad + opts.indent + key + ': ' + stringify(val[el], opts, pad + opts.indent) + eol;
				}).join('') + pad + '}';

				seen.pop(val);

				return ret;
			}

			val = String(val).replace(/[\r\n]/g, function (x) {
				return x === '\n' ? '\\n' : '\\r';
			});

			if (opts.singleQuotes === false) {
				return '"' + val.replace(/"/g, '\\\"') + '"';
			}

			return '\'' + val.replace(/'/g, '\\\'') + '\'';
		}(val, opts, pad);
	};
});

var stringify = index$1 && (typeof index$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$1)) === 'object' && 'default' in index$1 ? index$1['default'] : index$1;

var pwd$1 = __commonjs(function (module) {
  var path = require$$2;
  var common = require$$1$3;

  //@
  //@ ### pwd()
  //@ Returns the current directory.
  function _pwd() {
    var pwd = path.resolve(process.cwd());
    return common.ShellString(pwd);
  }
  module.exports = _pwd;
});

var require$$3 = pwd$1 && (typeof pwd$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(pwd$1)) === 'object' && 'default' in pwd$1 ? pwd$1['default'] : pwd$1;

var cd$1 = __commonjs(function (module) {
  var fs = require$$1;
  var common = require$$1$3;

  //@
  //@ ### cd([dir])
  //@ Changes to directory `dir` for the duration of the script. Changes to home
  //@ directory if no argument is supplied.
  function _cd(options, dir) {
    if (!dir) dir = common.getUserHome();

    if (dir === '-') {
      if (!common.state.previousDir) common.error('could not find previous directory');else dir = common.state.previousDir;
    }

    if (!fs.existsSync(dir)) common.error('no such file or directory: ' + dir);

    if (!fs.statSync(dir).isDirectory()) common.error('not a directory: ' + dir);

    common.state.previousDir = process.cwd();
    process.chdir(dir);
  }
  module.exports = _cd;
});

var require$$1$4 = cd$1 && (typeof cd$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(cd$1)) === 'object' && 'default' in cd$1 ? cd$1['default'] : cd$1;

var ls$1 = __commonjs(function (module) {
  var path = require$$2;
  var fs = require$$1;
  var common = require$$1$3;
  var _cd = require$$1$4;
  var _pwd = require$$3;

  //@
  //@ ### ls([options,] [path, ...])
  //@ ### ls([options,] path_array)
  //@ Available options:
  //@
  //@ + `-R`: recursive
  //@ + `-A`: all files (include files beginning with `.`, except for `.` and `..`)
  //@ + `-d`: list directories themselves, not their contents
  //@ + `-l`: list objects representing each file, each with fields containing `ls
  //@         -l` output fields. See
  //@         [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
  //@         for more info
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ ls('projs/*.js');
  //@ ls('-R', '/users/me', '/tmp');
  //@ ls('-R', ['/users/me', '/tmp']); // same as above
  //@ ls('-l', 'file.txt'); // { name: 'file.txt', mode: 33188, nlink: 1, ...}
  //@ ```
  //@
  //@ Returns array of files in the given path, or in current directory if no path provided.
  function _ls(options, paths) {
    options = common.parseOptions(options, {
      'R': 'recursive',
      'A': 'all',
      'a': 'all_deprecated',
      'd': 'directory',
      'l': 'long'
    });

    if (options.all_deprecated) {
      // We won't support the -a option as it's hard to image why it's useful
      // (it includes '.' and '..' in addition to '.*' files)
      // For backwards compatibility we'll dump a deprecated message and proceed as before
      common.log('ls: Option -a is deprecated. Use -A instead');
      options.all = true;
    }

    if (!paths) paths = ['.'];else if ((typeof paths === 'undefined' ? 'undefined' : babelHelpers.typeof(paths)) === 'object') paths = paths; // assume array
    else if (typeof paths === 'string') paths = [].slice.call(arguments, 1);

    var list = [];

    // Conditionally pushes file to list - returns true if pushed, false otherwise
    // (e.g. prevents hidden files to be included unless explicitly told so)
    function pushFile(file, query) {
      var name = file.name || file;
      // hidden file?
      if (path.basename(name)[0] === '.') {
        // not explicitly asking for hidden files?
        if (!options.all && !(path.basename(query)[0] === '.' && path.basename(query).length > 1)) return false;
      }

      if (common.platform === 'win') name = name.replace(/\\/g, '/');

      if (file.name) {
        file.name = name;
      } else {
        file = name;
      }
      list.push(file);
      return true;
    }

    paths.forEach(function (p) {
      if (fs.existsSync(p)) {
        var stats = ls_stat(p);
        // Simple file?
        if (stats.isFile()) {
          if (options.long) {
            pushFile(stats, p);
          } else {
            pushFile(p, p);
          }
          return; // continue
        }

        // Simple dir?
        if (options.directory) {
          pushFile(p, p);
          return;
        } else if (stats.isDirectory()) {
          // Iterate over p contents
          fs.readdirSync(p).forEach(function (file) {
            var orig_file = file;
            if (options.long) file = ls_stat(path.join(p, file));
            if (!pushFile(file, p)) return;

            // Recursive?
            if (options.recursive) {
              var oldDir = _pwd();
              _cd('', p);
              if (fs.statSync(orig_file).isDirectory()) list = list.concat(_ls('-R' + (options.all ? 'A' : ''), orig_file + '/*'));
              _cd('', oldDir);
            }
          });
          return; // continue
        }
      }

      // p does not exist - possible wildcard present

      var basename = path.basename(p);
      var dirname = path.dirname(p);
      // Wildcard present on an existing dir? (e.g. '/tmp/*.js')
      if (basename.search(/\*/) > -1 && fs.existsSync(dirname) && fs.statSync(dirname).isDirectory) {
        // Escape special regular expression chars
        var regexp = basename.replace(/(\^|\$|\(|\)|<|>|\[|\]|\{|\}|\.|\+|\?)/g, '\\$1');
        // Translates wildcard into regex
        regexp = '^' + regexp.replace(/\*/g, '.*') + '$';
        // Iterate over directory contents
        fs.readdirSync(dirname).forEach(function (file) {
          if (file.match(new RegExp(regexp))) {
            var file_path = path.join(dirname, file);
            file_path = options.long ? ls_stat(file_path) : file_path;
            if (file_path.name) file_path.name = path.normalize(file_path.name);else file_path = path.normalize(file_path);
            if (!pushFile(file_path, basename)) return;

            // Recursive?
            if (options.recursive) {
              var pp = dirname + '/' + file;
              if (fs.lstatSync(pp).isDirectory()) list = list.concat(_ls('-R' + (options.all ? 'A' : ''), pp + '/*'));
            } // recursive
          } // if file matches
        }); // forEach
        return;
      }

      common.error('no such file or directory: ' + p, true);
    });

    return list;
  }
  module.exports = _ls;

  function ls_stat(path) {
    var stats = fs.statSync(path);
    // Note: this object will contain more information than .toString() returns
    stats.name = path;
    stats.toString = function () {
      // Return a string resembling unix's `ls -l` format
      return [this.mode, this.nlink, this.uid, this.gid, this.size, this.mtime, this.name].join(' ');
    };
    return stats;
  }
});

var require$$0$5 = ls$1 && (typeof ls$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(ls$1)) === 'object' && 'default' in ls$1 ? ls$1['default'] : ls$1;

var common = __commonjs(function (module, exports) {
  var os = require$$0;
  var fs = require$$1;
  var _ls = require$$0$5;

  // Module globals
  var config = {
    silent: false,
    fatal: false,
    verbose: false
  };
  exports.config = config;

  var state = {
    error: null,
    currentCmd: 'shell.js',
    previousDir: null,
    tempDir: null
  };
  exports.state = state;

  var platform = os.type().match(/^Win/) ? 'win' : 'unix';
  exports.platform = platform;

  function log() {
    if (!config.silent) console.error.apply(console, arguments);
  }
  exports.log = log;

  // Shows error message. Throws unless _continue or config.fatal are true
  function error(msg, _continue) {
    if (state.error === null) state.error = '';
    var log_entry = state.currentCmd + ': ' + msg;
    if (state.error === '') state.error = log_entry;else state.error += '\n' + log_entry;

    if (msg.length > 0) log(log_entry);

    if (config.fatal) process.exit(1);

    if (!_continue) throw '';
  }
  exports.error = error;

  // In the future, when Proxies are default, we can add methods like `.to()` to primitive strings.
  // For now, this is a dummy function to bookmark places we need such strings
  function ShellString(str) {
    return str;
  }
  exports.ShellString = ShellString;

  // Return the home directory in a platform-agnostic way, with consideration for
  // older versions of node
  function getUserHome() {
    var result;
    if (os.homedir) result = os.homedir(); // node 3+
    else result = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
    return result;
  }
  exports.getUserHome = getUserHome;

  // Returns {'alice': true, 'bob': false} when passed a string and dictionary as follows:
  //   parseOptions('-a', {'a':'alice', 'b':'bob'});
  // Returns {'reference': 'string-value', 'bob': false} when passed two dictionaries of the form:
  //   parseOptions({'-r': 'string-value'}, {'r':'reference', 'b':'bob'});
  function parseOptions(opt, map) {
    if (!map) error('parseOptions() internal error: no map given');

    // All options are false by default
    var options = {};
    for (var letter in map) {
      if (map[letter][0] !== '!') options[map[letter]] = false;
    }

    if (!opt) return options; // defaults

    var optionName;
    if (typeof opt === 'string') {
      if (opt[0] !== '-') return options;

      // e.g. chars = ['R', 'f']
      var chars = opt.slice(1).split('');

      chars.forEach(function (c) {
        if (c in map) {
          optionName = map[c];
          if (optionName[0] === '!') options[optionName.slice(1, optionName.length - 1)] = false;else options[optionName] = true;
        } else {
          error('option not recognized: ' + c);
        }
      });
    } else if ((typeof opt === 'undefined' ? 'undefined' : babelHelpers.typeof(opt)) === 'object') {
      for (var key in opt) {
        // key is a string of the form '-r', '-d', etc.
        var c = key[1];
        if (c in map) {
          optionName = map[c];
          options[optionName] = opt[key]; // assign the given value
        } else {
            error('option not recognized: ' + c);
          }
      }
    } else {
      error('options must be strings or key-value pairs');
    }
    return options;
  }
  exports.parseOptions = parseOptions;

  // Expands wildcards with matching (ie. existing) file names.
  // For example:
  //   expand(['file*.js']) = ['file1.js', 'file2.js', ...]
  //   (if the files 'file1.js', 'file2.js', etc, exist in the current dir)
  function expand(list) {
    var expanded = [];
    list.forEach(function (listEl) {
      // Wildcard present on directory names ?
      if (listEl.search(/\*[^\/]*\//) > -1 || listEl.search(/\*\*[^\/]*\//) > -1) {
        var match = listEl.match(/^([^*]+\/|)(.*)/);
        var root = match[1];
        var rest = match[2];
        var restRegex = rest.replace(/\*\*/g, ".*").replace(/\*/g, "[^\\/]*");
        restRegex = new RegExp(restRegex);

        _ls('-R', root).filter(function (e) {
          return restRegex.test(e);
        }).forEach(function (file) {
          expanded.push(file);
        });
      }
      // Wildcard present on file names ?
      else if (listEl.search(/\*/) > -1) {
          _ls('', listEl).forEach(function (file) {
            expanded.push(file);
          });
        } else {
          expanded.push(listEl);
        }
    });
    return expanded;
  }
  exports.expand = expand;

  // Normalizes _unlinkSync() across platforms to match Unix behavior, i.e.
  // file can be unlinked even if it's read-only, see https://github.com/joyent/node/issues/3006
  function unlinkSync(file) {
    try {
      fs.unlinkSync(file);
    } catch (e) {
      // Try to override file permission
      if (e.code === 'EPERM') {
        fs.chmodSync(file, '0666');
        fs.unlinkSync(file);
      } else {
        throw e;
      }
    }
  }
  exports.unlinkSync = unlinkSync;

  // e.g. 'shelljs_a5f185d0443ca...'
  function randomFileName() {
    function randomHash(count) {
      if (count === 1) return parseInt(16 * Math.random(), 10).toString(16);else {
        var hash = '';
        for (var i = 0; i < count; i++) {
          hash += randomHash(1);
        }return hash;
      }
    }

    return 'shelljs_' + randomHash(20);
  }
  exports.randomFileName = randomFileName;

  // extend(target_obj, source_obj1 [, source_obj2 ...])
  // Shallow extend, e.g.:
  //    extend({A:1}, {b:2}, {c:3}) returns {A:1, b:2, c:3}
  function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      for (var key in source) {
        target[key] = source[key];
      }
    });

    return target;
  }
  exports.extend = extend;

  // Common wrapper for all Unix-like commands
  function wrap(cmd, fn, options) {
    return function () {
      var retValue = null;

      state.currentCmd = cmd;
      state.error = null;

      try {
        var args = [].slice.call(arguments, 0);

        if (config.verbose) {
          args.unshift(cmd);
          console.log.apply(console, args);
          args.shift();
        }

        if (options && options.notUnix) {
          retValue = fn.apply(this, args);
        } else {
          if (babelHelpers.typeof(args[0]) === 'object' && args[0].constructor.name === 'Object') {
            args = args; // object count as options
          } else if (args.length === 0 || typeof args[0] !== 'string' || args[0].length <= 1 || args[0][0] !== '-') {
              args.unshift(''); // only add dummy option if '-option' not already present
            }
          // Expand the '~' if appropriate
          var homeDir = getUserHome();
          args = args.map(function (arg) {
            if (typeof arg === 'string' && arg.slice(0, 2) === '~/' || arg === '~') return arg.replace(/^~/, homeDir);else return arg;
          });
          retValue = fn.apply(this, args);
        }
      } catch (e) {
        if (!state.error) {
          // If state.error hasn't been set it's an error thrown by Node, not us - probably a bug...
          console.log('shell.js: internal error');
          console.log(e.stack || e);
          process.exit(1);
        }
        if (config.fatal) throw e;
      }

      state.currentCmd = 'shell.js';
      return retValue;
    };
  } // wrap
  exports.wrap = wrap;
});

var require$$1$3 = common && (typeof common === 'undefined' ? 'undefined' : babelHelpers.typeof(common)) === 'object' && 'default' in common ? common['default'] : common;

var error$1 = __commonjs(function (module) {
  var common = require$$1$3;

  //@
  //@ ### error()
  //@ Tests if error occurred in the last command. Returns `null` if no error occurred,
  //@ otherwise returns string explaining the error
  function error() {
    return common.state.error;
  }
  module.exports = error;
});

var require$$0$4 = error$1 && (typeof error$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(error$1)) === 'object' && 'default' in error$1 ? error$1['default'] : error$1;

var tempdir$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var os = require$$0;
  var fs = require$$1;

  // Returns false if 'dir' is not a writeable directory, 'dir' otherwise
  function writeableDir(dir) {
    if (!dir || !fs.existsSync(dir)) return false;

    if (!fs.statSync(dir).isDirectory()) return false;

    var testFile = dir + '/' + common.randomFileName();
    try {
      fs.writeFileSync(testFile, ' ');
      common.unlinkSync(testFile);
      return dir;
    } catch (e) {
      return false;
    }
  }

  //@
  //@ ### tempdir()
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ var tmp = tempdir(); // "/tmp" for most *nix platforms
  //@ ```
  //@
  //@ Searches and returns string containing a writeable, platform-dependent temporary directory.
  //@ Follows Python's [tempfile algorithm](http://docs.python.org/library/tempfile.html#tempfile.tempdir).
  function _tempDir() {
    var state = common.state;
    if (state.tempDir) return state.tempDir; // from cache

    state.tempDir = writeableDir(os.tmpdir && os.tmpdir()) || // node 0.10+
    writeableDir(os.tmpDir && os.tmpDir()) || // node 0.8+
    writeableDir(process.env['TMPDIR']) || writeableDir(process.env['TEMP']) || writeableDir(process.env['TMP']) || writeableDir(process.env['Wimp$ScrapDir']) || // RiscOS
    writeableDir('C:\\TEMP') || // Windows
    writeableDir('C:\\TMP') || // Windows
    writeableDir('\\TEMP') || // Windows
    writeableDir('\\TMP') || // Windows
    writeableDir('/tmp') || writeableDir('/var/tmp') || writeableDir('/usr/tmp') || writeableDir('.'); // last resort

    return state.tempDir;
  }
  module.exports = _tempDir;
});

var require$$4 = tempdir$1 && (typeof tempdir$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(tempdir$1)) === 'object' && 'default' in tempdir$1 ? tempdir$1['default'] : tempdir$1;

var set$1 = __commonjs(function (module) {
  var common = require$$1$3;

  //@
  //@ ### set(options)
  //@ Available options:
  //@
  //@ + `+/-e`: exit upon error (`config.fatal`)
  //@ + `+/-v`: verbose: show all commands (`config.verbose`)
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ set('-e'); // exit upon first error
  //@ set('+e'); // this undoes a "set('-e')"
  //@ ```
  //@
  //@ Sets global configuration variables
  function _set(options) {
    if (!options) {
      var args = [].slice.call(arguments, 0);
      if (args.length < 2) common.error('must provide an argument');
      options = args[1];
    }
    var negate = options[0] === '+';
    if (negate) {
      options = '-' + options.slice(1); // parseOptions needs a '-' prefix
    }
    options = common.parseOptions(options, {
      'e': 'fatal',
      'v': 'verbose'
    });

    var key;
    if (negate) {
      for (key in options) {
        options[key] = !options[key];
      }
    }

    for (key in options) {
      // Only change the global config if `negate` is false and the option is true
      // or if `negate` is true and the option is false (aka negate !== option)
      if (negate !== options[key]) {
        common.config[key] = options[key];
      }
    }
    return;
  }
  module.exports = _set;
});

var require$$2$2 = set$1 && (typeof set$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(set$1)) === 'object' && 'default' in set$1 ? set$1['default'] : set$1;

var touch$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;

  //@
  //@ ### touch([options,] file)
  //@ Available options:
  //@
  //@ + `-a`: Change only the access time
  //@ + `-c`: Do not create any files
  //@ + `-m`: Change only the modification time
  //@ + `-d DATE`: Parse DATE and use it instead of current time
  //@ + `-r FILE`: Use FILE's times instead of current time
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ touch('source.js');
  //@ touch('-c', '/path/to/some/dir/source.js');
  //@ touch({ '-r': FILE }, '/path/to/some/dir/source.js');
  //@ ```
  //@
  //@ Update the access and modification times of each FILE to the current time.
  //@ A FILE argument that does not exist is created empty, unless -c is supplied.
  //@ This is a partial implementation of *[touch(1)](http://linux.die.net/man/1/touch)*.
  function _touch(opts, files) {
    opts = common.parseOptions(opts, {
      'a': 'atime_only',
      'c': 'no_create',
      'd': 'date',
      'm': 'mtime_only',
      'r': 'reference'
    });

    if (!files) {
      common.error('no paths given');
    }

    if (Array.isArray(files)) {
      files.forEach(function (f) {
        touchFile(opts, f);
      });
    } else if (typeof files === 'string') {
      touchFile(opts, files);
    } else {
      common.error('file arg should be a string file path or an Array of string file paths');
    }
  }

  function touchFile(opts, file) {
    var stat = tryStatFile(file);

    if (stat && stat.isDirectory()) {
      // don't error just exit
      return;
    }

    // if the file doesn't already exist and the user has specified --no-create then
    // this script is finished
    if (!stat && opts.no_create) {
      return;
    }

    // open the file and then close it. this will create it if it doesn't exist but will
    // not truncate the file
    fs.closeSync(fs.openSync(file, 'a'));

    //
    // Set timestamps
    //

    // setup some defaults
    var now = new Date();
    var mtime = opts.date || now;
    var atime = opts.date || now;

    // use reference file
    if (opts.reference) {
      var refStat = tryStatFile(opts.reference);
      if (!refStat) {
        common.error('failed to get attributess of ' + opts.reference);
      }
      mtime = refStat.mtime;
      atime = refStat.atime;
    } else if (opts.date) {
      mtime = opts.date;
      atime = opts.date;
    }

    if (opts.atime_only && opts.mtime_only) {
      // keep the new values of mtime and atime like GNU
    } else if (opts.atime_only) {
        mtime = stat.mtime;
      } else if (opts.mtime_only) {
        atime = stat.atime;
      }

    fs.utimesSync(file, atime, mtime);
  }

  module.exports = _touch;

  function tryStatFile(filePath) {
    try {
      return fs.statSync(filePath);
    } catch (e) {
      return null;
    }
  }
});

var require$$3$1 = touch$1 && (typeof touch$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(touch$1)) === 'object' && 'default' in touch$1 ? touch$1['default'] : touch$1;

var chmod$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;
  var path = require$$2;

  var PERMS = function (base) {
    return {
      OTHER_EXEC: base.EXEC,
      OTHER_WRITE: base.WRITE,
      OTHER_READ: base.READ,

      GROUP_EXEC: base.EXEC << 3,
      GROUP_WRITE: base.WRITE << 3,
      GROUP_READ: base.READ << 3,

      OWNER_EXEC: base.EXEC << 6,
      OWNER_WRITE: base.WRITE << 6,
      OWNER_READ: base.READ << 6,

      // Literal octal numbers are apparently not allowed in "strict" javascript.  Using parseInt is
      // the preferred way, else a jshint warning is thrown.
      STICKY: parseInt('01000', 8),
      SETGID: parseInt('02000', 8),
      SETUID: parseInt('04000', 8),

      TYPE_MASK: parseInt('0770000', 8)
    };
  }({
    EXEC: 1,
    WRITE: 2,
    READ: 4
  });

  //@
  //@ ### chmod(octal_mode || octal_string, file)
  //@ ### chmod(symbolic_mode, file)
  //@
  //@ Available options:
  //@
  //@ + `-v`: output a diagnostic for every file processed//@
  //@ + `-c`: like verbose but report only when a change is made//@
  //@ + `-R`: change files and directories recursively//@
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ chmod(755, '/Users/brandon');
  //@ chmod('755', '/Users/brandon'); // same as above
  //@ chmod('u+x', '/Users/brandon');
  //@ ```
  //@
  //@ Alters the permissions of a file or directory by either specifying the
  //@ absolute permissions in octal form or expressing the changes in symbols.
  //@ This command tries to mimic the POSIX behavior as much as possible.
  //@ Notable exceptions:
  //@
  //@ + In symbolic modes, 'a-r' and '-r' are identical.  No consideration is
  //@   given to the umask.
  //@ + There is no "quiet" option since default behavior is to run silent.
  function _chmod(options, mode, filePattern) {
    if (!filePattern) {
      if (options.length > 0 && options.charAt(0) === '-') {
        // Special case where the specified file permissions started with - to subtract perms, which
        // get picked up by the option parser as command flags.
        // If we are down by one argument and options starts with -, shift everything over.
        filePattern = mode;
        mode = options;
        options = '';
      } else {
        common.error('You must specify a file.');
      }
    }

    options = common.parseOptions(options, {
      'R': 'recursive',
      'c': 'changes',
      'v': 'verbose'
    });

    if (typeof filePattern === 'string') {
      filePattern = [filePattern];
    }

    var files;

    if (options.recursive) {
      files = [];
      common.expand(filePattern).forEach(function addFile(expandedFile) {
        var stat = fs.lstatSync(expandedFile);

        if (!stat.isSymbolicLink()) {
          files.push(expandedFile);

          if (stat.isDirectory()) {
            // intentionally does not follow symlinks.
            fs.readdirSync(expandedFile).forEach(function (child) {
              addFile(expandedFile + '/' + child);
            });
          }
        }
      });
    } else {
      files = common.expand(filePattern);
    }

    files.forEach(function innerChmod(file) {
      file = path.resolve(file);
      if (!fs.existsSync(file)) {
        common.error('File not found: ' + file);
      }

      // When recursing, don't follow symlinks.
      if (options.recursive && fs.lstatSync(file).isSymbolicLink()) {
        return;
      }

      var stat = fs.statSync(file);
      var isDir = stat.isDirectory();
      var perms = stat.mode;
      var type = perms & PERMS.TYPE_MASK;

      var newPerms = perms;

      if (isNaN(parseInt(mode, 8))) {
        // parse options
        mode.split(',').forEach(function (symbolicMode) {
          /*jshint regexdash:true */
          var pattern = /([ugoa]*)([=\+-])([rwxXst]*)/i;
          var matches = pattern.exec(symbolicMode);

          if (matches) {
            var applyTo = matches[1];
            var operator = matches[2];
            var change = matches[3];

            var changeOwner = applyTo.indexOf('u') != -1 || applyTo === 'a' || applyTo === '';
            var changeGroup = applyTo.indexOf('g') != -1 || applyTo === 'a' || applyTo === '';
            var changeOther = applyTo.indexOf('o') != -1 || applyTo === 'a' || applyTo === '';

            var changeRead = change.indexOf('r') != -1;
            var changeWrite = change.indexOf('w') != -1;
            var changeExec = change.indexOf('x') != -1;
            var changeExecDir = change.indexOf('X') != -1;
            var changeSticky = change.indexOf('t') != -1;
            var changeSetuid = change.indexOf('s') != -1;

            if (changeExecDir && isDir) changeExec = true;

            var mask = 0;
            if (changeOwner) {
              mask |= (changeRead ? PERMS.OWNER_READ : 0) + (changeWrite ? PERMS.OWNER_WRITE : 0) + (changeExec ? PERMS.OWNER_EXEC : 0) + (changeSetuid ? PERMS.SETUID : 0);
            }
            if (changeGroup) {
              mask |= (changeRead ? PERMS.GROUP_READ : 0) + (changeWrite ? PERMS.GROUP_WRITE : 0) + (changeExec ? PERMS.GROUP_EXEC : 0) + (changeSetuid ? PERMS.SETGID : 0);
            }
            if (changeOther) {
              mask |= (changeRead ? PERMS.OTHER_READ : 0) + (changeWrite ? PERMS.OTHER_WRITE : 0) + (changeExec ? PERMS.OTHER_EXEC : 0);
            }

            // Sticky bit is special - it's not tied to user, group or other.
            if (changeSticky) {
              mask |= PERMS.STICKY;
            }

            switch (operator) {
              case '+':
                newPerms |= mask;
                break;

              case '-':
                newPerms &= ~mask;
                break;

              case '=':
                newPerms = type + mask;

                // According to POSIX, when using = to explicitly set the permissions, setuid and setgid can never be cleared.
                if (fs.statSync(file).isDirectory()) {
                  newPerms |= PERMS.SETUID + PERMS.SETGID & perms;
                }
                break;
            }

            if (options.verbose) {
              console.log(file + ' -> ' + newPerms.toString(8));
            }

            if (perms != newPerms) {
              if (!options.verbose && options.changes) {
                console.log(file + ' -> ' + newPerms.toString(8));
              }
              fs.chmodSync(file, newPerms);
              perms = newPerms; // for the next round of changes!
            }
          } else {
              common.error('Invalid symbolic mode change: ' + symbolicMode);
            }
        });
      } else {
        // they gave us a full number
        newPerms = type + parseInt(mode, 8);

        // POSIX rules are that setuid and setgid can only be added using numeric form, but not cleared.
        if (fs.statSync(file).isDirectory()) {
          newPerms |= PERMS.SETUID + PERMS.SETGID & perms;
        }

        fs.chmodSync(file, newPerms);
      }
    });
  }
  module.exports = _chmod;
});

var require$$4$1 = chmod$1 && (typeof chmod$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(chmod$1)) === 'object' && 'default' in chmod$1 ? chmod$1['default'] : chmod$1;

var exec$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var _tempDir = require$$4;
  var _pwd = require$$3;
  var path = require$$2;
  var fs = require$$1;
  var child = require$$0$1;

  var DEFAULT_MAXBUFFER_SIZE = 20 * 1024 * 1024;

  // Hack to run child_process.exec() synchronously (sync avoids callback hell)
  // Uses a custom wait loop that checks for a flag file, created when the child process is done.
  // (Can't do a wait loop that checks for internal Node variables/messages as
  // Node is single-threaded; callbacks and other internal state changes are done in the
  // event loop).
  function execSync(cmd, opts) {
    var tempDir = _tempDir();
    var stdoutFile = path.resolve(tempDir + '/' + common.randomFileName()),
        stderrFile = path.resolve(tempDir + '/' + common.randomFileName()),
        codeFile = path.resolve(tempDir + '/' + common.randomFileName()),
        scriptFile = path.resolve(tempDir + '/' + common.randomFileName()),
        sleepFile = path.resolve(tempDir + '/' + common.randomFileName());

    opts = common.extend({
      silent: common.config.silent,
      cwd: _pwd(),
      env: process.env,
      maxBuffer: DEFAULT_MAXBUFFER_SIZE
    }, opts);

    var previousStdoutContent = '',
        previousStderrContent = '';
    // Echoes stdout and stderr changes from running process, if not silent
    function updateStream(streamFile) {
      if (opts.silent || !fs.existsSync(streamFile)) return;

      var previousStreamContent, proc_stream;
      if (streamFile === stdoutFile) {
        previousStreamContent = previousStdoutContent;
        proc_stream = process.stdout;
      } else {
        // assume stderr
        previousStreamContent = previousStderrContent;
        proc_stream = process.stderr;
      }

      var streamContent = fs.readFileSync(streamFile, 'utf8');
      // No changes since last time?
      if (streamContent.length <= previousStreamContent.length) return;

      proc_stream.write(streamContent.substr(previousStreamContent.length));
      previousStreamContent = streamContent;
    }

    function escape(str) {
      return (str + '').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");
    }

    if (fs.existsSync(scriptFile)) common.unlinkSync(scriptFile);
    if (fs.existsSync(stdoutFile)) common.unlinkSync(stdoutFile);
    if (fs.existsSync(stderrFile)) common.unlinkSync(stderrFile);
    if (fs.existsSync(codeFile)) common.unlinkSync(codeFile);

    var execCommand = '"' + process.execPath + '" ' + scriptFile;
    var script;

    if (typeof child.execSync === 'function') {
      script = ["var child = require('child_process')", "  , fs = require('fs');", "var childProcess = child.exec('" + escape(cmd) + "', {env: process.env, maxBuffer: " + opts.maxBuffer + "}, function(err) {", "  fs.writeFileSync('" + escape(codeFile) + "', err ? err.code.toString() : '0');", "});", "var stdoutStream = fs.createWriteStream('" + escape(stdoutFile) + "');", "var stderrStream = fs.createWriteStream('" + escape(stderrFile) + "');", "childProcess.stdout.pipe(stdoutStream, {end: false});", "childProcess.stderr.pipe(stderrStream, {end: false});", "childProcess.stdout.pipe(process.stdout);", "childProcess.stderr.pipe(process.stderr);", "var stdoutEnded = false, stderrEnded = false;", "function tryClosingStdout(){ if(stdoutEnded){ stdoutStream.end(); } }", "function tryClosingStderr(){ if(stderrEnded){ stderrStream.end(); } }", "childProcess.stdout.on('end', function(){ stdoutEnded = true; tryClosingStdout(); });", "childProcess.stderr.on('end', function(){ stderrEnded = true; tryClosingStderr(); });"].join('\n');

      fs.writeFileSync(scriptFile, script);

      if (opts.silent) {
        opts.stdio = 'ignore';
      } else {
        opts.stdio = [0, 1, 2];
      }

      // Welcome to the future
      child.execSync(execCommand, opts);
    } else {
      cmd += ' > ' + stdoutFile + ' 2> ' + stderrFile; // works on both win/unix

      script = ["var child = require('child_process')", "  , fs = require('fs');", "var childProcess = child.exec('" + escape(cmd) + "', {env: process.env, maxBuffer: " + opts.maxBuffer + "}, function(err) {", "  fs.writeFileSync('" + escape(codeFile) + "', err ? err.code.toString() : '0');", "});"].join('\n');

      fs.writeFileSync(scriptFile, script);

      child.exec(execCommand, opts);

      // The wait loop
      // sleepFile is used as a dummy I/O op to mitigate unnecessary CPU usage
      // (tried many I/O sync ops, writeFileSync() seems to be only one that is effective in reducing
      // CPU usage, though apparently not so much on Windows)
      while (!fs.existsSync(codeFile)) {
        updateStream(stdoutFile);fs.writeFileSync(sleepFile, 'a');
      }
      while (!fs.existsSync(stdoutFile)) {
        updateStream(stdoutFile);fs.writeFileSync(sleepFile, 'a');
      }
      while (!fs.existsSync(stderrFile)) {
        updateStream(stderrFile);fs.writeFileSync(sleepFile, 'a');
      }
    }

    // At this point codeFile exists, but it's not necessarily flushed yet.
    // Keep reading it until it is.
    var code = parseInt('', 10);
    while (isNaN(code)) {
      code = parseInt(fs.readFileSync(codeFile, 'utf8'), 10);
    }

    var stdout = fs.readFileSync(stdoutFile, 'utf8');
    var stderr = fs.readFileSync(stderrFile, 'utf8');

    // No biggie if we can't erase the files now -- they're in a temp dir anyway
    try {
      common.unlinkSync(scriptFile);
    } catch (e) {}
    try {
      common.unlinkSync(stdoutFile);
    } catch (e) {}
    try {
      common.unlinkSync(stderrFile);
    } catch (e) {}
    try {
      common.unlinkSync(codeFile);
    } catch (e) {}
    try {
      common.unlinkSync(sleepFile);
    } catch (e) {}

    // some shell return codes are defined as errors, per http://tldp.org/LDP/abs/html/exitcodes.html
    if (code === 1 || code === 2 || code >= 126) {
      common.error('', true); // unix/shell doesn't really give an error message after non-zero exit codes
    }
    // True if successful, false if not
    var obj = {
      code: code,
      output: stdout, // deprecated
      stdout: stdout,
      stderr: stderr
    };
    return obj;
  } // execSync()

  // Wrapper around exec() to enable echoing output to console in real time
  function execAsync(cmd, opts, callback) {
    var stdout = '';
    var stderr = '';

    opts = common.extend({
      silent: common.config.silent,
      cwd: _pwd(),
      env: process.env,
      maxBuffer: DEFAULT_MAXBUFFER_SIZE
    }, opts);

    var c = child.exec(cmd, opts, function (err) {
      if (callback) callback(err ? err.code : 0, stdout, stderr);
    });

    c.stdout.on('data', function (data) {
      stdout += data;
      if (!opts.silent) process.stdout.write(data);
    });

    c.stderr.on('data', function (data) {
      stderr += data;
      if (!opts.silent) process.stderr.write(data);
    });

    return c;
  }

  //@
  //@ ### exec(command [, options] [, callback])
  //@ Available options (all `false` by default):
  //@
  //@ + `async`: Asynchronous execution. If a callback is provided, it will be set to
  //@   `true`, regardless of the passed value.
  //@ + `silent`: Do not echo program output to console.
  //@ + and any option available to NodeJS's
  //@   [child_process.exec()](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ var version = exec('node --version', {silent:true}).stdout;
  //@
  //@ var child = exec('some_long_running_process', {async:true});
  //@ child.stdout.on('data', function(data) {
  //@   /* ... do something with data ... */
  //@ });
  //@
  //@ exec('some_long_running_process', function(code, stdout, stderr) {
  //@   console.log('Exit code:', code);
  //@   console.log('Program output:', stdout);
  //@   console.log('Program stderr:', stderr);
  //@ });
  //@ ```
  //@
  //@ Executes the given `command` _synchronously_, unless otherwise specified.  When in synchronous
  //@ mode returns the object `{ code:..., stdout:... , stderr:... }`, containing the program's
  //@ `stdout`, `stderr`, and its exit `code`. Otherwise returns the child process object,
  //@ and the `callback` gets the arguments `(code, stdout, stderr)`.
  //@
  //@ **Note:** For long-lived processes, it's best to run `exec()` asynchronously as
  //@ the current synchronous implementation uses a lot of CPU. This should be getting
  //@ fixed soon.
  function _exec(command, options, callback) {
    if (!command) common.error('must specify command');

    // Callback is defined instead of options.
    if (typeof options === 'function') {
      callback = options;
      options = { async: true };
    }

    // Callback is defined with options.
    if ((typeof options === 'undefined' ? 'undefined' : babelHelpers.typeof(options)) === 'object' && typeof callback === 'function') {
      options.async = true;
    }

    options = common.extend({
      silent: common.config.silent,
      async: false
    }, options);

    try {
      if (options.async) return execAsync(command, options, callback);else return execSync(command, options);
    } catch (e) {
      common.error('internal error');
    }
  }
  module.exports = _exec;
});

var require$$5$1 = exec$1 && (typeof exec$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(exec$1)) === 'object' && 'default' in exec$1 ? exec$1['default'] : exec$1;

var ln$1 = __commonjs(function (module) {
  var fs = require$$1;
  var path = require$$2;
  var common = require$$1$3;

  //@
  //@ ### ln([options,] source, dest)
  //@ Available options:
  //@
  //@ + `-s`: symlink
  //@ + `-f`: force
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ ln('file', 'newlink');
  //@ ln('-sf', 'file', 'existing');
  //@ ```
  //@
  //@ Links source to dest. Use -f to force the link, should dest already exist.
  function _ln(options, source, dest) {
    options = common.parseOptions(options, {
      's': 'symlink',
      'f': 'force'
    });

    if (!source || !dest) {
      common.error('Missing <source> and/or <dest>');
    }

    source = String(source);
    var sourcePath = path.normalize(source).replace(RegExp(path.sep + '$'), '');
    var isAbsolute = path.resolve(source) === sourcePath;
    dest = path.resolve(process.cwd(), String(dest));

    if (fs.existsSync(dest)) {
      if (!options.force) {
        common.error('Destination file exists', true);
      }

      fs.unlinkSync(dest);
    }

    if (options.symlink) {
      var isWindows = common.platform === 'win';
      var linkType = isWindows ? 'file' : null;
      var resolvedSourcePath = isAbsolute ? sourcePath : path.resolve(process.cwd(), path.dirname(dest), source);
      if (!fs.existsSync(resolvedSourcePath)) {
        common.error('Source file does not exist', true);
      } else if (isWindows && fs.statSync(resolvedSourcePath).isDirectory()) {
        linkType = 'junction';
      }

      try {
        fs.symlinkSync(linkType === 'junction' ? resolvedSourcePath : source, dest, linkType);
      } catch (err) {
        common.error(err.message);
      }
    } else {
      if (!fs.existsSync(source)) {
        common.error('Source file does not exist', true);
      }
      try {
        fs.linkSync(source, dest);
      } catch (err) {
        common.error(err.message);
      }
    }
  }
  module.exports = _ln;
});

var require$$6 = ln$1 && (typeof ln$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(ln$1)) === 'object' && 'default' in ln$1 ? ln$1['default'] : ln$1;

var dirs = __commonjs(function (module, exports) {
  var common = require$$1$3;
  var _cd = require$$1$4;
  var path = require$$2;

  // Pushd/popd/dirs internals
  var _dirStack = [];

  function _isStackIndex(index) {
    return (/^[\-+]\d+$/.test(index)
    );
  }

  function _parseStackIndex(index) {
    if (_isStackIndex(index)) {
      if (Math.abs(index) < _dirStack.length + 1) {
        // +1 for pwd
        return (/^-/.test(index) ? Number(index) - 1 : Number(index)
        );
      } else {
        common.error(index + ': directory stack index out of range');
      }
    } else {
      common.error(index + ': invalid number');
    }
  }

  function _actualDirStack() {
    return [process.cwd()].concat(_dirStack);
  }

  //@
  //@ ### pushd([options,] [dir | '-N' | '+N'])
  //@
  //@ Available options:
  //@
  //@ + `-n`: Suppresses the normal change of directory when adding directories to the stack, so that only the stack is manipulated.
  //@
  //@ Arguments:
  //@
  //@ + `dir`: Makes the current working directory be the top of the stack, and then executes the equivalent of `cd dir`.
  //@ + `+N`: Brings the Nth directory (counting from the left of the list printed by dirs, starting with zero) to the top of the list by rotating the stack.
  //@ + `-N`: Brings the Nth directory (counting from the right of the list printed by dirs, starting with zero) to the top of the list by rotating the stack.
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ // process.cwd() === '/usr'
  //@ pushd('/etc'); // Returns /etc /usr
  //@ pushd('+1');   // Returns /usr /etc
  //@ ```
  //@
  //@ Save the current directory on the top of the directory stack and then cd to `dir`. With no arguments, pushd exchanges the top two directories. Returns an array of paths in the stack.
  function _pushd(options, dir) {
    if (_isStackIndex(options)) {
      dir = options;
      options = '';
    }

    options = common.parseOptions(options, {
      'n': 'no-cd'
    });

    var dirs = _actualDirStack();

    if (dir === '+0') {
      return dirs; // +0 is a noop
    } else if (!dir) {
        if (dirs.length > 1) {
          dirs = dirs.splice(1, 1).concat(dirs);
        } else {
          return common.error('no other directory');
        }
      } else if (_isStackIndex(dir)) {
        var n = _parseStackIndex(dir);
        dirs = dirs.slice(n).concat(dirs.slice(0, n));
      } else {
        if (options['no-cd']) {
          dirs.splice(1, 0, dir);
        } else {
          dirs.unshift(dir);
        }
      }

    if (options['no-cd']) {
      dirs = dirs.slice(1);
    } else {
      dir = path.resolve(dirs.shift());
      _cd('', dir);
    }

    _dirStack = dirs;
    return _dirs('');
  }
  exports.pushd = _pushd;

  //@
  //@ ### popd([options,] ['-N' | '+N'])
  //@
  //@ Available options:
  //@
  //@ + `-n`: Suppresses the normal change of directory when removing directories from the stack, so that only the stack is manipulated.
  //@
  //@ Arguments:
  //@
  //@ + `+N`: Removes the Nth directory (counting from the left of the list printed by dirs), starting with zero.
  //@ + `-N`: Removes the Nth directory (counting from the right of the list printed by dirs), starting with zero.
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ echo(process.cwd()); // '/usr'
  //@ pushd('/etc');       // '/etc /usr'
  //@ echo(process.cwd()); // '/etc'
  //@ popd();              // '/usr'
  //@ echo(process.cwd()); // '/usr'
  //@ ```
  //@
  //@ When no arguments are given, popd removes the top directory from the stack and performs a cd to the new top directory. The elements are numbered from 0 starting at the first directory listed with dirs; i.e., popd is equivalent to popd +0. Returns an array of paths in the stack.
  function _popd(options, index) {
    if (_isStackIndex(options)) {
      index = options;
      options = '';
    }

    options = common.parseOptions(options, {
      'n': 'no-cd'
    });

    if (!_dirStack.length) {
      return common.error('directory stack empty');
    }

    index = _parseStackIndex(index || '+0');

    if (options['no-cd'] || index > 0 || _dirStack.length + index === 0) {
      index = index > 0 ? index - 1 : index;
      _dirStack.splice(index, 1);
    } else {
      var dir = path.resolve(_dirStack.shift());
      _cd('', dir);
    }

    return _dirs('');
  }
  exports.popd = _popd;

  //@
  //@ ### dirs([options | '+N' | '-N'])
  //@
  //@ Available options:
  //@
  //@ + `-c`: Clears the directory stack by deleting all of the elements.
  //@
  //@ Arguments:
  //@
  //@ + `+N`: Displays the Nth directory (counting from the left of the list printed by dirs when invoked without options), starting with zero.
  //@ + `-N`: Displays the Nth directory (counting from the right of the list printed by dirs when invoked without options), starting with zero.
  //@
  //@ Display the list of currently remembered directories. Returns an array of paths in the stack, or a single path if +N or -N was specified.
  //@
  //@ See also: pushd, popd
  function _dirs(options, index) {
    if (_isStackIndex(options)) {
      index = options;
      options = '';
    }

    options = common.parseOptions(options, {
      'c': 'clear'
    });

    if (options['clear']) {
      _dirStack = [];
      return _dirStack;
    }

    var stack = _actualDirStack();

    if (index) {
      index = _parseStackIndex(index);

      if (index < 0) {
        index = stack.length + index;
      }

      common.log(stack[index]);
      return stack[index];
    }

    common.log(stack.join(' '));

    return stack;
  }
  exports.dirs = _dirs;
});

var require$$7 = dirs$1 && (typeof dirs$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(dirs$1)) === 'object' && 'default' in dirs$1 ? dirs$1['default'] : dirs$1;
var dirs$1 = dirs$1.dirs;

var echo$1 = __commonjs(function (module) {
  var common = require$$1$3;

  //@
  //@ ### echo(string [, string ...])
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ echo('hello world');
  //@ var str = echo('hello world');
  //@ ```
  //@
  //@ Prints string to stdout, and returns string with additional utility methods
  //@ like `.to()`.
  function _echo() {
    var messages = [].slice.call(arguments, 0);
    console.log.apply(console, messages);
    return common.ShellString(messages.join(' '));
  }
  module.exports = _echo;
});

var require$$8$1 = echo$1 && (typeof echo$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(echo$1)) === 'object' && 'default' in echo$1 ? echo$1['default'] : echo$1;

var which$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;
  var path = require$$2;

  // XP's system default value for PATHEXT system variable, just in case it's not
  // set on Windows.
  var XP_DEFAULT_PATHEXT = '.com;.exe;.bat;.cmd;.vbs;.vbe;.js;.jse;.wsf;.wsh';

  // Cross-platform method for splitting environment PATH variables
  function splitPath(p) {
    if (!p) return [];

    if (common.platform === 'win') return p.split(';');else return p.split(':');
  }

  function checkPath(path) {
    return fs.existsSync(path) && !fs.statSync(path).isDirectory();
  }

  //@
  //@ ### which(command)
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ var nodeExec = which('node');
  //@ ```
  //@
  //@ Searches for `command` in the system's PATH. On Windows, this uses the
  //@ `PATHEXT` variable to append the extension if it's not already executable.
  //@ Returns string containing the absolute path to the command.
  function _which(options, cmd) {
    if (!cmd) common.error('must specify command');

    var pathEnv = process.env.path || process.env.Path || process.env.PATH,
        pathArray = splitPath(pathEnv),
        where = null;

    // No relative/absolute paths provided?
    if (cmd.search(/\//) === -1) {
      // Search for command in PATH
      pathArray.forEach(function (dir) {
        if (where) return; // already found it

        var attempt = path.resolve(dir, cmd);

        if (common.platform === 'win') {
          attempt = attempt.toUpperCase();

          // In case the PATHEXT variable is somehow not set (e.g.
          // child_process.spawn with an empty environment), use the XP default.
          var pathExtEnv = process.env.PATHEXT || XP_DEFAULT_PATHEXT;
          var pathExtArray = splitPath(pathExtEnv.toUpperCase());
          var i;

          // If the extension is already in PATHEXT, just return that.
          for (i = 0; i < pathExtArray.length; i++) {
            var ext = pathExtArray[i];
            if (attempt.slice(-ext.length) === ext && checkPath(attempt)) {
              where = attempt;
              return;
            }
          }

          // Cycle through the PATHEXT variable
          var baseAttempt = attempt;
          for (i = 0; i < pathExtArray.length; i++) {
            attempt = baseAttempt + pathExtArray[i];
            if (checkPath(attempt)) {
              where = attempt;
              return;
            }
          }
        } else {
          // Assume it's Unix-like
          if (checkPath(attempt)) {
            where = attempt;
            return;
          }
        }
      });
    }

    // Command not found anywhere?
    if (!checkPath(cmd) && !where) return null;

    where = where || path.resolve(cmd);

    return common.ShellString(where);
  }
  module.exports = _which;
});

var require$$9 = which$1 && (typeof which$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(which$1)) === 'object' && 'default' in which$1 ? which$1['default'] : which$1;

var grep$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;

  //@
  //@ ### grep([options,] regex_filter, file [, file ...])
  //@ ### grep([options,] regex_filter, file_array)
  //@ Available options:
  //@
  //@ + `-v`: Inverse the sense of the regex and print the lines not matching the criteria.
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ grep('-v', 'GLOBAL_VARIABLE', '*.js');
  //@ grep('GLOBAL_VARIABLE', '*.js');
  //@ ```
  //@
  //@ Reads input string from given files and returns a string containing all lines of the
  //@ file that match the given `regex_filter`. Wildcard `*` accepted.
  function _grep(options, regex, files) {
    options = common.parseOptions(options, {
      'v': 'inverse'
    });

    if (!files) common.error('no paths given');

    if (typeof files === 'string') files = [].slice.call(arguments, 2);
    // if it's array leave it as it is

    files = common.expand(files);

    var grep = '';
    files.forEach(function (file) {
      if (!fs.existsSync(file)) {
        common.error('no such file or directory: ' + file, true);
        return;
      }

      var contents = fs.readFileSync(file, 'utf8'),
          lines = contents.split(/\r*\n/);
      lines.forEach(function (line) {
        var matched = line.match(regex);
        if (options.inverse && !matched || !options.inverse && matched) grep += line + '\n';
      });
    });

    return common.ShellString(grep);
  }
  module.exports = _grep;
});

var require$$10 = grep$1 && (typeof grep$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(grep$1)) === 'object' && 'default' in grep$1 ? grep$1['default'] : grep$1;

var sed$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;

  //@
  //@ ### sed([options,] search_regex, replacement, file [, file ...])
  //@ ### sed([options,] search_regex, replacement, file_array)
  //@ Available options:
  //@
  //@ + `-i`: Replace contents of 'file' in-place. _Note that no backups will be created!_
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ sed('-i', 'PROGRAM_VERSION', 'v0.1.3', 'source.js');
  //@ sed(/.*DELETE_THIS_LINE.*\n/, '', 'source.js');
  //@ ```
  //@
  //@ Reads an input string from `files` and performs a JavaScript `replace()` on the input
  //@ using the given search regex and replacement string or function. Returns the new string after replacement.
  function _sed(options, regex, replacement, files) {
    options = common.parseOptions(options, {
      'i': 'inplace'
    });

    if (typeof replacement === 'string' || typeof replacement === 'function') replacement = replacement; // no-op
    else if (typeof replacement === 'number') replacement = replacement.toString(); // fallback
      else common.error('invalid replacement string');

    // Convert all search strings to RegExp
    if (typeof regex === 'string') regex = RegExp(regex);

    if (!files) common.error('no files given');

    if (typeof files === 'string') files = [].slice.call(arguments, 3);
    // if it's array leave it as it is

    files = common.expand(files);

    var sed = [];
    files.forEach(function (file) {
      if (!fs.existsSync(file)) {
        common.error('no such file or directory: ' + file, true);
        return;
      }

      var result = fs.readFileSync(file, 'utf8').split('\n').map(function (line) {
        return line.replace(regex, replacement);
      }).join('\n');

      sed.push(result);

      if (options.inplace) fs.writeFileSync(file, result, 'utf8');
    });

    return common.ShellString(sed.join('\n'));
  }
  module.exports = _sed;
});

var require$$11 = sed$1 && (typeof sed$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(sed$1)) === 'object' && 'default' in sed$1 ? sed$1['default'] : sed$1;

var toEnd = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;
  var path = require$$2;

  //@
  //@ ### 'string'.toEnd(file)
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ cat('input.txt').toEnd('output.txt');
  //@ ```
  //@
  //@ Analogous to the redirect-and-append operator `>>` in Unix, but works with JavaScript strings (such as
  //@ those returned by `cat`, `grep`, etc).
  function _toEnd(options, file) {
    if (!file) common.error('wrong arguments');

    if (!fs.existsSync(path.dirname(file))) common.error('no such file or directory: ' + path.dirname(file));

    try {
      fs.appendFileSync(file, this.toString(), 'utf8');
      return this;
    } catch (e) {
      common.error('could not append to file (code ' + e.code + '): ' + file, true);
    }
  }
  module.exports = _toEnd;
});

var require$$12 = toEnd && (typeof toEnd === 'undefined' ? 'undefined' : babelHelpers.typeof(toEnd)) === 'object' && 'default' in toEnd ? toEnd['default'] : toEnd;

var to = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;
  var path = require$$2;

  //@
  //@ ### 'string'.to(file)
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ cat('input.txt').to('output.txt');
  //@ ```
  //@
  //@ Analogous to the redirection operator `>` in Unix, but works with JavaScript strings (such as
  //@ those returned by `cat`, `grep`, etc). _Like Unix redirections, `to()` will overwrite any existing file!_
  function _to(options, file) {
    if (!file) common.error('wrong arguments');

    if (!fs.existsSync(path.dirname(file))) common.error('no such file or directory: ' + path.dirname(file));

    try {
      fs.writeFileSync(file, this.toString(), 'utf8');
      return this;
    } catch (e) {
      common.error('could not write to file (code ' + e.code + '): ' + file, true);
    }
  }
  module.exports = _to;
});

var require$$13 = to && (typeof to === 'undefined' ? 'undefined' : babelHelpers.typeof(to)) === 'object' && 'default' in to ? to['default'] : to;

var cat$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;

  //@
  //@ ### cat(file [, file ...])
  //@ ### cat(file_array)
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ var str = cat('file*.txt');
  //@ var str = cat('file1', 'file2');
  //@ var str = cat(['file1', 'file2']); // same as above
  //@ ```
  //@
  //@ Returns a string containing the given file, or a concatenated string
  //@ containing the files if more than one file is given (a new line character is
  //@ introduced between each file). Wildcard `*` accepted.
  function _cat(options, files) {
    var cat = '';

    if (!files) common.error('no paths given');

    if (typeof files === 'string') files = [].slice.call(arguments, 1);
    // if it's array leave it as it is

    files = common.expand(files);

    files.forEach(function (file) {
      if (!fs.existsSync(file)) common.error('no such file or directory: ' + file);

      cat += fs.readFileSync(file, 'utf8');
    });

    return common.ShellString(cat);
  }
  module.exports = _cat;
});

var require$$14 = cat$1 && (typeof cat$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(cat$1)) === 'object' && 'default' in cat$1 ? cat$1['default'] : cat$1;

var test$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;

  //@
  //@ ### test(expression)
  //@ Available expression primaries:
  //@
  //@ + `'-b', 'path'`: true if path is a block device
  //@ + `'-c', 'path'`: true if path is a character device
  //@ + `'-d', 'path'`: true if path is a directory
  //@ + `'-e', 'path'`: true if path exists
  //@ + `'-f', 'path'`: true if path is a regular file
  //@ + `'-L', 'path'`: true if path is a symbolic link
  //@ + `'-p', 'path'`: true if path is a pipe (FIFO)
  //@ + `'-S', 'path'`: true if path is a socket
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ if (test('-d', path)) { /* do something with dir */ };
  //@ if (!test('-f', path)) continue; // skip if it's a regular file
  //@ ```
  //@
  //@ Evaluates expression using the available primaries and returns corresponding value.
  function _test(options, path) {
    if (!path) common.error('no path given');

    // hack - only works with unary primaries
    options = common.parseOptions(options, {
      'b': 'block',
      'c': 'character',
      'd': 'directory',
      'e': 'exists',
      'f': 'file',
      'L': 'link',
      'p': 'pipe',
      'S': 'socket'
    });

    var canInterpret = false;
    for (var key in options) {
      if (options[key] === true) {
        canInterpret = true;
        break;
      }
    }if (!canInterpret) common.error('could not interpret expression');

    if (options.link) {
      try {
        return fs.lstatSync(path).isSymbolicLink();
      } catch (e) {
        return false;
      }
    }

    if (!fs.existsSync(path)) return false;

    if (options.exists) return true;

    var stats = fs.statSync(path);

    if (options.block) return stats.isBlockDevice();

    if (options.character) return stats.isCharacterDevice();

    if (options.directory) return stats.isDirectory();

    if (options.file) return stats.isFile();

    if (options.pipe) return stats.isFIFO();

    if (options.socket) return stats.isSocket();
  } // test
  module.exports = _test;
});

var require$$15 = test$1 && (typeof test$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(test$1)) === 'object' && 'default' in test$1 ? test$1['default'] : test$1;

var mkdir$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;
  var path = require$$2;

  // Recursively creates 'dir'
  function mkdirSyncRecursive(dir) {
    var baseDir = path.dirname(dir);

    // Base dir exists, no recursion necessary
    if (fs.existsSync(baseDir)) {
      fs.mkdirSync(dir, parseInt('0777', 8));
      return;
    }

    // Base dir does not exist, go recursive
    mkdirSyncRecursive(baseDir);

    // Base dir created, can create dir
    fs.mkdirSync(dir, parseInt('0777', 8));
  }

  //@
  //@ ### mkdir([options,] dir [, dir ...])
  //@ ### mkdir([options,] dir_array)
  //@ Available options:
  //@
  //@ + `-p`: full path (will create intermediate dirs if necessary)
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ mkdir('-p', '/tmp/a/b/c/d', '/tmp/e/f/g');
  //@ mkdir('-p', ['/tmp/a/b/c/d', '/tmp/e/f/g']); // same as above
  //@ ```
  //@
  //@ Creates directories.
  function _mkdir(options, dirs) {
    options = common.parseOptions(options, {
      'p': 'fullpath'
    });
    if (!dirs) common.error('no paths given');

    if (typeof dirs === 'string') dirs = [].slice.call(arguments, 1);
    // if it's array leave it as it is

    dirs.forEach(function (dir) {
      if (fs.existsSync(dir)) {
        if (!options.fullpath) common.error('path already exists: ' + dir, true);
        return; // skip dir
      }

      // Base dir does not exist, and no -p option given
      var baseDir = path.dirname(dir);
      if (!fs.existsSync(baseDir) && !options.fullpath) {
        common.error('no such file or directory: ' + baseDir, true);
        return; // skip dir
      }

      if (options.fullpath) mkdirSyncRecursive(dir);else fs.mkdirSync(dir, parseInt('0777', 8));
    });
  } // mkdir
  module.exports = _mkdir;
});

var require$$16 = mkdir$1 && (typeof mkdir$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(mkdir$1)) === 'object' && 'default' in mkdir$1 ? mkdir$1['default'] : mkdir$1;

var mv$1 = __commonjs(function (module) {
  var fs = require$$1;
  var path = require$$2;
  var common = require$$1$3;

  //@
  //@ ### mv([options ,] source [, source ...], dest')
  //@ ### mv([options ,] source_array, dest')
  //@ Available options:
  //@
  //@ + `-f`: force (default behavior)
  //@ + `-n`: no-clobber
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ mv('-n', 'file', 'dir/');
  //@ mv('file1', 'file2', 'dir/');
  //@ mv(['file1', 'file2'], 'dir/'); // same as above
  //@ ```
  //@
  //@ Moves files. The wildcard `*` is accepted.
  function _mv(options, sources, dest) {
    options = common.parseOptions(options, {
      'f': '!no_force',
      'n': 'no_force'
    });

    // Get sources, dest
    if (arguments.length < 3) {
      common.error('missing <source> and/or <dest>');
    } else if (arguments.length > 3) {
      sources = [].slice.call(arguments, 1, arguments.length - 1);
      dest = arguments[arguments.length - 1];
    } else if (typeof sources === 'string') {
      sources = [sources];
    } else if ('length' in sources) {
      sources = sources; // no-op for array
    } else {
        common.error('invalid arguments');
      }

    sources = common.expand(sources);

    var exists = fs.existsSync(dest),
        stats = exists && fs.statSync(dest);

    // Dest is not existing dir, but multiple sources given
    if ((!exists || !stats.isDirectory()) && sources.length > 1) common.error('dest is not a directory (too many sources)');

    // Dest is an existing file, but no -f given
    if (exists && stats.isFile() && options.no_force) common.error('dest file already exists: ' + dest);

    sources.forEach(function (src) {
      if (!fs.existsSync(src)) {
        common.error('no such file or directory: ' + src, true);
        return; // skip file
      }

      // If here, src exists

      // When copying to '/path/dir':
      //    thisDest = '/path/dir/file1'
      var thisDest = dest;
      if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) thisDest = path.normalize(dest + '/' + path.basename(src));

      if (fs.existsSync(thisDest) && options.no_force) {
        common.error('dest file already exists: ' + thisDest, true);
        return; // skip file
      }

      if (path.resolve(src) === path.dirname(path.resolve(thisDest))) {
        common.error('cannot move to self: ' + src, true);
        return; // skip file
      }

      fs.renameSync(src, thisDest);
    }); // forEach(src)
  } // mv
  module.exports = _mv;
});

var require$$17 = mv$1 && (typeof mv$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(mv$1)) === 'object' && 'default' in mv$1 ? mv$1['default'] : mv$1;

var rm$1 = __commonjs(function (module) {
  var common = require$$1$3;
  var fs = require$$1;

  // Recursively removes 'dir'
  // Adapted from https://github.com/ryanmcgrath/wrench-js
  //
  // Copyright (c) 2010 Ryan McGrath
  // Copyright (c) 2012 Artur Adib
  //
  // Licensed under the MIT License
  // http://www.opensource.org/licenses/mit-license.php
  function rmdirSyncRecursive(dir, force) {
    var files;

    files = fs.readdirSync(dir);

    // Loop through and delete everything in the sub-tree after checking it
    for (var i = 0; i < files.length; i++) {
      var file = dir + "/" + files[i],
          currFile = fs.lstatSync(file);

      if (currFile.isDirectory()) {
        // Recursive function back to the beginning
        rmdirSyncRecursive(file, force);
      } else if (currFile.isSymbolicLink()) {
        // Unlink symlinks
        if (force || isWriteable(file)) {
          try {
            common.unlinkSync(file);
          } catch (e) {
            common.error('could not remove file (code ' + e.code + '): ' + file, true);
          }
        }
      } else // Assume it's a file - perhaps a try/catch belongs here?
        if (force || isWriteable(file)) {
          try {
            common.unlinkSync(file);
          } catch (e) {
            common.error('could not remove file (code ' + e.code + '): ' + file, true);
          }
        }
    }

    // Now that we know everything in the sub-tree has been deleted, we can delete the main directory.
    // Huzzah for the shopkeep.

    var result;
    try {
      // Retry on windows, sometimes it takes a little time before all the files in the directory are gone
      var start = Date.now();
      while (true) {
        try {
          result = fs.rmdirSync(dir);
          if (fs.existsSync(dir)) throw { code: "EAGAIN" };
          break;
        } catch (er) {
          // In addition to error codes, also check if the directory still exists and loop again if true
          if (process.platform === "win32" && (er.code === "ENOTEMPTY" || er.code === "EBUSY" || er.code === "EPERM" || er.code === "EAGAIN")) {
            if (Date.now() - start > 1000) throw er;
          } else if (er.code === "ENOENT") {
            // Directory did not exist, deletion was successful
            break;
          } else {
            throw er;
          }
        }
      }
    } catch (e) {
      common.error('could not remove directory (code ' + e.code + '): ' + dir, true);
    }

    return result;
  } // rmdirSyncRecursive

  // Hack to determine if file has write permissions for current user
  // Avoids having to check user, group, etc, but it's probably slow
  function isWriteable(file) {
    var writePermission = true;
    try {
      var __fd = fs.openSync(file, 'a');
      fs.closeSync(__fd);
    } catch (e) {
      writePermission = false;
    }

    return writePermission;
  }

  //@
  //@ ### rm([options,] file [, file ...])
  //@ ### rm([options,] file_array)
  //@ Available options:
  //@
  //@ + `-f`: force
  //@ + `-r, -R`: recursive
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ rm('-rf', '/tmp/*');
  //@ rm('some_file.txt', 'another_file.txt');
  //@ rm(['some_file.txt', 'another_file.txt']); // same as above
  //@ ```
  //@
  //@ Removes files. The wildcard `*` is accepted.
  function _rm(options, files) {
    options = common.parseOptions(options, {
      'f': 'force',
      'r': 'recursive',
      'R': 'recursive'
    });
    if (!files) common.error('no paths given');

    if (typeof files === 'string') files = [].slice.call(arguments, 1);
    // if it's array leave it as it is

    files = common.expand(files);

    files.forEach(function (file) {
      if (!fs.existsSync(file)) {
        // Path does not exist, no force flag given
        if (!options.force) common.error('no such file or directory: ' + file, true);

        return; // skip file
      }

      // If here, path exists

      var stats = fs.lstatSync(file);
      if (stats.isFile() || stats.isSymbolicLink()) {

        // Do not check for file writing permissions
        if (options.force) {
          common.unlinkSync(file);
          return;
        }

        if (isWriteable(file)) common.unlinkSync(file);else common.error('permission denied: ' + file, true);

        return;
      } // simple file

      // Path is an existing directory, but no -r flag given
      if (stats.isDirectory() && !options.recursive) {
        common.error('path is a directory', true);
        return; // skip path
      }

      // Recursively remove existing directory
      if (stats.isDirectory() && options.recursive) {
        rmdirSyncRecursive(file, options.force);
      }
    }); // forEach(file)
  } // rm
  module.exports = _rm;
});

var require$$18 = rm$1 && (typeof rm$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(rm$1)) === 'object' && 'default' in rm$1 ? rm$1['default'] : rm$1;

var cp$1 = __commonjs(function (module) {
  var fs = require$$1;
  var path = require$$2;
  var common = require$$1$3;
  var os = require$$0;

  // Buffered file copy, synchronous
  // (Using readFileSync() + writeFileSync() could easily cause a memory overflow
  //  with large files)
  function copyFileSync(srcFile, destFile) {
    if (!fs.existsSync(srcFile)) common.error('copyFileSync: no such file or directory: ' + srcFile);

    var BUF_LENGTH = 64 * 1024,
        buf = new Buffer(BUF_LENGTH),
        bytesRead = BUF_LENGTH,
        pos = 0,
        fdr = null,
        fdw = null;

    try {
      fdr = fs.openSync(srcFile, 'r');
    } catch (e) {
      common.error('copyFileSync: could not read src file (' + srcFile + ')');
    }

    try {
      fdw = fs.openSync(destFile, 'w');
    } catch (e) {
      common.error('copyFileSync: could not write to dest file (code=' + e.code + '):' + destFile);
    }

    while (bytesRead === BUF_LENGTH) {
      bytesRead = fs.readSync(fdr, buf, 0, BUF_LENGTH, pos);
      fs.writeSync(fdw, buf, 0, bytesRead);
      pos += bytesRead;
    }

    fs.closeSync(fdr);
    fs.closeSync(fdw);

    fs.chmodSync(destFile, fs.statSync(srcFile).mode);
  }

  // Recursively copies 'sourceDir' into 'destDir'
  // Adapted from https://github.com/ryanmcgrath/wrench-js
  //
  // Copyright (c) 2010 Ryan McGrath
  // Copyright (c) 2012 Artur Adib
  //
  // Licensed under the MIT License
  // http://www.opensource.org/licenses/mit-license.php
  function cpdirSyncRecursive(sourceDir, destDir, opts) {
    if (!opts) opts = {};

    /* Create the directory where all our junk is moving to; read the mode of the source directory and mirror it */
    var checkDir = fs.statSync(sourceDir);
    try {
      fs.mkdirSync(destDir, checkDir.mode);
    } catch (e) {
      //if the directory already exists, that's okay
      if (e.code !== 'EEXIST') throw e;
    }

    var files = fs.readdirSync(sourceDir);

    for (var i = 0; i < files.length; i++) {
      var srcFile = sourceDir + "/" + files[i];
      var destFile = destDir + "/" + files[i];
      var srcFileStat = fs.lstatSync(srcFile);

      if (srcFileStat.isDirectory()) {
        /* recursion this thing right on back. */
        cpdirSyncRecursive(srcFile, destFile, opts);
      } else if (srcFileStat.isSymbolicLink()) {
        var symlinkFull = fs.readlinkSync(srcFile);
        fs.symlinkSync(symlinkFull, destFile, os.platform() === "win32" ? "junction" : null);
      } else {
        /* At this point, we've hit a file actually worth copying... so copy it on over. */
        if (fs.existsSync(destFile) && opts.no_force) {
          common.log('skipping existing file: ' + files[i]);
        } else {
          copyFileSync(srcFile, destFile);
        }
      }
    } // for files
  } // cpdirSyncRecursive

  //@
  //@ ### cp([options,] source [, source ...], dest)
  //@ ### cp([options,] source_array, dest)
  //@ Available options:
  //@
  //@ + `-f`: force (default behavior)
  //@ + `-n`: no-clobber
  //@ + `-r, -R`: recursive
  //@
  //@ Examples:
  //@
  //@ ```javascript
  //@ cp('file1', 'dir1');
  //@ cp('-Rf', '/tmp/*', '/usr/local/*', '/home/tmp');
  //@ cp('-Rf', ['/tmp/*', '/usr/local/*'], '/home/tmp'); // same as above
  //@ ```
  //@
  //@ Copies files. The wildcard `*` is accepted.
  function _cp(options, sources, dest) {
    options = common.parseOptions(options, {
      'f': '!no_force',
      'n': 'no_force',
      'R': 'recursive',
      'r': 'recursive'
    });

    // Get sources, dest
    if (arguments.length < 3) {
      common.error('missing <source> and/or <dest>');
    } else if (arguments.length > 3) {
      sources = [].slice.call(arguments, 1, arguments.length - 1);
      dest = arguments[arguments.length - 1];
    } else if (typeof sources === 'string') {
      sources = [sources];
    } else if ('length' in sources) {
      sources = sources; // no-op for array
    } else {
        common.error('invalid arguments');
      }

    var exists = fs.existsSync(dest),
        stats = exists && fs.statSync(dest);

    // Dest is not existing dir, but multiple sources given
    if ((!exists || !stats.isDirectory()) && sources.length > 1) common.error('dest is not a directory (too many sources)');

    // Dest is an existing file, but no -f given
    if (exists && stats.isFile() && options.no_force) common.error('dest file already exists: ' + dest);

    if (options.recursive) {
      // Recursive allows the shortcut syntax "sourcedir/" for "sourcedir/*"
      // (see Github issue #15)
      sources.forEach(function (src, i) {
        if (src[src.length - 1] === '/') {
          sources[i] += '*';
          // If src is a directory and dest doesn't exist, 'cp -r src dest' should copy src/* into dest
        } else if (fs.statSync(src).isDirectory() && !exists) {
            sources[i] += '/*';
          }
      });

      // Create dest
      try {
        fs.mkdirSync(dest, parseInt('0777', 8));
      } catch (e) {
        // like Unix's cp, keep going even if we can't create dest dir
      }
    }

    sources = common.expand(sources);

    sources.forEach(function (src) {
      if (!fs.existsSync(src)) {
        common.error('no such file or directory: ' + src, true);
        return; // skip file
      }

      // If here, src exists
      if (fs.statSync(src).isDirectory()) {
        if (!options.recursive) {
          // Non-Recursive
          common.log(src + ' is a directory (not copied)');
        } else {
          // Recursive
          // 'cp /a/source dest' should create 'source' in 'dest'
          var newDest = path.join(dest, path.basename(src)),
              checkDir = fs.statSync(src);
          try {
            fs.mkdirSync(newDest, checkDir.mode);
          } catch (e) {
            //if the directory already exists, that's okay
            if (e.code !== 'EEXIST') {
              common.error('dest file no such file or directory: ' + newDest, true);
              throw e;
            }
          }

          cpdirSyncRecursive(src, newDest, { no_force: options.no_force });
        }
        return; // done with dir
      }

      // If here, src is a file

      // When copying to '/path/dir':
      //    thisDest = '/path/dir/file1'
      var thisDest = dest;
      if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) thisDest = path.normalize(dest + '/' + path.basename(src));

      if (fs.existsSync(thisDest) && options.no_force) {
        common.error('dest file already exists: ' + thisDest, true);
        return; // skip file
      }

      copyFileSync(src, thisDest);
    }); // forEach(src)
  }
  module.exports = _cp;
});

var require$$19 = cp$1 && (typeof cp$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(cp$1)) === 'object' && 'default' in cp$1 ? cp$1['default'] : cp$1;

var find$1 = __commonjs(function (module) {
  var fs = require$$1;
  var common = require$$1$3;
  var _ls = require$$0$5;

  //@
  //@ ### find(path [, path ...])
  //@ ### find(path_array)
  //@ Examples:
  //@
  //@ ```javascript
  //@ find('src', 'lib');
  //@ find(['src', 'lib']); // same as above
  //@ find('.').filter(function(file) { return file.match(/\.js$/); });
  //@ ```
  //@
  //@ Returns array of all files (however deep) in the given paths.
  //@
  //@ The main difference from `ls('-R', path)` is that the resulting file names
  //@ include the base directories, e.g. `lib/resources/file1` instead of just `file1`.
  function _find(options, paths) {
    if (!paths) common.error('no path specified');else if ((typeof paths === 'undefined' ? 'undefined' : babelHelpers.typeof(paths)) === 'object') paths = paths; // assume array
    else if (typeof paths === 'string') paths = [].slice.call(arguments, 1);

    var list = [];

    function pushFile(file) {
      if (common.platform === 'win') file = file.replace(/\\/g, '/');
      list.push(file);
    }

    // why not simply do ls('-R', paths)? because the output wouldn't give the base dirs
    // to get the base dir in the output, we need instead ls('-R', 'dir/*') for every directory

    paths.forEach(function (file) {
      pushFile(file);

      if (fs.statSync(file).isDirectory()) {
        _ls('-RA', file + '/*').forEach(function (subfile) {
          pushFile(subfile);
        });
      }
    });

    return list;
  }
  module.exports = _find;
});

var require$$20 = find$1 && (typeof find$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(find$1)) === 'object' && 'default' in find$1 ? find$1['default'] : find$1;

var shell = __commonjs(function (module, exports) {
  //
  // ShellJS
  // Unix shell commands on top of Node's API
  //
  // Copyright (c) 2012 Artur Adib
  // http://github.com/arturadib/shelljs
  //

  var common = require$$1$3;

  //@
  //@ All commands run synchronously, unless otherwise stated.
  //@

  //@include ./src/cd
  var _cd = require$$1$4;
  exports.cd = common.wrap('cd', _cd);

  //@include ./src/pwd
  var _pwd = require$$3;
  exports.pwd = common.wrap('pwd', _pwd);

  //@include ./src/ls
  var _ls = require$$0$5;
  exports.ls = common.wrap('ls', _ls);

  //@include ./src/find
  var _find = require$$20;
  exports.find = common.wrap('find', _find);

  //@include ./src/cp
  var _cp = require$$19;
  exports.cp = common.wrap('cp', _cp);

  //@include ./src/rm
  var _rm = require$$18;
  exports.rm = common.wrap('rm', _rm);

  //@include ./src/mv
  var _mv = require$$17;
  exports.mv = common.wrap('mv', _mv);

  //@include ./src/mkdir
  var _mkdir = require$$16;
  exports.mkdir = common.wrap('mkdir', _mkdir);

  //@include ./src/test
  var _test = require$$15;
  exports.test = common.wrap('test', _test);

  //@include ./src/cat
  var _cat = require$$14;
  exports.cat = common.wrap('cat', _cat);

  //@include ./src/to
  var _to = require$$13;
  String.prototype.to = common.wrap('to', _to);

  //@include ./src/toEnd
  var _toEnd = require$$12;
  String.prototype.toEnd = common.wrap('toEnd', _toEnd);

  //@include ./src/sed
  var _sed = require$$11;
  exports.sed = common.wrap('sed', _sed);

  //@include ./src/grep
  var _grep = require$$10;
  exports.grep = common.wrap('grep', _grep);

  //@include ./src/which
  var _which = require$$9;
  exports.which = common.wrap('which', _which);

  //@include ./src/echo
  var _echo = require$$8$1;
  exports.echo = _echo; // don't common.wrap() as it could parse '-options'

  //@include ./src/dirs
  var _dirs = require$$7.dirs;
  exports.dirs = common.wrap("dirs", _dirs);
  var _pushd = require$$7.pushd;
  exports.pushd = common.wrap('pushd', _pushd);
  var _popd = require$$7.popd;
  exports.popd = common.wrap("popd", _popd);

  //@include ./src/ln
  var _ln = require$$6;
  exports.ln = common.wrap('ln', _ln);

  //@
  //@ ### exit(code)
  //@ Exits the current process with the given exit code.
  exports.exit = process.exit;

  //@
  //@ ### env['VAR_NAME']
  //@ Object containing environment variables (both getter and setter). Shortcut to process.env.
  exports.env = process.env;

  //@include ./src/exec
  var _exec = require$$5$1;
  exports.exec = common.wrap('exec', _exec, { notUnix: true });

  //@include ./src/chmod
  var _chmod = require$$4$1;
  exports.chmod = common.wrap('chmod', _chmod);

  //@include ./src/touch
  var _touch = require$$3$1;
  exports.touch = common.wrap('touch', _touch);

  //@include ./src/set
  var _set = require$$2$2;
  exports.set = common.wrap('set', _set);

  //@
  //@ ## Non-Unix commands
  //@

  //@include ./src/tempdir
  var _tempDir = require$$4;
  exports.tempdir = common.wrap('tempdir', _tempDir);

  //@include ./src/error
  var _error = require$$0$4;
  exports.error = _error;

  //@
  //@ ## Configuration
  //@

  exports.config = common.config;

  //@
  //@ ### config.silent
  //@ Example:
  //@
  //@ ```javascript
  //@ var sh = require('shelljs');
  //@ var silentState = sh.config.silent; // save old silent state
  //@ sh.config.silent = true;
  //@ /* ... */
  //@ sh.config.silent = silentState; // restore old silent state
  //@ ```
  //@
  //@ Suppresses all command output if `true`, except for `echo()` calls.
  //@ Default is `false`.

  //@
  //@ ### config.fatal
  //@ Example:
  //@
  //@ ```javascript
  //@ require('shelljs/global');
  //@ config.fatal = true; // or set('-e');
  //@ cp('this_file_does_not_exist', '/dev/null'); // dies here
  //@ /* more commands... */
  //@ ```
  //@
  //@ If `true` the script will die on errors. Default is `false`. This is
  //@ analogous to Bash's `set -e`

  //@
  //@ ### config.verbose
  //@ Example:
  //@
  //@ ```javascript
  //@ config.verbose = true; // or set('-v');
  //@ cd('dir/');
  //@ ls('subdir/');
  //@ ```
  //@
  //@ Will print each command as follows:
  //@
  //@ ```
  //@ cd dir/
  //@ ls subdir/
  //@ ```
});

var shelljs = shell && (typeof shell === 'undefined' ? 'undefined' : babelHelpers.typeof(shell)) === 'object' && 'default' in shell ? shell['default'] : shell;

var index$5 = __commonjs(function (module) {
	'use strict';

	var argv = process.argv;

	var terminator = argv.indexOf('--');
	var hasFlag = function hasFlag(flag) {
		flag = '--' + flag;
		var pos = argv.indexOf(flag);
		return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
	};

	module.exports = function () {
		if ('FORCE_COLOR' in process.env) {
			return true;
		}

		if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
			return false;
		}

		if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
			return true;
		}

		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}

		if (process.platform === 'win32') {
			return true;
		}

		if ('COLORTERM' in process.env) {
			return true;
		}

		if (process.env.TERM === 'dumb') {
			return false;
		}

		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}

		return false;
	}();
});

var require$$0$6 = index$5 && (typeof index$5 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$5)) === 'object' && 'default' in index$5 ? index$5['default'] : index$5;

var index$7 = __commonjs(function (module) {
	'use strict';

	module.exports = function () {
		return (/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g
		);
	};
});

var require$$0$7 = index$7 && (typeof index$7 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$7)) === 'object' && 'default' in index$7 ? index$7['default'] : index$7;

var index$6 = __commonjs(function (module) {
  'use strict';

  var ansiRegex = require$$0$7;
  var re = new RegExp(ansiRegex().source); // remove the `g` flag
  module.exports = re.test.bind(re);
});

var require$$1$6 = index$6 && (typeof index$6 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$6)) === 'object' && 'default' in index$6 ? index$6['default'] : index$6;

var index$8 = __commonjs(function (module) {
	'use strict';

	var ansiRegex = require$$0$7();

	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};
});

var require$$2$3 = index$8 && (typeof index$8 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$8)) === 'object' && 'default' in index$8 ? index$8['default'] : index$8;

var index$9 = __commonjs(function (module) {
	'use strict';

	function assembleStyles() {
		var styles = {
			modifiers: {
				reset: [0, 0],
				bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
				dim: [2, 22],
				italic: [3, 23],
				underline: [4, 24],
				inverse: [7, 27],
				hidden: [8, 28],
				strikethrough: [9, 29]
			},
			colors: {
				black: [30, 39],
				red: [31, 39],
				green: [32, 39],
				yellow: [33, 39],
				blue: [34, 39],
				magenta: [35, 39],
				cyan: [36, 39],
				white: [37, 39],
				gray: [90, 39]
			},
			bgColors: {
				bgBlack: [40, 49],
				bgRed: [41, 49],
				bgGreen: [42, 49],
				bgYellow: [43, 49],
				bgBlue: [44, 49],
				bgMagenta: [45, 49],
				bgCyan: [46, 49],
				bgWhite: [47, 49]
			}
		};

		// fix humans
		styles.colors.grey = styles.colors.gray;

		Object.keys(styles).forEach(function (groupName) {
			var group = styles[groupName];

			Object.keys(group).forEach(function (styleName) {
				var style = group[styleName];

				styles[styleName] = group[styleName] = {
					open: '\u001b[' + style[0] + 'm',
					close: '\u001b[' + style[1] + 'm'
				};
			});

			Object.defineProperty(styles, groupName, {
				value: group,
				enumerable: false
			});
		});

		return styles;
	}

	Object.defineProperty(module, 'exports', {
		enumerable: true,
		get: assembleStyles
	});
});

var require$$3$2 = index$9 && (typeof index$9 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$9)) === 'object' && 'default' in index$9 ? index$9['default'] : index$9;

var index$10 = __commonjs(function (module) {
	'use strict';

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	};
});

var require$$4$2 = index$10 && (typeof index$10 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$10)) === 'object' && 'default' in index$10 ? index$10['default'] : index$10;

var index$4 = __commonjs(function (module) {
	'use strict';

	var escapeStringRegexp = require$$4$2;
	var ansiStyles = require$$3$2;
	var stripAnsi = require$$2$3;
	var hasAnsi = require$$1$6;
	var supportsColor = require$$0$6;
	var defineProps = Object.defineProperties;
	var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);

	function Chalk(options) {
		// detect mode if not set manually
		this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
	}

	// use bright blue on Windows as the normal blue color is illegible
	if (isSimpleWindowsTerm) {
		ansiStyles.blue.open = '\u001b[94m';
	}

	var styles = function () {
		var ret = {};

		Object.keys(ansiStyles).forEach(function (key) {
			ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

			ret[key] = {
				get: function get() {
					return build.call(this, this._styles.concat(key));
				}
			};
		});

		return ret;
	}();

	var proto = defineProps(function chalk() {}, styles);

	function build(_styles) {
		var builder = function builder() {
			return applyStyle.apply(builder, arguments);
		};

		builder._styles = _styles;
		builder.enabled = this.enabled;
		// __proto__ is used because we must return a function, but there is
		// no way to create a function with a different prototype.
		/* eslint-disable no-proto */
		builder.__proto__ = proto;

		return builder;
	}

	function applyStyle() {
		// support varags, but simply cast to string in case there's only one arg
		var args = arguments;
		var argsLen = args.length;
		var str = argsLen !== 0 && String(arguments[0]);

		if (argsLen > 1) {
			// don't slice `arguments`, it prevents v8 optimizations
			for (var a = 1; a < argsLen; a++) {
				str += ' ' + args[a];
			}
		}

		if (!this.enabled || !str) {
			return str;
		}

		var nestedStyles = this._styles;
		var i = nestedStyles.length;

		// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
		// see https://github.com/chalk/chalk/issues/58
		// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
		var originalDim = ansiStyles.dim.open;
		if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
			ansiStyles.dim.open = '';
		}

		while (i--) {
			var code = ansiStyles[nestedStyles[i]];

			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			str = code.open + str.replace(code.closeRe, code.open) + code.close;
		}

		// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
		ansiStyles.dim.open = originalDim;

		return str;
	}

	function init() {
		var ret = {};

		Object.keys(styles).forEach(function (name) {
			ret[name] = {
				get: function get() {
					return build.call(this, [name]);
				}
			};
		});

		return ret;
	}

	defineProps(Chalk.prototype, init());

	module.exports = new Chalk();
	module.exports.styles = ansiStyles;
	module.exports.hasColor = hasAnsi;
	module.exports.stripColor = stripAnsi;
	module.exports.supportsColor = supportsColor;
});

var require$$1$5 = index$4 && (typeof index$4 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$4)) === 'object' && 'default' in index$4 ? index$4['default'] : index$4;

var index$12 = __commonjs(function (module) {
  /*!
   * time-stamp <https://github.com/jonschlinkert/time-stamp>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   */

  'use strict';

  /**
   * Parse the given pattern and return a formatted
   * timestamp.
   *
   * @param  {String} `pattern` Date pattern.
   * @param  {Date} `date` Date object.
   * @return {String}
   */

  module.exports = function timestamp(pattern, date) {
    if (typeof pattern !== 'string') {
      date = pattern;
      pattern = 'YYYY:MM:DD';
    }
    date = date || new Date();
    return pattern.replace(/([YMDHms]{2,4})(:\/)?/g, function (_, key, sep) {
      var increment = method(key);
      if (!increment) return _;
      sep = sep || '';

      var res = '00' + String(date[increment[0]]() + (increment[2] || 0));
      return res.slice(-increment[1]) + sep;
    });
  };

  function method(key) {
    return {
      YYYY: ['getFullYear', 4],
      YY: ['getFullYear', 2],
      // getMonth is zero-based, thus the extra increment field
      MM: ['getMonth', 2, 1],
      DD: ['getDate', 2],
      HH: ['getHours', 2],
      mm: ['getMinutes', 2],
      ss: ['getSeconds', 2],
      ms: ['getMilliseconds', 3]
    }[key];
  }
});

var require$$0$8 = index$12 && (typeof index$12 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$12)) === 'object' && 'default' in index$12 ? index$12['default'] : index$12;

var index$11 = __commonjs(function (module) {
  'use strict';
  /*
    Initial code from https://github.com/gulpjs/gulp-util/blob/v3.0.6/lib/log.js
   */

  var chalk = require$$1$5;
  var timestamp = require$$0$8;

  function getTimestamp() {
    return '[' + chalk.grey(timestamp('HH:mm:ss')) + ']';
  }

  function log() {
    var time = getTimestamp();
    process.stdout.write(time + ' ');
    console.log.apply(console, arguments);
    return this;
  }

  function error() {
    var time = getTimestamp();
    process.stderr.write(time + ' ');
    console.error.apply(console, arguments);
    return this;
  }

  module.exports = log;
  module.exports.error = error;
});

var fancyLog = index$11 && (typeof index$11 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$11)) === 'object' && 'default' in index$11 ? index$11['default'] : index$11;

var Default$2 = {
  debug: false,
  sensitive: {},
  cwd: 'dist' // The directory that contains your built code.
};

var Base = function () {

  /**
   *
   * @param config - customized overrides
   */

  function Base(config) {
    babelHelpers.classCallCheck(this, Base);

    this.config = extend(true, {}, Default$2, config);

    this.debug('[' + this.constructor.name + '] using resolved config: ' + stringify(this.config));
  }

  // ----------------------------------------------
  // protected

  babelHelpers.createClass(Base, [{
    key: 'codeExec',
    value: function codeExec(command) {
      var logResult = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var code = this.exec(command, logResult, true);
      this.debug('codeExec result: ' + code);
      return code;
    }
  }, {
    key: 'booleanExec',
    value: function booleanExec(command) {
      if (this.codeExec(command, false) == 0) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Wraps shellJs calls that act on the file structure to give better output and error handling
     * @param command
     * @param logResult - return output from the execution, defaults to true. If false, will return code instead
     * @param returnCode - defaults to false which will throw Error on error, true will return result code
     */

  }, {
    key: 'exec',
    value: function exec(command) {
      var logResult = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
      var returnCode = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var options = { silent: true };
      if (this.config.cwd) {
        options['cwd'] = this.config.cwd;
      } else {
        this.notifyError('cwd is required');
      }

      if (command.includes('undefined')) {
        this.notifyError('Invalid command: ' + command);
      }

      this.debug('Executing `' + command + '` with cwd: ' + options['cwd']);
      var shellResult = shelljs.exec(command, options);
      var output = this.logShellOutput(shellResult, logResult);

      if (shellResult.code === 0 || shellResult.code === 1) {

        // ---
        // determine the return value
        if (returnCode) {
          return shellResult.code;
        } else {
          return output;
        }
      } else {
        if (returnCode) {
          return shellResult.code;
        } else {
          this.notifyError('Command failed `' + command + '`, cwd: ' + options.cwd + ': ' + shellResult.stderr + '.');
        }
      }
    }
  }, {
    key: 'notifyError',
    value: function notifyError(msg) {
      this.error(msg);
      throw new Error(this.maskSensitive(msg));
    }
  }, {
    key: 'logShellOutput',
    value: function logShellOutput(shellResult, logResult) {
      //this.debug(`[exit code] ${shellResult.code}`)

      // ---
      // Log the result
      // strangely enough, sometimes useful messages from git are an stderr even when it is a successful command with a 0 result code
      var output = shellResult.stdout;
      if (output == '') {
        output = shellResult.stderr;
      }

      //this.log(stringify(shellResult))
      if (output != '') {
        if (logResult) {
          this.log(output);
        } else {
          this.debug('[output] \n' + output);
        }
      }
      return output;
    }
  }, {
    key: 'log',
    value: function log(message) {
      var level = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var msg = '';
      if (level) {
        msg += level;
      }
      msg += '[' + require$$1$5.grey(this.constructor.name) + '] ' + message;
      fancyLog(this.maskSensitive(msg));
    }
  }, {
    key: 'error',
    value: function error(msg) {
      this.log(msg, '[' + require$$1$5.red('error') + ']');
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this.config.debug) {
        this.log(msg, '[' + require$$1$5.cyan('debug') + ']');
      }
    }
  }, {
    key: 'maskSensitive',
    value: function maskSensitive(str) {
      var result = str;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this.config.sensitive)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          result = result.replace(key, this.config.sensitive[key], 'gmi');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    }
  }, {
    key: 'debugDump',
    value: function debugDump(msg, obj) {
      this.debug(msg + ':\n' + stringify(obj));
    }
  }]);
  return Base;
}();

var index$13 = __commonjs(function (module) {
	'use strict';

	function posix(path) {
		return path.charAt(0) === '/';
	};

	function win32(path) {
		// https://github.com/joyent/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = !!device && device.charAt(1) !== ':';

		// UNC paths are always absolute
		return !!result[2] || isUnc;
	};

	module.exports = process.platform === 'win32' ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;
});

var require$$1$7 = index$13 && (typeof index$13 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$13)) === 'object' && 'default' in index$13 ? index$13['default'] : index$13;

var Paths = function () {
  function Paths() {
    babelHelpers.classCallCheck(this, Paths);
  }

  babelHelpers.createClass(Paths, null, [{
    key: 'resolveCwd',
    value: function resolveCwd(base, cwd) {
      if (!require$$1$7(cwd)) {
        return require$$2.join(base, cwd);
      } else {
        return cwd;
      }
    }
  }]);
  return Paths;
}();

var Default$1 = {
  sourceCwd: shelljs.pwd(), // The base directory of the source e.g. the directory of the package.json (not usually necessary to specify, but useful for odd structures and tests)
  cwd: 'dist' // The directory that contains your built code.
};

var BaseSourced = function (_Base) {
  babelHelpers.inherits(BaseSourced, _Base);

  function BaseSourced() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    babelHelpers.classCallCheck(this, BaseSourced);


    // get a fully resolved sourceCwd based on the process cwd (if not an absolute path)

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseSourced).call(this, extend(true, {}, Default$1, config)));

    _this.config.sourceCwd = Paths.resolveCwd(shelljs.pwd(), _this.config.sourceCwd);

    // get a fully resolved cwd based on the sourceCwd (if not an absolute path)
    _this.config.cwd = Paths.resolveCwd(_this.config.sourceCwd, _this.config.cwd);
    return _this;
  }

  return BaseSourced;
}(Base);

var Default$3 = {};

var Git = function (_Base) {
  babelHelpers.inherits(Git, _Base);

  function Git() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    babelHelpers.classCallCheck(this, Git);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Git).call(this, extend(true, {}, Default$3, config)));
  }

  babelHelpers.createClass(Git, [{
    key: 'version',
    value: function version() {
      return (this.exec('git --version', false).match(/\d+\.\d+\.\d+/) || []).shift();
    }
  }, {
    key: 'diff',
    value: function diff() {
      return this.exec('git diff', true);
    }
  }, {
    key: 'ensureCommitted',
    value: function ensureCommitted() {
      var diff = this.diff();
      if (diff !== '') {
        this.notifyError('There are uncommitted changes in your working directory ' + this.config.cwd + '. Please commit the changes first.');
      } else {
        this.debug('No diffs (uncommitted changes) found.');
      }
    }
  }, {
    key: 'sourceBranch',
    value: function sourceBranch() {
      return this.exec('git rev-parse --abbrev-ref HEAD', false).replace(/\n/g, '');
    }
  }, {
    key: 'sourceCommit',
    value: function sourceCommit() {
      return this.exec('git rev-parse --short HEAD', false).replace(/\n/g, '');
    }
  }, {
    key: 'sourceCommitFull',
    value: function sourceCommitFull() {
      return this.exec('git rev-parse HEAD', false).replace(/\n/g, '');
    }
  }, {
    key: 'init',
    value: function init() {
      this.exec('git init');
    }
  }, {
    key: 'configure',
    value: function configure(key, value) {
      this.exec('git config "' + key + '" "' + value + '"');
    }
  }, {
    key: 'remote',
    value: function remote() {
      return this.exec('git remote', false);
    }
  }, {
    key: 'remoteAdd',
    value: function remoteAdd(name, location) {
      this.exec('git remote add ' + name + ' ' + location);
    }

    /**
     * Fetch remote refs to a specific branch, equivalent to a pull without checkout
     */

  }, {
    key: 'fetch',
    value: function fetch(remoteName, branch) {
      var shallow = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var depth = shallow ? '--depth=1 ' : '';
      // `--update-head-ok` allows fetch on a branch with uncommited changes
      this.exec('git fetch --progress --verbose --update-head-ok ' + depth + remoteName + ' ' + branch); //, false, true)
    }

    /**
     * Make the current working tree the branch HEAD without checking out files
     * @param branch
     */

  }, {
    key: 'symbolicRefHead',
    value: function symbolicRefHead(branch) {
      this.exec('git symbolic-ref HEAD refs/heads/' + branch);
    }

    /**
     * Make sure the stage is clean
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.exec('git reset', false);
    }

    /**
     *
     * @param branch
     * @param remoteName
     * @param remoteBranch
     */

  }, {
    key: 'track',
    value: function track(branch) {
      var remoteName = arguments.length <= 1 || arguments[1] === undefined ? 'origin' : arguments[1];
      var remoteBranch = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      if (remoteBranch == null) {
        remoteBranch = branch;
      }
      // Attempt to track a branch from origin
      //  It may fail on times that the branch is already tracking another remote. There is no problem when that happens, nor does it have any affect
      this.codeExec('git branch --track ' + branch + ' ' + remoteName + '/' + remoteBranch, false);
    }
  }, {
    key: 'checkout',
    value: function checkout(branch) {
      this.exec('git checkout --orphan ' + branch);
    }
  }, {
    key: 'branchRemote',
    value: function branchRemote(branch, remoteName, remoteBranch) {
      this.exec('git branch --set-upstream-to=' + remoteName + '/' + remoteBranch + ' ' + branch);
    }
  }, {
    key: 'configBranchRemote',
    value: function configBranchRemote(branch) {
      try {
        return this.exec('git config branch.' + branch + '.remote', false).replace(/\n/g, '');
      } catch (error) {
        return null;
      }
    }
  }, {
    key: 'branchExists',
    value: function branchExists(branch) {
      return this.booleanExec('git show-ref --verify --quiet refs/heads/' + branch);
    }
  }, {
    key: 'branchRemoteExists',
    value: function branchRemoteExists(branch, remoteName) {
      return this.booleanExec('git ls-remote --exit-code ' + remoteName + ' ' + branch);
    }
  }, {
    key: 'status',
    value: function status() {
      var file = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var result = this.exec('git status -sb --porcelain ' + file, false);
      if (result === '') {
        return null;
      } else {
        return result;
      }
    }
  }, {
    key: 'add',
    value: function add() {
      var file = arguments.length <= 0 || arguments[0] === undefined ? '.' : arguments[0];

      this.exec('git add -A ' + file);
    }
  }, {
    key: 'hash',
    value: function hash(prefix, text) {
      return prefix + '-' + crypto.createHash('md5').update(text).digest('hex').substring(0, 6);
    }
  }, {
    key: 'commit',
    value: function commit(message) {
      // generate commit message
      var commitMessageFile = require$$2.join(this.config.cwd, this.hash('commitMessageFile', message));
      require$$1.writeFileSync(commitMessageFile, message);
      this.exec('git commit --file=' + commitMessageFile);

      require$$1.unlinkSync(commitMessageFile);
    }
  }, {
    key: 'tag',
    value: function tag(_tag) {
      this.exec('git tag ' + _tag);
    }
  }, {
    key: 'tagExists',
    value: function tagExists(tag, remoteName) {
      return this.booleanExec('git ls-remote --tags --exit-code ' + remoteName + ' ' + tag);
    }
  }, {
    key: 'push',
    value: function push(remoteName, branch) {
      var force = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var withForce = force ? ' --force ' : '';

      this.log('Pushing ' + branch + ' to ' + remoteName + withForce);
      this.exec('git push ' + withForce + remoteName + ' ' + branch); //, false, true)
    }
  }, {
    key: 'pushTag',
    value: function pushTag(remoteName, tag) {
      this.exec('git push ' + remoteName + ' ' + tag);
    }
  }]);
  return Git;
}(Base);

var assign = __commonjs(function (module) {
  // simple mutable assign (extracted from fs-extra)
  // I really like object-assign package, but I wanted a lean package with zero deps
  function _assign() {
    var args = [].slice.call(arguments).filter(function (i) {
      return i;
    });
    var dest = args.shift();
    args.forEach(function (src) {
      Object.keys(src).forEach(function (key) {
        dest[key] = src[key];
      });
    });

    return dest;
  }

  // thank you baby Jesus for Node v4 and Object.assign
  module.exports = Object.assign || _assign;
});

var require$$0$11 = assign && (typeof assign === 'undefined' ? 'undefined' : babelHelpers.typeof(assign)) === 'object' && 'default' in assign ? assign['default'] : assign;

var index$16 = __commonjs(function (module) {
  var assert = require$$5;
  var fs = require$$1;
  var path = require$$2;
  var Readable = require$$2$1.Readable;
  var util = require$$1$1;
  var assign = require$$0$11;

  function Walker(dir, options) {
    assert.strictEqual(typeof dir === 'undefined' ? 'undefined' : babelHelpers.typeof(dir), 'string', '`dir` parameter should be of type string. Got type: ' + (typeof dir === 'undefined' ? 'undefined' : babelHelpers.typeof(dir)));
    var defaultStreamOptions = { objectMode: true };
    var defaultOpts = { queueMethod: 'shift', pathSorter: undefined };
    options = assign(defaultOpts, options, defaultStreamOptions);

    Readable.call(this, options);
    this.root = path.resolve(dir);
    this.paths = [this.root];
    this.options = options;
  }
  util.inherits(Walker, Readable);

  Walker.prototype._read = function () {
    if (this.paths.length === 0) return this.push(null);
    var self = this;
    var pathItem = this.paths[this.options.queueMethod]();

    fs.lstat(pathItem, function (err, stats) {
      var item = { path: pathItem, stats: stats };
      if (err) return self.emit('error', err, item);
      if (!stats.isDirectory()) return self.push(item);

      fs.readdir(pathItem, function (err, pathItems) {
        if (err) {
          self.push(item);
          return self.emit('error', err, item);
        }

        pathItems = pathItems.map(function (part) {
          return path.join(pathItem, part);
        });
        if (self.options.pathSorter) pathItems.sort(self.options.pathSorter);
        pathItems.forEach(function (pi) {
          self.paths.push(pi);
        });

        self.push(item);
      });
    });
  };

  function walk(root, options) {
    return new Walker(root, options);
  }

  module.exports = walk;
});

var require$$0$10 = index$16 && (typeof index$16 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$16)) === 'object' && 'default' in index$16 ? index$16['default'] : index$16;

var index$15 = __commonjs(function (module) {
  var klaw = require$$0$10;

  module.exports = {
    walk: klaw
  };
});

var require$$0$9 = index$15 && (typeof index$15 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$15)) === 'object' && 'default' in index$15 ? index$15['default'] : index$15;

var fs$1 = __commonjs(function (module) {
  'use strict';

  var fs = require$$1;

  module.exports = clone(fs);

  function clone(obj) {
    if (obj === null || (typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj)) !== 'object') return obj;

    if (obj instanceof Object) var copy = { __proto__: obj.__proto__ };else var copy = Object.create(null);

    Object.getOwnPropertyNames(obj).forEach(function (key) {
      Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
    });

    return copy;
  }
});

var require$$1$9 = fs$1 && (typeof fs$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(fs$1)) === 'object' && 'default' in fs$1 ? fs$1['default'] : fs$1;

var legacyStreams = __commonjs(function (module) {
  var Stream = require$$2$1.Stream;

  module.exports = legacy;

  function legacy(fs) {
    return {
      ReadStream: ReadStream,
      WriteStream: WriteStream
    };

    function ReadStream(path, options) {
      if (!(this instanceof ReadStream)) return new ReadStream(path, options);

      Stream.call(this);

      var self = this;

      this.path = path;
      this.fd = null;
      this.readable = true;
      this.paused = false;

      this.flags = 'r';
      this.mode = 438; /*=0666*/
      this.bufferSize = 64 * 1024;

      options = options || {};

      // Mixin options into this
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }

      if (this.encoding) this.setEncoding(this.encoding);

      if (this.start !== undefined) {
        if ('number' !== typeof this.start) {
          throw TypeError('start must be a Number');
        }
        if (this.end === undefined) {
          this.end = Infinity;
        } else if ('number' !== typeof this.end) {
          throw TypeError('end must be a Number');
        }

        if (this.start > this.end) {
          throw new Error('start must be <= end');
        }

        this.pos = this.start;
      }

      if (this.fd !== null) {
        process.nextTick(function () {
          self._read();
        });
        return;
      }

      fs.open(this.path, this.flags, this.mode, function (err, fd) {
        if (err) {
          self.emit('error', err);
          self.readable = false;
          return;
        }

        self.fd = fd;
        self.emit('open', fd);
        self._read();
      });
    }

    function WriteStream(path, options) {
      if (!(this instanceof WriteStream)) return new WriteStream(path, options);

      Stream.call(this);

      this.path = path;
      this.fd = null;
      this.writable = true;

      this.flags = 'w';
      this.encoding = 'binary';
      this.mode = 438; /*=0666*/
      this.bytesWritten = 0;

      options = options || {};

      // Mixin options into this
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }

      if (this.start !== undefined) {
        if ('number' !== typeof this.start) {
          throw TypeError('start must be a Number');
        }
        if (this.start < 0) {
          throw new Error('start must be >= zero');
        }

        this.pos = this.start;
      }

      this.busy = false;
      this._queue = [];

      if (this.fd === null) {
        this._open = fs.open;
        this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
        this.flush();
      }
    }
  }
});

var require$$3$4 = legacyStreams && (typeof legacyStreams === 'undefined' ? 'undefined' : babelHelpers.typeof(legacyStreams)) === 'object' && 'default' in legacyStreams ? legacyStreams['default'] : legacyStreams;

var polyfills = __commonjs(function (module) {
  var fs = require$$1$9;
  var constants = require$$0$2;

  var origCwd = process.cwd;
  var cwd = null;
  process.cwd = function () {
    if (!cwd) cwd = origCwd.call(process);
    return cwd;
  };
  try {
    process.cwd();
  } catch (er) {}

  var chdir = process.chdir;
  process.chdir = function (d) {
    cwd = null;
    chdir.call(process, d);
  };

  module.exports = patch;

  function patch(fs) {
    // (re-)implement some things that are known busted or missing.

    // lchmod, broken prior to 0.6.2
    // back-port the fix here.
    if (constants.hasOwnProperty('O_SYMLINK') && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      patchLchmod(fs);
    }

    // lutimes implementation, or no-op
    if (!fs.lutimes) {
      patchLutimes(fs);
    }

    // https://github.com/isaacs/node-graceful-fs/issues/4
    // Chown should not fail on einval or eperm if non-root.
    // It should not fail on enosys ever, as this just indicates
    // that a fs doesn't support the intended operation.

    fs.chown = chownFix(fs.chown);
    fs.fchown = chownFix(fs.fchown);
    fs.lchown = chownFix(fs.lchown);

    fs.chmod = chownFix(fs.chmod);
    fs.fchmod = chownFix(fs.fchmod);
    fs.lchmod = chownFix(fs.lchmod);

    fs.chownSync = chownFixSync(fs.chownSync);
    fs.fchownSync = chownFixSync(fs.fchownSync);
    fs.lchownSync = chownFixSync(fs.lchownSync);

    fs.chmodSync = chownFix(fs.chmodSync);
    fs.fchmodSync = chownFix(fs.fchmodSync);
    fs.lchmodSync = chownFix(fs.lchmodSync);

    // if lchmod/lchown do not exist, then make them no-ops
    if (!fs.lchmod) {
      fs.lchmod = function (path, mode, cb) {
        process.nextTick(cb);
      };
      fs.lchmodSync = function () {};
    }
    if (!fs.lchown) {
      fs.lchown = function (path, uid, gid, cb) {
        process.nextTick(cb);
      };
      fs.lchownSync = function () {};
    }

    // on Windows, A/V software can lock the directory, causing this
    // to fail with an EACCES or EPERM if the directory contains newly
    // created files.  Try again on failure, for up to 1 second.
    if (process.platform === "win32") {
      fs.rename = function (fs$rename) {
        return function (from, to, cb) {
          var start = Date.now();
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 1000) {
              return fs$rename(from, to, CB);
            }
            if (cb) cb(er);
          });
        };
      }(fs.rename);
    }

    // if read() returns EAGAIN, then just try it again.
    fs.read = function (fs$read) {
      return function (fd, buffer, offset, length, position, callback_) {
        var _callback;
        if (callback_ && typeof callback_ === 'function') {
          var eagCounter = 0;
          _callback = function callback(er, _, __) {
            if (er && er.code === 'EAGAIN' && eagCounter < 10) {
              eagCounter++;
              return fs$read.call(fs, fd, buffer, offset, length, position, _callback);
            }
            callback_.apply(this, arguments);
          };
        }
        return fs$read.call(fs, fd, buffer, offset, length, position, _callback);
      };
    }(fs.read);

    fs.readSync = function (fs$readSync) {
      return function (fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs, fd, buffer, offset, length, position);
          } catch (er) {
            if (er.code === 'EAGAIN' && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        }
      };
    }(fs.readSync);
  }

  function patchLchmod(fs) {
    fs.lchmod = function (path, mode, callback) {
      callback = callback || noop;
      fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function (err, fd) {
        if (err) {
          callback(err);
          return;
        }
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function (err2) {
            callback(err || err2);
          });
        });
      });
    };

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);

      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      var threw = true;
      var ret;
      try {
        ret = fs.fchmodSync(fd, mode);
        threw = false;
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd);
          } catch (er) {}
        } else {
          fs.closeSync(fd);
        }
      }
      return ret;
    };
  }

  function patchLutimes(fs) {
    if (constants.hasOwnProperty("O_SYMLINK")) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants.O_SYMLINK, function (er, fd) {
          cb = cb || noop;
          if (er) return cb(er);
          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              return cb(er || er2);
            });
          });
        });
      };

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants.O_SYMLINK);
        var ret;
        var threw = true;
        try {
          ret = fs.futimesSync(fd, at, mt);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd);
            } catch (er) {}
          } else {
            fs.closeSync(fd);
          }
        }
        return ret;
      };
    } else {
      fs.lutimes = function (_a, _b, _c, cb) {
        process.nextTick(cb);
      };
      fs.lutimesSync = function () {};
    }
  }

  function chownFix(orig) {
    if (!orig) return orig;
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er, res) {
        if (chownErOk(er)) er = null;
        cb(er, res);
      });
    };
  }

  function chownFixSync(orig) {
    if (!orig) return orig;
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid);
      } catch (er) {
        if (!chownErOk(er)) throw er;
      }
    };
  }

  // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.
  function chownErOk(er) {
    if (!er) return true;

    if (er.code === "ENOSYS") return true;

    var nonroot = !process.getuid || process.getuid() !== 0;
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM") return true;
    }

    return false;
  }
});

var require$$4$3 = polyfills && (typeof polyfills === 'undefined' ? 'undefined' : babelHelpers.typeof(polyfills)) === 'object' && 'default' in polyfills ? polyfills['default'] : polyfills;

var gracefulFs = __commonjs(function (module) {
  var fs = require$$1;
  var polyfills = require$$4$3;
  var legacy = require$$3$4;
  var queue = [];

  var util = require$$1$1;

  function noop() {}

  var debug = noop;
  if (util.debuglog) debug = util.debuglog('gfs4');else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) debug = function debug() {
    var m = util.format.apply(util, arguments);
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
    console.error(m);
  };

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function () {
      debug(queue);
      require$$5.equal(queue.length, 0);
    });
  }

  module.exports = patch(require$$1$9);
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
    module.exports = patch(fs);
  }

  // Always patch fs.close/closeSync, because we want to
  // retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  module.exports.close = fs.close = function (fs$close) {
    return function (fd, cb) {
      return fs$close.call(fs, fd, function (err) {
        if (!err) retry();

        if (typeof cb === 'function') cb.apply(this, arguments);
      });
    };
  }(fs.close);

  module.exports.closeSync = fs.closeSync = function (fs$closeSync) {
    return function (fd) {
      // Note that graceful-fs also retries when fs.closeSync() fails.
      // Looks like a bug to me, although it's probably a harmless one.
      var rval = fs$closeSync.apply(fs, arguments);
      retry();
      return rval;
    };
  }(fs.closeSync);

  function patch(fs) {
    // Everything that references the open() function needs to be in here
    polyfills(fs);
    fs.gracefulify = patch;
    fs.FileReadStream = ReadStream; // Legacy name.
    fs.FileWriteStream = WriteStream; // Legacy name.
    fs.createReadStream = createReadStream;
    fs.createWriteStream = createWriteStream;
    var fs$readFile = fs.readFile;
    fs.readFile = readFile;
    function readFile(path, options, cb) {
      if (typeof options === 'function') cb = options, options = null;

      return go$readFile(path, options, cb);

      function go$readFile(path, options, cb) {
        return fs$readFile(path, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readFile, [path, options, cb]]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
            retry();
          }
        });
      }
    }

    var fs$writeFile = fs.writeFile;
    fs.writeFile = writeFile;
    function writeFile(path, data, options, cb) {
      if (typeof options === 'function') cb = options, options = null;

      return go$writeFile(path, data, options, cb);

      function go$writeFile(path, data, options, cb) {
        return fs$writeFile(path, data, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$writeFile, [path, data, options, cb]]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
            retry();
          }
        });
      }
    }

    var fs$appendFile = fs.appendFile;
    if (fs$appendFile) fs.appendFile = appendFile;
    function appendFile(path, data, options, cb) {
      if (typeof options === 'function') cb = options, options = null;

      return go$appendFile(path, data, options, cb);

      function go$appendFile(path, data, options, cb) {
        return fs$appendFile(path, data, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$appendFile, [path, data, options, cb]]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
            retry();
          }
        });
      }
    }

    var fs$readdir = fs.readdir;
    fs.readdir = readdir;
    function readdir(path, cb) {
      return go$readdir(path, cb);

      function go$readdir() {
        return fs$readdir(path, function (err, files) {
          if (files && files.sort) files.sort(); // Backwards compatibility with graceful-fs.

          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readdir, [path, cb]]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
            retry();
          }
        });
      }
    }

    if (process.version.substr(0, 4) === 'v0.8') {
      var legStreams = legacy(fs);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }

    var fs$ReadStream = fs.ReadStream;
    ReadStream.prototype = Object.create(fs$ReadStream.prototype);
    ReadStream.prototype.open = ReadStream$open;

    var fs$WriteStream = fs.WriteStream;
    WriteStream.prototype = Object.create(fs$WriteStream.prototype);
    WriteStream.prototype.open = WriteStream$open;

    fs.ReadStream = ReadStream;
    fs.WriteStream = WriteStream;

    function ReadStream(path, options) {
      if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }

    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function (err, fd) {
        if (err) {
          if (that.autoClose) that.destroy();

          that.emit('error', err);
        } else {
          that.fd = fd;
          that.emit('open', fd);
          that.read();
        }
      });
    }

    function WriteStream(path, options) {
      if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }

    function WriteStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function (err, fd) {
        if (err) {
          that.destroy();
          that.emit('error', err);
        } else {
          that.fd = fd;
          that.emit('open', fd);
        }
      });
    }

    function createReadStream(path, options) {
      return new ReadStream(path, options);
    }

    function createWriteStream(path, options) {
      return new WriteStream(path, options);
    }

    var fs$open = fs.open;
    fs.open = open;
    function open(path, flags, mode, cb) {
      if (typeof mode === 'function') cb = mode, mode = null;

      return go$open(path, flags, mode, cb);

      function go$open(path, flags, mode, cb) {
        return fs$open(path, flags, mode, function (err, fd) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$open, [path, flags, mode, cb]]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
            retry();
          }
        });
      }
    }

    return fs;
  }

  function enqueue(elem) {
    debug('ENQUEUE', elem[0].name, elem[1]);
    queue.push(elem);
  }

  function retry() {
    var elem = queue.shift();
    if (elem) {
      debug('RETRY', elem[0].name, elem[1]);
      elem[0].apply(null, elem[1]);
    }
  }
});

var require$$3$3 = gracefulFs && (typeof gracefulFs === 'undefined' ? 'undefined' : babelHelpers.typeof(gracefulFs)) === 'object' && 'default' in gracefulFs ? gracefulFs['default'] : gracefulFs;

var mkdirsSync$1 = __commonjs(function (module) {
  var fs = require$$3$3;
  var path = require$$2;

  var o777 = parseInt('0777', 8);

  function mkdirsSync(p, opts, made) {
    if (!opts || (typeof opts === 'undefined' ? 'undefined' : babelHelpers.typeof(opts)) !== 'object') {
      opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined) {
      mode = o777 & ~process.umask();
    }
    if (!made) made = null;

    p = path.resolve(p);

    try {
      xfs.mkdirSync(p, mode);
      made = made || p;
    } catch (err0) {
      switch (err0.code) {
        case 'ENOENT':
          made = mkdirsSync(path.dirname(p), opts, made);
          mkdirsSync(p, opts, made);
          break;

        // In the case of any other error, just see if there's a dir
        // there already.  If so, then hooray!  If not, then something
        // is borked.
        default:
          var stat;
          try {
            stat = xfs.statSync(p);
          } catch (err1) {
            throw err0;
          }
          if (!stat.isDirectory()) throw err0;
          break;
      }
    }

    return made;
  }

  module.exports = mkdirsSync;
});

var require$$0$13 = mkdirsSync$1 && (typeof mkdirsSync$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(mkdirsSync$1)) === 'object' && 'default' in mkdirsSync$1 ? mkdirsSync$1['default'] : mkdirsSync$1;

var mkdirs$1 = __commonjs(function (module) {
  var fs = require$$3$3;
  var path = require$$2;

  var o777 = parseInt('0777', 8);

  function mkdirs(p, opts, callback, made) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    } else if (!opts || (typeof opts === 'undefined' ? 'undefined' : babelHelpers.typeof(opts)) !== 'object') {
      opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined) {
      mode = o777 & ~process.umask();
    }
    if (!made) made = null;

    callback = callback || function () {};
    p = path.resolve(p);

    xfs.mkdir(p, mode, function (er) {
      if (!er) {
        made = made || p;
        return callback(null, made);
      }
      switch (er.code) {
        case 'ENOENT':
          if (path.dirname(p) === p) return callback(er);
          mkdirs(path.dirname(p), opts, function (er, made) {
            if (er) callback(er, made);else mkdirs(p, opts, callback, made);
          });
          break;

        // In the case of any other error, just see if there's a dir
        // there already.  If so, then hooray!  If not, then something
        // is borked.
        default:
          xfs.stat(p, function (er2, stat) {
            // if the stat fails, then that's super weird.
            // let the original error be the failure reason.
            if (er2 || !stat.isDirectory()) callback(er, made);else callback(null, made);
          });
          break;
      }
    });
  }

  module.exports = mkdirs;
});

var require$$1$10 = mkdirs$1 && (typeof mkdirs$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(mkdirs$1)) === 'object' && 'default' in mkdirs$1 ? mkdirs$1['default'] : mkdirs$1;

var index$18 = __commonjs(function (module) {
  module.exports = {
    mkdirs: require$$1$10,
    mkdirsSync: require$$0$13,
    // alias
    mkdirp: require$$1$10,
    mkdirpSync: require$$0$13,
    ensureDir: require$$1$10,
    ensureDirSync: require$$0$13
  };
});

var require$$0$12 = index$18 && (typeof index$18 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$18)) === 'object' && 'default' in index$18 ? index$18['default'] : index$18;

var index$17 = __commonjs(function (module) {
  var path = require$$2;
  var fs = require$$3$3;
  var mkdir = require$$0$12;

  function outputFile(file, data, encoding, callback) {
    if (typeof encoding === 'function') {
      callback = encoding;
      encoding = 'utf8';
    }

    var dir = path.dirname(file);
    fs.exists(dir, function (itDoes) {
      if (itDoes) return fs.writeFile(file, data, encoding, callback);

      mkdir.mkdirs(dir, function (err) {
        if (err) return callback(err);

        fs.writeFile(file, data, encoding, callback);
      });
    });
  }

  function outputFileSync(file, data, encoding) {
    var dir = path.dirname(file);
    if (fs.existsSync(dir)) {
      return fs.writeFileSync.apply(fs, arguments);
    }
    mkdir.mkdirsSync(dir);
    fs.writeFileSync.apply(fs, arguments);
  }

  module.exports = {
    outputFile: outputFile,
    outputFileSync: outputFileSync
  };
});

var require$$1$8 = index$17 && (typeof index$17 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$17)) === 'object' && 'default' in index$17 ? index$17['default'] : index$17;

var symlinkType = __commonjs(function (module) {
  var fs = require$$3$3;

  function symlinkType(srcpath, type, callback) {
    callback = typeof type === 'function' ? type : callback;
    type = typeof type === 'function' ? false : type;
    if (type) return callback(null, type);
    fs.lstat(srcpath, function (err, stats) {
      if (err) return callback(null, 'file');
      type = stats && stats.isDirectory() ? 'dir' : 'file';
      callback(null, type);
    });
  }

  function symlinkTypeSync(srcpath, type) {
    if (type) return type;
    try {
      var stats = fs.lstatSync(srcpath);
    } catch (e) {
      return 'file';
    }
    return stats && stats.isDirectory() ? 'dir' : 'file';
  }

  module.exports = {
    symlinkType: symlinkType,
    symlinkTypeSync: symlinkTypeSync
  };
});

var require$$0$15 = symlinkType && (typeof symlinkType === 'undefined' ? 'undefined' : babelHelpers.typeof(symlinkType)) === 'object' && 'default' in symlinkType ? symlinkType['default'] : symlinkType;
var symlinkType = symlinkType.symlinkType;

var symlinkPaths = __commonjs(function (module) {
  var path = require$$2;
  // path.isAbsolute shim for Node.js 0.10 support
  path.isAbsolute = path.isAbsolute ? path.isAbsolute : require$$1$7;
  var fs = require$$3$3;

  /**
   * Function that returns two types of paths, one relative to symlink, and one
   * relative to the current working directory. Checks if path is absolute or
   * relative. If the path is relative, this function checks if the path is
   * relative to symlink or relative to current working directory. This is an
   * initiative to find a smarter `srcpath` to supply when building symlinks.
   * This allows you to determine which path to use out of one of three possible
   * types of source paths. The first is an absolute path. This is detected by
   * `path.isAbsolute()`. When an absolute path is provided, it is checked to
   * see if it exists. If it does it's used, if not an error is returned
   * (callback)/ thrown (sync). The other two options for `srcpath` are a
   * relative url. By default Node's `fs.symlink` works by creating a symlink
   * using `dstpath` and expects the `srcpath` to be relative to the newly
   * created symlink. If you provide a `srcpath` that does not exist on the file
   * system it results in a broken symlink. To minimize this, the function
   * checks to see if the 'relative to symlink' source file exists, and if it
   * does it will use it. If it does not, it checks if there's a file that
   * exists that is relative to the current working directory, if does its used.
   * This preserves the expectations of the original fs.symlink spec and adds
   * the ability to pass in `relative to current working direcotry` paths.
   */

  function symlinkPaths(srcpath, dstpath, callback) {
    if (path.isAbsolute(srcpath)) {
      return fs.lstat(srcpath, function (err, stat) {
        if (err) {
          err.message = err.message.replace('lstat', 'ensureSymlink');
          return callback(err);
        }
        return callback(null, {
          'toCwd': srcpath,
          'toDst': srcpath
        });
      });
    } else {
      var dstdir = path.dirname(dstpath);
      var relativeToDst = path.join(dstdir, srcpath);
      return fs.exists(relativeToDst, function (exists) {
        if (exists) {
          return callback(null, {
            'toCwd': relativeToDst,
            'toDst': srcpath
          });
        } else {
          return fs.lstat(srcpath, function (err, stat) {
            if (err) {
              err.message = err.message.replace('lstat', 'ensureSymlink');
              return callback(err);
            }
            return callback(null, {
              'toCwd': srcpath,
              'toDst': path.relative(dstdir, srcpath)
            });
          });
        }
      });
    }
  }

  function symlinkPathsSync(srcpath, dstpath) {
    var exists;
    if (path.isAbsolute(srcpath)) {
      exists = fs.existsSync(srcpath);
      if (!exists) throw new Error('absolute srcpath does not exist');
      return {
        'toCwd': srcpath,
        'toDst': srcpath
      };
    } else {
      var dstdir = path.dirname(dstpath);
      var relativeToDst = path.join(dstdir, srcpath);
      exists = fs.existsSync(relativeToDst);
      if (exists) {
        return {
          'toCwd': relativeToDst,
          'toDst': srcpath
        };
      } else {
        exists = fs.existsSync(srcpath);
        if (!exists) throw new Error('relative srcpath does not exist');
        return {
          'toCwd': srcpath,
          'toDst': path.relative(dstdir, srcpath)
        };
      }
    }
  }

  module.exports = {
    'symlinkPaths': symlinkPaths,
    'symlinkPathsSync': symlinkPathsSync
  };
});

var require$$1$11 = symlinkPaths && (typeof symlinkPaths === 'undefined' ? 'undefined' : babelHelpers.typeof(symlinkPaths)) === 'object' && 'default' in symlinkPaths ? symlinkPaths['default'] : symlinkPaths;

var symlink = __commonjs(function (module) {
  var path = require$$2;
  var fs = require$$3$3;
  var _mkdirs = require$$0$12;
  var mkdirs = _mkdirs.mkdirs;
  var mkdirsSync = _mkdirs.mkdirsSync;

  var _symlinkPaths = require$$1$11;
  var symlinkPaths = _symlinkPaths.symlinkPaths;
  var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;

  var _symlinkType = require$$0$15;
  var symlinkType = _symlinkType.symlinkType;
  var symlinkTypeSync = _symlinkType.symlinkTypeSync;

  function createSymlink(srcpath, dstpath, type, callback) {
    callback = typeof type === 'function' ? type : callback;
    type = typeof type === 'function' ? false : type;

    fs.exists(dstpath, function (destinationExists) {
      if (destinationExists) return callback(null);
      symlinkPaths(srcpath, dstpath, function (err, relative) {
        if (err) return callback(err);
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, function (err, type) {
          if (err) return callback(err);
          var dir = path.dirname(dstpath);
          fs.exists(dir, function (dirExists) {
            if (dirExists) return fs.symlink(srcpath, dstpath, type, callback);
            mkdirs(dir, function (err) {
              if (err) return callback(err);
              fs.symlink(srcpath, dstpath, type, callback);
            });
          });
        });
      });
    });
  }

  function createSymlinkSync(srcpath, dstpath, type, callback) {
    callback = typeof type === 'function' ? type : callback;
    type = typeof type === 'function' ? false : type;

    var destinationExists = fs.existsSync(dstpath);
    if (destinationExists) return undefined;

    var relative = symlinkPathsSync(srcpath, dstpath);
    srcpath = relative.toDst;
    type = symlinkTypeSync(relative.toCwd, type);
    var dir = path.dirname(dstpath);
    var exists = fs.existsSync(dir);
    if (exists) return fs.symlinkSync(srcpath, dstpath, type);
    mkdirsSync(dir);
    return fs.symlinkSync(srcpath, dstpath, type);
  }

  module.exports = {
    createSymlink: createSymlink,
    createSymlinkSync: createSymlinkSync,
    // alias
    ensureSymlink: createSymlink,
    ensureSymlinkSync: createSymlinkSync
  };
});

var require$$0$14 = symlink && (typeof symlink === 'undefined' ? 'undefined' : babelHelpers.typeof(symlink)) === 'object' && 'default' in symlink ? symlink['default'] : symlink;

var link = __commonjs(function (module) {
  var path = require$$2;
  var fs = require$$3$3;
  var mkdir = require$$0$12;

  function createLink(srcpath, dstpath, callback) {
    function makeLink(srcpath, dstpath) {
      fs.link(srcpath, dstpath, function (err) {
        if (err) return callback(err);
        callback(null);
      });
    }

    fs.exists(dstpath, function (destinationExists) {
      if (destinationExists) return callback(null);
      fs.lstat(srcpath, function (err, stat) {
        if (err) {
          err.message = err.message.replace('lstat', 'ensureLink');
          return callback(err);
        }

        var dir = path.dirname(dstpath);
        fs.exists(dir, function (dirExists) {
          if (dirExists) return makeLink(srcpath, dstpath);
          mkdir.mkdirs(dir, function (err) {
            if (err) return callback(err);
            makeLink(srcpath, dstpath);
          });
        });
      });
    });
  }

  function createLinkSync(srcpath, dstpath, callback) {
    var destinationExists = fs.existsSync(dstpath);
    if (destinationExists) return undefined;

    try {
      fs.lstatSync(srcpath);
    } catch (err) {
      err.message = err.message.replace('lstat', 'ensureLink');
      throw err;
    }

    var dir = path.dirname(dstpath);
    var dirExists = fs.existsSync(dir);
    if (dirExists) return fs.linkSync(srcpath, dstpath);
    mkdir.mkdirsSync(dir);

    return fs.linkSync(srcpath, dstpath);
  }

  module.exports = {
    createLink: createLink,
    createLinkSync: createLinkSync,
    // alias
    ensureLink: createLink,
    ensureLinkSync: createLinkSync
  };
});

var require$$1$12 = link && (typeof link === 'undefined' ? 'undefined' : babelHelpers.typeof(link)) === 'object' && 'default' in link ? link['default'] : link;

var file = __commonjs(function (module) {
  var path = require$$2;
  var fs = require$$3$3;
  var mkdir = require$$0$12;

  function createFile(file, callback) {
    function makeFile() {
      fs.writeFile(file, '', function (err) {
        if (err) return callback(err);
        callback();
      });
    }

    fs.exists(file, function (fileExists) {
      if (fileExists) return callback();
      var dir = path.dirname(file);
      fs.exists(dir, function (dirExists) {
        if (dirExists) return makeFile();
        mkdir.mkdirs(dir, function (err) {
          if (err) return callback(err);
          makeFile();
        });
      });
    });
  }

  function createFileSync(file) {
    if (fs.existsSync(file)) return;

    var dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      mkdir.mkdirsSync(dir);
    }

    fs.writeFileSync(file, '');
  }

  module.exports = {
    createFile: createFile,
    createFileSync: createFileSync,
    // alias
    ensureFile: createFile,
    ensureFileSync: createFileSync
  };
});

var require$$2$5 = file && (typeof file === 'undefined' ? 'undefined' : babelHelpers.typeof(file)) === 'object' && 'default' in file ? file['default'] : file;

var index$19 = __commonjs(function (module) {
  var file = require$$2$5;
  var link = require$$1$12;
  var symlink = require$$0$14;

  module.exports = {
    // file
    createFile: file.createFile,
    createFileSync: file.createFileSync,
    ensureFile: file.createFile,
    ensureFileSync: file.createFileSync,
    // link
    createLink: link.createLink,
    createLinkSync: link.createLinkSync,
    ensureLink: link.createLink,
    ensureLinkSync: link.createLinkSync,
    // symlink
    createSymlink: symlink.createSymlink,
    createSymlinkSync: symlink.createSymlinkSync,
    ensureSymlink: symlink.createSymlink,
    ensureSymlinkSync: symlink.createSymlinkSync
  };
});

var require$$2$4 = index$19 && (typeof index$19 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$19)) === 'object' && 'default' in index$19 ? index$19['default'] : index$19;

var wrappy = __commonjs(function (module) {
  // Returns a wrapper function that returns a wrapped callback
  // The wrapper function should do some stuff, and return a
  // presumably different callback function.
  // This makes sure that own properties are retained, so that
  // decorations and such are not lost along the way.
  module.exports = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);

    if (typeof fn !== 'function') throw new TypeError('need wrapper function');

    Object.keys(fn).forEach(function (k) {
      wrapper[k] = fn[k];
    });

    return wrapper;

    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb = args[args.length - 1];
      if (typeof ret === 'function' && ret !== cb) {
        Object.keys(cb).forEach(function (k) {
          ret[k] = cb[k];
        });
      }
      return ret;
    }
  }
});

var require$$1$14 = wrappy && (typeof wrappy === 'undefined' ? 'undefined' : babelHelpers.typeof(wrappy)) === 'object' && 'default' in wrappy ? wrappy['default'] : wrappy;

var once = __commonjs(function (module) {
  var wrappy = require$$1$14;
  module.exports = wrappy(once);

  once.proto = once(function () {
    Object.defineProperty(Function.prototype, 'once', {
      value: function value() {
        return once(this);
      },
      configurable: true
    });
  });

  function once(fn) {
    var f = function f() {
      if (f.called) return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
});

var require$$0$17 = once && (typeof once === 'undefined' ? 'undefined' : babelHelpers.typeof(once)) === 'object' && 'default' in once ? once['default'] : once;

var inflight = __commonjs(function (module) {
  var wrappy = require$$1$14;
  var reqs = Object.create(null);
  var once = require$$0$17;

  module.exports = wrappy(inflight);

  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }

  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args);
      }
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len);
        process.nextTick(function () {
          RES.apply(null, args);
        });
      } else {
        delete reqs[key];
      }
    });
  }

  function slice(args) {
    var length = args.length;
    var array = [];

    for (var i = 0; i < length; i++) {
      array[i] = args[i];
    }return array;
  }
});

var require$$2$6 = inflight && (typeof inflight === 'undefined' ? 'undefined' : babelHelpers.typeof(inflight)) === 'object' && 'default' in inflight ? inflight['default'] : inflight;

var index$23 = __commonjs(function (module) {
  module.exports = balanced;
  function balanced(a, b, str) {
    var r = range(a, b, str);

    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }

  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;

    if (ai >= 0 && bi > 0) {
      begs = [];
      left = str.length;

      while (i < str.length && i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }

          bi = str.indexOf(b, i + 1);
        }

        i = ai < bi && ai >= 0 ? ai : bi;
      }

      if (begs.length) {
        result = [left, right];
      }
    }

    return result;
  }
});

var require$$0$20 = index$23 && (typeof index$23 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$23)) === 'object' && 'default' in index$23 ? index$23['default'] : index$23;

var index$24 = __commonjs(function (module) {
    module.exports = function (xs, fn) {
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            var x = fn(xs[i], i);
            if (isArray(x)) res.push.apply(res, x);else res.push(x);
        }
        return res;
    };

    var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
    };
});

var require$$1$15 = index$24 && (typeof index$24 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$24)) === 'object' && 'default' in index$24 ? index$24['default'] : index$24;

var index$22 = __commonjs(function (module) {
  var concatMap = require$$1$15;
  var balanced = require$$0$20;

  module.exports = expandTop;

  var escSlash = '\0SLASH' + Math.random() + '\0';
  var escOpen = '\0OPEN' + Math.random() + '\0';
  var escClose = '\0CLOSE' + Math.random() + '\0';
  var escComma = '\0COMMA' + Math.random() + '\0';
  var escPeriod = '\0PERIOD' + Math.random() + '\0';

  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }

  function escapeBraces(str) {
    return str.split('\\\\').join(escSlash).split('\\{').join(escOpen).split('\\}').join(escClose).split('\\,').join(escComma).split('\\.').join(escPeriod);
  }

  function unescapeBraces(str) {
    return str.split(escSlash).join('\\').split(escOpen).join('{').split(escClose).join('}').split(escComma).join(',').split(escPeriod).join('.');
  }

  // Basically just str.split(","), but handling cases
  // where we have nested braced sections, which should be
  // treated as individual members, like {a,{b,c},d}
  function parseCommaParts(str) {
    if (!str) return [''];

    var parts = [];
    var m = balanced('{', '}', str);

    if (!m) return str.split(',');

    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(',');

    p[p.length - 1] += '{' + body + '}';
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }

    parts.push.apply(parts, p);

    return parts;
  }

  function expandTop(str) {
    if (!str) return [];

    return expand(escapeBraces(str), true).map(unescapeBraces);
  }

  function identity(e) {
    return e;
  }

  function embrace(str) {
    return '{' + str + '}';
  }
  function isPadded(el) {
    return (/^-?0\d/.test(el)
    );
  }

  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }

  function expand(str, isTop) {
    var expansions = [];

    var m = balanced('{', '}', str);
    if (!m || /\$$/.test(m.pre)) return [str];

    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = /^(.*,)+(.+)?$/.test(m.body);
    if (!isSequence && !isOptions) {
      // {a},b}
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }

    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [''];
          return post.map(function (p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.

    // no need to expand pre, since it is guaranteed to be free of brace-sets
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [''];

    var N;

    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);

      N = [];

      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\') c = '';
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0) c = '-' + z + c.slice(1);else c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function (el) {
        return expand(el, false);
      });
    }

    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) expansions.push(expansion);
      }
    }

    return expansions;
  }
});

var require$$0$19 = index$22 && (typeof index$22 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$22)) === 'object' && 'default' in index$22 ? index$22['default'] : index$22;

var minimatch = __commonjs(function (module) {
  module.exports = minimatch;
  minimatch.Minimatch = Minimatch;

  var path = { sep: '/' };
  try {
    path = require$$2;
  } catch (er) {}

  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = require$$0$19;

  // any single thing other than /
  // don't need to escape / when using new RegExp()
  var qmark = '[^/]';

  // * => any number of characters
  var star = qmark + '*?';

  // ** when dots are allowed.  Anything goes, except .. and .
  // not (^ or / followed by one or two dots followed by $ or /),
  // followed by anything, any number of times.
  var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

  // not a ^ or / followed by a dot,
  // followed by anything, any number of times.
  var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

  // characters that need to be escaped in RegExp.
  var reSpecials = charSet('().*{}+?[]^$\\!');

  // "abc" -> { a:true, b:true, c:true }
  function charSet(s) {
    return s.split('').reduce(function (set, c) {
      set[c] = true;
      return set;
    }, {});
  }

  // normalizes slashes.
  var slashSplit = /\/+/;

  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function (p, i, list) {
      return minimatch(p, pattern, options);
    };
  }

  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function (k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function (k) {
      t[k] = a[k];
    });
    return t;
  }

  minimatch.defaults = function (def) {
    if (!def || !Object.keys(def).length) return minimatch;

    var orig = minimatch;

    var m = function minimatch(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };

    m.Minimatch = function Minimatch(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };

    return m;
  };

  Minimatch.defaults = function (def) {
    if (!def || !Object.keys(def).length) return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };

  function minimatch(p, pattern, options) {
    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};

    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      return false;
    }

    // "" only matches ""
    if (pattern.trim() === '') return p === '';

    return new Minimatch(pattern, options).match(p);
  }

  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }

    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};
    pattern = pattern.trim();

    // windows support: need to use /, not \
    if (path.sep !== '/') {
      pattern = pattern.split(path.sep).join('/');
    }

    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;

    // make the set of regexps etc.
    this.make();
  }

  Minimatch.prototype.debug = function () {};

  Minimatch.prototype.make = make;
  function make() {
    // don't do it more than once.
    if (this._made) return;

    var pattern = this.pattern;
    var options = this.options;

    // empty patterns and comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }

    // step 1: figure out negation, etc.
    this.parseNegate();

    // step 2: expand braces
    var set = this.globSet = this.braceExpand();

    if (options.debug) this.debug = console.error;

    this.debug(this.pattern, set);

    // step 3: now we have a set, so turn each one into a series of path-portion
    // matching patterns.
    // These will be regexps, except in the case of "**", which is
    // set to the GLOBSTAR object for globstar behavior,
    // and will not contain any / characters
    set = this.globParts = set.map(function (s) {
      return s.split(slashSplit);
    });

    this.debug(this.pattern, set);

    // glob --> regexps
    set = set.map(function (s, si, set) {
      return s.map(this.parse, this);
    }, this);

    this.debug(this.pattern, set);

    // filter out everything that didn't compile properly.
    set = set.filter(function (s) {
      return s.indexOf(false) === -1;
    });

    this.debug(this.pattern, set);

    this.set = set;
  }

  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;

    if (options.nonegate) return;

    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
      negate = !negate;
      negateOffset++;
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }

  // Brace expansion:
  // a{b,c}d -> abd acd
  // a{b,}c -> abc ac
  // a{0..3}d -> a0d a1d a2d a3d
  // a{b,c{d,e}f}g -> abg acdfg acefg
  // a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
  //
  // Invalid sets are not expanded.
  // a{2..}b -> a{2..}b
  // a{b}c -> a{b}c
  minimatch.braceExpand = function (pattern, options) {
    return braceExpand(pattern, options);
  };

  Minimatch.prototype.braceExpand = braceExpand;

  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }

    pattern = typeof pattern === 'undefined' ? this.pattern : pattern;

    if (typeof pattern === 'undefined') {
      throw new Error('undefined pattern');
    }

    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      // shortcut. no need to expand.
      return [pattern];
    }

    return expand(pattern);
  }

  // parse a component of the expanded set.
  // At this point, no pattern may contain "/" in it
  // so we're going to return a 2d array, where each entry is the full
  // pattern, split on '/', and then turned into a regular expression.
  // A regexp is made at the end which joins each array with an
  // escaped /, and another full one which joins each regexp with |.
  //
  // Following the lead of Bash 4.1, note that "**" only has special meaning
  // when it is the *only* thing in a path portion.  Otherwise, any series
  // of * is equivalent to a single *.  Globstar behavior is enabled by
  // default, and can be disabled by setting options.noglobstar.
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    var options = this.options;

    // shortcuts
    if (!options.noglobstar && pattern === '**') return GLOBSTAR;
    if (pattern === '') return '';

    var re = '';
    var hasMagic = !!options.nocase;
    var escaping = false;
    // ? => one single character
    var patternListStack = [];
    var negativeLists = [];
    var plType;
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    // . and .. never match anything that doesn't start with .,
    // even when options.dot is set.
    var patternStart = pattern.charAt(0) === '.' ? '' // anything
    // not (start or / followed by . or .. followed by / or end)
    : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
    var self = this;

    function clearStateChar() {
      if (stateChar) {
        // we had some state-tracking character
        // that wasn't consumed by this pass.
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
            break;
          case '?':
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += '\\' + stateChar;
            break;
        }
        self.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    }

    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c);

      // skip over any that are escaped.
      if (escaping && reSpecials[c]) {
        re += '\\' + c;
        escaping = false;
        continue;
      }

      switch (c) {
        case '/':
          // completely not allowed, even escaped.
          // Should already be path-split by now.
          return false;

        case '\\':
          clearStateChar();
          escaping = true;
          continue;

        // the various stateChar values
        // for the "extglob" stuff.
        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

          // all of those are literals inside a class, except that
          // the glob [!a] means [^a] in regexp
          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1) c = '^';
            re += c;
            continue;
          }

          // if we already have a stateChar, then it means
          // that there was something like ** or +? in there.
          // Handle the stateChar, then proceed with this one.
          self.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c;
          // if extglob is disabled, then +(asdf|foo) isn't a thing.
          // just clear the statechar *now*, rather than even diving into
          // the patternList stuff.
          if (options.noext) clearStateChar();
          continue;

        case '(':
          if (inClass) {
            re += '(';
            continue;
          }

          if (!stateChar) {
            re += '\\(';
            continue;
          }

          plType = stateChar;
          patternListStack.push({
            type: plType,
            start: i - 1,
            reStart: re.length
          });
          // negation is (?:(?!js)[^/]*)
          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
          continue;

        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue;
          }

          clearStateChar();
          hasMagic = true;
          re += ')';
          var pl = patternListStack.pop();
          plType = pl.type;
          // negation is (?:(?!js)[^/]*)
          // The others are (?:<pattern>)<type>
          switch (plType) {
            case '!':
              negativeLists.push(pl);
              re += ')[^/]*?)';
              pl.reEnd = re.length;
              break;
            case '?':
            case '+':
            case '*':
              re += plType;
              break;
            case '@':
              break; // the default anyway
          }
          continue;

        case '|':
          if (inClass || !patternListStack.length || escaping) {
            re += '\\|';
            escaping = false;
            continue;
          }

          clearStateChar();
          re += '|';
          continue;

        // these are mostly the same in regexp and glob
        case '[':
          // swallow any state-tracking char before the [
          clearStateChar();

          if (inClass) {
            re += '\\' + c;
            continue;
          }

          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;

        case ']':
          //  a right bracket shall lose its special
          //  meaning and represent itself in
          //  a bracket expression if it occurs
          //  first in the list.  -- POSIX.2 2.8.3.2
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            escaping = false;
            continue;
          }

          // handle the case where we left a class open.
          // "[z-a]" is valid, equivalent to "\[z-a\]"
          if (inClass) {
            // split where the last [ was, make sure we don't have
            // an invalid re. if so, re-walk the contents of the
            // would-be class to re-translate any characters that
            // were passed through as-is
            // TODO: It would probably be faster to determine this
            // without a try/catch and a new RegExp, but it's tricky
            // to do safely.  For now, this is safe and works.
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp('[' + cs + ']');
            } catch (er) {
              // not a valid class!
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }

          // finish up the class.
          hasMagic = true;
          inClass = false;
          re += c;
          continue;

        default:
          // swallow any state char that wasn't consumed
          clearStateChar();

          if (escaping) {
            // no need
            escaping = false;
          } else if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }

          re += c;

      } // switch
    } // for

    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"
    if (inClass) {
      // split where the last [ was, and escape it
      // this is a huge pita.  We now have to re-walk
      // the contents of the would-be class to re-translate
      // any characters that were passed through as-is
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    }

    // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + 3);
      // maybe some even number of \, then maybe 1 \, followed by a |
      tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function (_, $1, $2) {
        if (!$2) {
          // the | isn't already escaped, so escape it.
          $2 = '\\';
        }

        // need to escape all those slashes *again*, without escaping the
        // one that we need for escaping the | character.  As it works out,
        // escaping an even number of slashes can be done by simply repeating
        // it exactly after itself.  That's why this trick works.
        //
        // I am sorry that you have to see this.
        return $1 + $1 + $2 + '|';
      });

      this.debug('tail=%j\n   %s', tail, tail);
      var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;

      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    }

    // handle trailing things that only matter at the very end.
    clearStateChar();
    if (escaping) {
      // trailing \\
      re += '\\\\';
    }

    // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case '.':
      case '[':
      case '(':
        addPatternStart = true;
    }

    // Hack to work around lack of negative lookbehind in JS
    // A pattern like: *.!(x).!(y|z) needs to ensure that a name
    // like 'a.xyz.yz' doesn't match.  So, the first negative
    // lookahead, has to look ALL the way ahead, to the end of
    // the pattern.
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];

      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);

      nlLast += nlAfter;

      // Handle nested stuff like *(*.js|!(*.json)), where open parens
      // mean that we should *not* include the ) in the bit that is considered
      // "after" the negated section.
      var openParensBefore = nlBefore.split('(').length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
      }
      nlAfter = cleanAfter;

      var dollar = '';
      if (nlAfter === '' && isSub !== SUBPARSE) {
        dollar = '$';
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }

    // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.
    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }

    if (addPatternStart) {
      re = patternStart + re;
    }

    // parsing just a piece of a larger pattern.
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }

    // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.
    if (!hasMagic) {
      return globUnescape(pattern);
    }

    var flags = options.nocase ? 'i' : '';
    var regExp = new RegExp('^' + re + '$', flags);

    regExp._glob = pattern;
    regExp._src = re;

    return regExp;
  }

  minimatch.makeRe = function (pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };

  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;

    // at this point, this.set is a 2d array of partial
    // pattern strings, or "**".
    //
    // It's better to use .match().  This function shouldn't
    // be used, really, but it's pretty convenient sometimes,
    // when you just want to work with a regex.
    var set = this.set;

    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;

    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';

    var re = set.map(function (pattern) {
      return pattern.map(function (p) {
        return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
      }).join('\\\/');
    }).join('|');

    // must match entire pattern
    // ending in a * or ** will make it less strict.
    re = '^(?:' + re + ')$';

    // can match anything, as long as it's not this.
    if (this.negate) re = '^(?!' + re + ').*$';

    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }

  minimatch.match = function (list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function (f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };

  Minimatch.prototype.match = match;
  function match(f, partial) {
    this.debug('match', f, this.pattern);
    // short-circuit in the case of busted things.
    // comments, etc.
    if (this.comment) return false;
    if (this.empty) return f === '';

    if (f === '/' && partial) return true;

    var options = this.options;

    // windows: need to use /, not \
    if (path.sep !== '/') {
      f = f.split(path.sep).join('/');
    }

    // treat the test path as a set of pathparts.
    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f);

    // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.

    var set = this.set;
    this.debug(this.pattern, 'set', set);

    // Find the basename of the path by looking for the last non-empty segment
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break;
    }

    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) return true;
        return !this.negate;
      }
    }

    // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.
    if (options.flipNegate) return false;
    return this.negate;
  }

  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  Minimatch.prototype.matchOne = function (file, pattern, partial) {
    var options = this.options;

    this.debug('matchOne', { 'this': this, file: file, pattern: pattern });

    this.debug('matchOne', file.length, pattern.length);

    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];

      this.debug(pattern, p, f);

      // should be impossible.
      // some invalid regexp stuff in the set.
      if (p === false) return false;

      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]);

        // "**"
        // a/**/b/**/c would match the following:
        // a/b/x/y/z/c
        // a/x/y/z/b/c
        // a/b/x/b/x/c
        // a/b/c
        // To do this, take the rest of the pattern after
        // the **, and see if it would match the file remainder.
        // If so, return success.
        // If not, the ** "swallows" a segment, and try again.
        // This is recursively awful.
        //
        // a/**/b/**/c matching a/b/x/y/z/c
        // - a matches a
        // - doublestar
        //   - matchOne(b/x/y/z/c, b/**/c)
        //     - b matches b
        //     - doublestar
        //       - matchOne(x/y/z/c, c) -> no
        //       - matchOne(y/z/c, c) -> no
        //       - matchOne(z/c, c) -> no
        //       - matchOne(c, c) yes, hit
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug('** at the end');
          // a ** at the end will just swallow the rest.
          // We have found a match.
          // however, it will not swallow /.x, unless
          // options.dot is set.
          // . and .. are *never* matched by **, for explosively
          // exponential reasons.
          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' || !options.dot && file[fi].charAt(0) === '.') return false;
          }
          return true;
        }

        // ok, let's see if we can swallow whatever we can.
        while (fr < fl) {
          var swallowee = file[fr];

          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

          // XXX remove this slice.  Just pass the start index.
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee);
            // found a match.
            return true;
          } else {
            // can't swallow "." or ".." ever.
            // can only swallow ".foo" when explicitly asked.
            if (swallowee === '.' || swallowee === '..' || !options.dot && swallowee.charAt(0) === '.') {
              this.debug('dot detected!', file, fr, pattern, pr);
              break;
            }

            // ** swallows a segment, and continue.
            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        }

        // no match was found.
        // However, in partial mode, we can't say this is necessarily over.
        // If there's more *pattern* left, then
        if (partial) {
          // ran out of file
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl) return true;
        }
        return false;
      }

      // something other than **
      // non-magic patterns just have to match exactly
      // patterns with magic have been turned into regexps.
      var hit;
      if (typeof p === 'string') {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }

      if (!hit) return false;
    }

    // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*

    // now either we fell off the end of the pattern, or we're done.
    if (fi === fl && pi === pl) {
      // ran out of pattern and filename at the same time.
      // an exact hit!
      return true;
    } else if (fi === fl) {
      // ran out of file, but still had pattern left.
      // this is ok if we're doing the match as part of
      // a glob fs traversal.
      return partial;
    } else if (pi === pl) {
      // ran out of pattern, still have file left.
      // this is only acceptable if we're on the very last
      // empty segment of a file with a trailing slash.
      // a/* should match a/b/
      var emptyFileEnd = fi === fl - 1 && file[fi] === '';
      return emptyFileEnd;
    }

    // should be unreachable.
    throw new Error('wtf?');
  };

  // replace stuff like \* with *
  function globUnescape(s) {
    return s.replace(/\\(.)/g, '$1');
  }

  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
});

var require$$6$1 = minimatch && (typeof minimatch === 'undefined' ? 'undefined' : babelHelpers.typeof(minimatch)) === 'object' && 'default' in minimatch ? minimatch['default'] : minimatch;

var common$1 = __commonjs(function (module, exports) {
  exports.alphasort = alphasort;
  exports.alphasorti = alphasorti;
  exports.setopts = setopts;
  exports.ownProp = ownProp;
  exports.makeAbs = makeAbs;
  exports.finish = finish;
  exports.mark = mark;
  exports.isIgnored = isIgnored;
  exports.childrenIgnored = childrenIgnored;

  function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }

  var path = require$$2;
  var minimatch = require$$6$1;
  var isAbsolute = require$$1$7;
  var Minimatch = minimatch.Minimatch;

  function alphasorti(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }

  function alphasort(a, b) {
    return a.localeCompare(b);
  }

  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];

    if (!Array.isArray(self.ignore)) self.ignore = [self.ignore];

    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  }

  // ignore patterns are always in dot:true mode.
  function ignoreMap(pattern) {
    var gmatcher = null;
    if (pattern.slice(-3) === '/**') {
      var gpattern = pattern.replace(/(\/\*\*)+$/, '');
      gmatcher = new Minimatch(gpattern, { dot: true });
    }

    return {
      matcher: new Minimatch(pattern, { dot: true }),
      gmatcher: gmatcher
    };
  }

  function setopts(self, pattern, options) {
    if (!options) options = {};

    // base-matching: just use globstar for that.
    if (options.matchBase && -1 === pattern.indexOf("/")) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }
      pattern = "**/" + pattern;
    }

    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || Object.create(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir) self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;

    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || Object.create(null);
    self.statCache = options.statCache || Object.create(null);
    self.symlinks = options.symlinks || Object.create(null);

    setupIgnores(self, options);

    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp(options, "cwd")) self.cwd = cwd;else {
      self.cwd = path.resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }

    self.root = options.root || path.resolve(self.cwd, "/");
    self.root = path.resolve(self.root);
    if (process.platform === "win32") self.root = self.root.replace(/\\/g, "/");

    self.nomount = !!options.nomount;

    // disable comments and negation in Minimatch.
    // Note that they are not supported in Glob itself anyway.
    options.nonegate = true;
    options.nocomment = true;

    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }

  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);

    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];
      if (!matches || Object.keys(matches).length === 0) {
        if (self.nonull) {
          // do like the shell, and spit out the literal glob
          var literal = self.minimatch.globSet[i];
          if (nou) all.push(literal);else all[literal] = true;
        }
      } else {
        // had matches
        var m = Object.keys(matches);
        if (nou) all.push.apply(all, m);else m.forEach(function (m) {
          all[m] = true;
        });
      }
    }

    if (!nou) all = Object.keys(all);

    if (!self.nosort) all = all.sort(self.nocase ? alphasorti : alphasort);

    // at *some* point we statted all of these
    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }
      if (self.nodir) {
        all = all.filter(function (e) {
          return !/\/$/.test(e);
        });
      }
    }

    if (self.ignore.length) all = all.filter(function (m) {
      return !isIgnored(self, m);
    });

    self.found = all;
  }

  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;
    if (c) {
      var isDir = c === 'DIR' || Array.isArray(c);
      var slash = p.slice(-1) === '/';

      if (isDir && !slash) m += '/';else if (!isDir && slash) m = m.slice(0, -1);

      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }

    return m;
  }

  // lotta situps...
  function makeAbs(self, f) {
    var abs = f;
    if (f.charAt(0) === '/') {
      abs = path.join(self.root, f);
    } else if (isAbsolute(f) || f === '') {
      abs = f;
    } else if (self.changedCwd) {
      abs = path.resolve(self.cwd, f);
    } else {
      abs = path.resolve(f);
    }
    return abs;
  }

  // Return true, if pattern ends with globstar '**', for the accompanying parent directory.
  // Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
  function isIgnored(self, path) {
    if (!self.ignore.length) return false;

    return self.ignore.some(function (item) {
      return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
    });
  }

  function childrenIgnored(self, path) {
    if (!self.ignore.length) return false;

    return self.ignore.some(function (item) {
      return !!(item.gmatcher && item.gmatcher.match(path));
    });
  }
});

var require$$0$18 = common$1 && (typeof common$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(common$1)) === 'object' && 'default' in common$1 ? common$1['default'] : common$1;

var sync = __commonjs(function (module) {
  module.exports = globSync;
  globSync.GlobSync = GlobSync;

  var fs = require$$1;
  var minimatch = require$$6$1;
  var Minimatch = minimatch.Minimatch;
  var Glob = require$$5$2.Glob;
  var util = require$$1$1;
  var path = require$$2;
  var assert = require$$5;
  var isAbsolute = require$$1$7;
  var common = require$$0$18;
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;

  function globSync(pattern, options) {
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');

    return new GlobSync(pattern, options).found;
  }

  function GlobSync(pattern, options) {
    if (!pattern) throw new Error('must provide pattern');

    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');

    if (!(this instanceof GlobSync)) return new GlobSync(pattern, options);

    setopts(this, pattern, options);

    if (this.noprocess) return this;

    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }
    this._finish();
  }

  GlobSync.prototype._finish = function () {
    assert(this instanceof GlobSync);
    if (this.realpath) {
      var self = this;
      this.matches.forEach(function (matchset, index) {
        var set = self.matches[index] = Object.create(null);
        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = fs.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === 'stat') set[self._makeAbs(p)] = true;else throw er;
          }
        }
      });
    }
    common.finish(this);
  };

  GlobSync.prototype._process = function (pattern, index, inGlobStar) {
    assert(this instanceof GlobSync);

    // Get the first [n] parts of pattern that are all strings.
    var n = 0;
    while (typeof pattern[n] === 'string') {
      n++;
    }
    // now n is the index of the first one that is *not* a string.

    // See if there's anything else
    var prefix;
    switch (n) {
      // if not, then this is rather simple
      case pattern.length:
        this._processSimple(pattern.join('/'), index);
        return;

      case 0:
        // pattern *starts* with some non-trivial item.
        // going to readdir(cwd), but not include the prefix in matches.
        prefix = null;
        break;

      default:
        // pattern has some string bits in the front.
        // whatever it starts with, whether that's 'absolute' like /foo/bar,
        // or 'relative' like '../baz'
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n);

    // get the list of entries.
    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read);

    //if ignored, skip processing
    if (childrenIgnored(this, read)) return;

    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };

  GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);

    // if the abs isn't a dir, then nothing can match!
    if (!entries) return;

    // It will only match dot entries if it starts with a dot, or if
    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';

    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== '.' || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m) matchedEntries.push(e);
      }
    }

    var len = matchedEntries.length;
    // If there are no matched entries, then nothing matches.
    if (len === 0) return;

    // if this is the last remaining pattern bit, then no need for
    // an additional stat *unless* the user has specified mark or
    // stat explicitly.  We know they exist, since readdir returned
    // them.

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix.slice(-1) !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path.join(this.root, e);
        }
        this.matches[index][e] = true;
      }
      // This was the last one, and no stats were needed
      return;
    }

    // now test all matched entries as stand-ins for that part
    // of the pattern.
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) newPattern = [prefix, e];else newPattern = [e];
      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };

  GlobSync.prototype._emitMatch = function (index, e) {
    var abs = this._makeAbs(e);
    if (this.mark) e = this._mark(e);

    if (this.matches[index][e]) return;

    if (this.nodir) {
      var c = this.cache[this._makeAbs(e)];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    this.matches[index][e] = true;
    if (this.stat) this._stat(e);
  };

  GlobSync.prototype._readdirInGlobStar = function (abs) {
    // follow all symlinked directories forever
    // just proceed as if this is a non-globstar situation
    if (this.follow) return this._readdir(abs, false);

    var entries;
    var lstat;
    var stat;
    try {
      lstat = fs.lstatSync(abs);
    } catch (er) {
      // lstat failed, doesn't exist
      return null;
    }

    var isSym = lstat.isSymbolicLink();
    this.symlinks[abs] = isSym;

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && !lstat.isDirectory()) this.cache[abs] = 'FILE';else entries = this._readdir(abs, false);

    return entries;
  };

  GlobSync.prototype._readdir = function (abs, inGlobStar) {
    var entries;

    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs);

    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return null;

      if (Array.isArray(c)) return c;
    }

    try {
      return this._readdirEntries(abs, fs.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);
      return null;
    }
  };

  GlobSync.prototype._readdirEntries = function (abs, entries) {
    // if we haven't asked to stat everything, then just
    // assume that everything in there exists, so we can avoid
    // having to stat it a second time.
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries;

    // mark and cache dir-ness
    return entries;
  };

  GlobSync.prototype._readdirError = function (f, er) {
    // handle errors, and cache the information
    switch (er.code) {
      case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
      case 'ENOTDIR':
        // totally normal. means it *does* exist.
        this.cache[this._makeAbs(f)] = 'FILE';
        if (f === this.cwd) {
          var error = new Error(er.code + ' invalid cwd ' + f);
          error.path = f;
          error.code = er.code;
          throw error;
        }
        break;

      case 'ENOENT': // not terribly unusual
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        // some unusual error.  Treat as failure.
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) throw er;
        if (!this.silent) console.error('glob error', er);
        break;
    }
  };

  GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

    var entries = this._readdir(abs, inGlobStar);

    // no entries means not a dir, so it can never have matches
    // foo.txt/** doesn't match foo.txt
    if (!entries) return;

    // test without the globstar, and with every child both below
    // and replacing the globstar.
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    // the noGlobStar pattern exits the inGlobStar state
    this._process(noGlobStar, index, false);

    var len = entries.length;
    var isSym = this.symlinks[abs];

    // If it's a symlink, and we're in a globstar, then stop
    if (isSym && inGlobStar) return;

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;

      // these two cases enter the inGlobStar state
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true);

      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true);
    }
  };

  GlobSync.prototype._processSimple = function (prefix, index) {
    // XXX review this.  Shouldn't it be doing the mounting etc
    // before doing stat?  kinda weird?
    var exists = this._stat(prefix);

    if (!this.matches[index]) this.matches[index] = Object.create(null);

    // If it doesn't exist, then just mark the lack of results
    if (!exists) return;

    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === '/') {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    // Mark this as a match
    this.matches[index][prefix] = true;
  };

  // Returns either 'DIR', 'FILE', or false
  GlobSync.prototype._stat = function (f) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === '/';

    if (f.length > this.maxLength) return false;

    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];

      if (Array.isArray(c)) c = 'DIR';

      // It exists, but maybe not how we need it
      if (!needDir || c === 'DIR') return c;

      if (needDir && c === 'FILE') return false;

      // otherwise we have to stat, because maybe c=true
      // if we know it exists, but not what it is.
    }

    var exists;
    var stat = this.statCache[abs];
    if (!stat) {
      var lstat;
      try {
        lstat = fs.lstatSync(abs);
      } catch (er) {
        return false;
      }

      if (lstat.isSymbolicLink()) {
        try {
          stat = fs.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }

    this.statCache[abs] = stat;

    var c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;

    if (needDir && c !== 'DIR') return false;

    return c;
  };

  GlobSync.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  GlobSync.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };
});

var require$$4$4 = sync && (typeof sync === 'undefined' ? 'undefined' : babelHelpers.typeof(sync)) === 'object' && 'default' in sync ? sync['default'] : sync;

var inherits_browser = __commonjs(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function TempCtor() {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
});

var require$$9$1 = inherits_browser && (typeof inherits_browser === 'undefined' ? 'undefined' : babelHelpers.typeof(inherits_browser)) === 'object' && 'default' in inherits_browser ? inherits_browser['default'] : inherits_browser;

var glob = __commonjs(function (module) {
  // Approach:
  //
  // 1. Get the minimatch set
  // 2. For each pattern in the set, PROCESS(pattern, false)
  // 3. Store matches per-set, then uniq them
  //
  // PROCESS(pattern, inGlobStar)
  // Get the first [n] items from pattern that are all strings
  // Join these together.  This is PREFIX.
  //   If there is no more remaining, then stat(PREFIX) and
  //   add to matches if it succeeds.  END.
  //
  // If inGlobStar and PREFIX is symlink and points to dir
  //   set ENTRIES = []
  // else readdir(PREFIX) as ENTRIES
  //   If fail, END
  //
  // with ENTRIES
  //   If pattern[n] is GLOBSTAR
  //     // handle the case where the globstar match is empty
  //     // by pruning it out, and testing the resulting pattern
  //     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
  //     // handle other cases.
  //     for ENTRY in ENTRIES (not dotfiles)
  //       // attach globstar + tail onto the entry
  //       // Mark that this entry is a globstar match
  //       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
  //
  //   else // not globstar
  //     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
  //       Test ENTRY against pattern[n]
  //       If fails, continue
  //       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
  //
  // Caveat:
  //   Cache all stats and readdirs results to minimize syscall.  Since all
  //   we ever care about is existence and directory-ness, we can just keep
  //   `true` for files, and [children,...] for directories, or `false` for
  //   things that don't exist.

  module.exports = glob;

  var fs = require$$1;
  var minimatch = require$$6$1;
  var Minimatch = minimatch.Minimatch;
  var inherits = require$$9$1;
  var EE = require$$8.EventEmitter;
  var path = require$$2;
  var assert = require$$5;
  var isAbsolute = require$$1$7;
  var globSync = require$$4$4;
  var common = require$$0$18;
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var inflight = require$$2$6;
  var util = require$$1$1;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;

  var once = require$$0$17;

  function glob(pattern, options, cb) {
    if (typeof options === 'function') cb = options, options = {};
    if (!options) options = {};

    if (options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return globSync(pattern, options);
    }

    return new Glob(pattern, options, cb);
  }

  glob.sync = globSync;
  var GlobSync = glob.GlobSync = globSync.GlobSync;

  // old api surface
  glob.glob = glob;

  function extend(origin, add) {
    if (add === null || (typeof add === 'undefined' ? 'undefined' : babelHelpers.typeof(add)) !== 'object') {
      return origin;
    }

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }

  glob.hasMagic = function (pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;

    var g = new Glob(pattern, options);
    var set = g.minimatch.set;
    if (set.length > 1) return true;

    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== 'string') return true;
    }

    return false;
  };

  glob.Glob = Glob;
  inherits(Glob, EE);
  function Glob(pattern, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = null;
    }

    if (options && options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return new GlobSync(pattern, options);
    }

    if (!(this instanceof Glob)) return new Glob(pattern, options, cb);

    setopts(this, pattern, options);
    this._didRealPath = false;

    // process each pattern in the minimatch set
    var n = this.minimatch.set.length;

    // The matches are stored as {<filename>: true,...} so that
    // duplicates are automagically pruned.
    // Later, we do an Object.keys() on these.
    // Keep them as a list so we can fill in when nonull is set.
    this.matches = new Array(n);

    if (typeof cb === 'function') {
      cb = once(cb);
      this.on('error', cb);
      this.on('end', function (matches) {
        cb(null, matches);
      });
    }

    var self = this;
    var n = this.minimatch.set.length;
    this._processing = 0;
    this.matches = new Array(n);

    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;

    if (this.noprocess) return this;

    if (n === 0) return done();

    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }

    function done() {
      --self._processing;
      if (self._processing <= 0) self._finish();
    }
  }

  Glob.prototype._finish = function () {
    assert(this instanceof Glob);
    if (this.aborted) return;

    if (this.realpath && !this._didRealpath) return this._realpath();

    common.finish(this);
    this.emit('end', this.found);
  };

  Glob.prototype._realpath = function () {
    if (this._didRealpath) return;

    this._didRealpath = true;

    var n = this.matches.length;
    if (n === 0) return this._finish();

    var self = this;
    for (var i = 0; i < this.matches.length; i++) {
      this._realpathSet(i, next);
    }function next() {
      if (--n === 0) self._finish();
    }
  };

  Glob.prototype._realpathSet = function (index, cb) {
    var matchset = this.matches[index];
    if (!matchset) return cb();

    var found = Object.keys(matchset);
    var self = this;
    var n = found.length;

    if (n === 0) return cb();

    var set = this.matches[index] = Object.create(null);
    found.forEach(function (p, i) {
      // If there's a problem with the stat, then it means that
      // one or more of the links in the realpath couldn't be
      // resolved.  just return the abs value in that case.
      p = self._makeAbs(p);
      fs.realpath(p, self.realpathCache, function (er, real) {
        if (!er) set[real] = true;else if (er.syscall === 'stat') set[p] = true;else self.emit('error', er); // srsly wtf right here

        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };

  Glob.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  Glob.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };

  Glob.prototype.abort = function () {
    this.aborted = true;
    this.emit('abort');
  };

  Glob.prototype.pause = function () {
    if (!this.paused) {
      this.paused = true;
      this.emit('pause');
    }
  };

  Glob.prototype.resume = function () {
    if (this.paused) {
      this.emit('resume');
      this.paused = false;
      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];
          this._emitMatch(e[0], e[1]);
        }
      }
      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;
          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };

  Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
    assert(this instanceof Glob);
    assert(typeof cb === 'function');

    if (this.aborted) return;

    this._processing++;
    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);
      return;
    }

    //console.error('PROCESS %d', this._processing, pattern)

    // Get the first [n] parts of pattern that are all strings.
    var n = 0;
    while (typeof pattern[n] === 'string') {
      n++;
    }
    // now n is the index of the first one that is *not* a string.

    // see if there's anything else
    var prefix;
    switch (n) {
      // if not, then this is rather simple
      case pattern.length:
        this._processSimple(pattern.join('/'), index, cb);
        return;

      case 0:
        // pattern *starts* with some non-trivial item.
        // going to readdir(cwd), but not include the prefix in matches.
        prefix = null;
        break;

      default:
        // pattern has some string bits in the front.
        // whatever it starts with, whether that's 'absolute' like /foo/bar,
        // or 'relative' like '../baz'
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n);

    // get the list of entries.
    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read);

    //if ignored, skip _processing
    if (childrenIgnored(this, read)) return cb();

    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };

  Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function (er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

    // if the abs isn't a dir, then nothing can match!
    if (!entries) return cb();

    // It will only match dot entries if it starts with a dot, or if
    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';

    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== '.' || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m) matchedEntries.push(e);
      }
    }

    //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

    var len = matchedEntries.length;
    // If there are no matched entries, then nothing matches.
    if (len === 0) return cb();

    // if this is the last remaining pattern bit, then no need for
    // an additional stat *unless* the user has specified mark or
    // stat explicitly.  We know they exist, since readdir returned
    // them.

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      // This was the last one, and no stats were needed
      return cb();
    }

    // now test all matched entries as stand-ins for that part
    // of the pattern.
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) {
        if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
      }
      this._process([e].concat(remain), index, inGlobStar, cb);
    }
    cb();
  };

  Glob.prototype._emitMatch = function (index, e) {
    if (this.aborted) return;

    if (this.matches[index][e]) return;

    if (isIgnored(this, e)) return;

    if (this.paused) {
      this._emitQueue.push([index, e]);
      return;
    }

    var abs = this._makeAbs(e);

    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    if (this.mark) e = this._mark(e);

    this.matches[index][e] = true;

    var st = this.statCache[abs];
    if (st) this.emit('stat', e, st);

    this.emit('match', e);
  };

  Glob.prototype._readdirInGlobStar = function (abs, cb) {
    if (this.aborted) return;

    // follow all symlinked directories forever
    // just proceed as if this is a non-globstar situation
    if (this.follow) return this._readdir(abs, false, cb);

    var lstatkey = 'lstat\0' + abs;
    var self = this;
    var lstatcb = inflight(lstatkey, lstatcb_);

    if (lstatcb) fs.lstat(abs, lstatcb);

    function lstatcb_(er, lstat) {
      if (er) return cb();

      var isSym = lstat.isSymbolicLink();
      self.symlinks[abs] = isSym;

      // If it's not a symlink or a dir, then it's definitely a regular file.
      // don't bother doing a readdir in that case.
      if (!isSym && !lstat.isDirectory()) {
        self.cache[abs] = 'FILE';
        cb();
      } else self._readdir(abs, false, cb);
    }
  };

  Glob.prototype._readdir = function (abs, inGlobStar, cb) {
    if (this.aborted) return;

    cb = inflight('readdir\0' + abs + '\0' + inGlobStar, cb);
    if (!cb) return;

    //console.error('RD %j %j', +inGlobStar, abs)
    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);

    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return cb();

      if (Array.isArray(c)) return cb(null, c);
    }

    var self = this;
    fs.readdir(abs, readdirCb(this, abs, cb));
  };

  function readdirCb(self, abs, cb) {
    return function (er, entries) {
      if (er) self._readdirError(abs, er, cb);else self._readdirEntries(abs, entries, cb);
    };
  }

  Glob.prototype._readdirEntries = function (abs, entries, cb) {
    if (this.aborted) return;

    // if we haven't asked to stat everything, then just
    // assume that everything in there exists, so we can avoid
    // having to stat it a second time.
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries;
    return cb(null, entries);
  };

  Glob.prototype._readdirError = function (f, er, cb) {
    if (this.aborted) return;

    // handle errors, and cache the information
    switch (er.code) {
      case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
      case 'ENOTDIR':
        // totally normal. means it *does* exist.
        this.cache[this._makeAbs(f)] = 'FILE';
        if (f === this.cwd) {
          var error = new Error(er.code + ' invalid cwd ' + f);
          error.path = f;
          error.code = er.code;
          this.emit('error', error);
          this.abort();
        }
        break;

      case 'ENOENT': // not terribly unusual
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        // some unusual error.  Treat as failure.
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) {
          this.emit('error', er);
          // If the error is handled, then we abort
          // if not, we threw out of here
          this.abort();
        }
        if (!this.silent) console.error('glob error', er);
        break;
    }

    return cb();
  };

  Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function (er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    //console.error('pgs2', prefix, remain[0], entries)

    // no entries means not a dir, so it can never have matches
    // foo.txt/** doesn't match foo.txt
    if (!entries) return cb();

    // test without the globstar, and with every child both below
    // and replacing the globstar.
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    // the noGlobStar pattern exits the inGlobStar state
    this._process(noGlobStar, index, false, cb);

    var isSym = this.symlinks[abs];
    var len = entries.length;

    // If it's a symlink, and we're in a globstar, then stop
    if (isSym && inGlobStar) return cb();

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;

      // these two cases enter the inGlobStar state
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true, cb);

      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true, cb);
    }

    cb();
  };

  Glob.prototype._processSimple = function (prefix, index, cb) {
    // XXX review this.  Shouldn't it be doing the mounting etc
    // before doing stat?  kinda weird?
    var self = this;
    this._stat(prefix, function (er, exists) {
      self._processSimple2(prefix, index, er, exists, cb);
    });
  };
  Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

    //console.error('ps2', prefix, exists)

    if (!this.matches[index]) this.matches[index] = Object.create(null);

    // If it doesn't exist, then just mark the lack of results
    if (!exists) return cb();

    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === '/') {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    // Mark this as a match
    this._emitMatch(index, prefix);
    cb();
  };

  // Returns either 'DIR', 'FILE', or false
  Glob.prototype._stat = function (f, cb) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === '/';

    if (f.length > this.maxLength) return cb();

    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];

      if (Array.isArray(c)) c = 'DIR';

      // It exists, but maybe not how we need it
      if (!needDir || c === 'DIR') return cb(null, c);

      if (needDir && c === 'FILE') return cb();

      // otherwise we have to stat, because maybe c=true
      // if we know it exists, but not what it is.
    }

    var exists;
    var stat = this.statCache[abs];
    if (stat !== undefined) {
      if (stat === false) return cb(null, stat);else {
        var type = stat.isDirectory() ? 'DIR' : 'FILE';
        if (needDir && type === 'FILE') return cb();else return cb(null, type, stat);
      }
    }

    var self = this;
    var statcb = inflight('stat\0' + abs, lstatcb_);
    if (statcb) fs.lstat(abs, statcb);

    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        // If it's a symlink, then treat it as the target, unless
        // the target does not exist, then treat it as a file.
        return fs.stat(abs, function (er, stat) {
          if (er) self._stat2(f, abs, null, lstat, cb);else self._stat2(f, abs, er, stat, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };

  Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
    if (er) {
      this.statCache[abs] = false;
      return cb();
    }

    var needDir = f.slice(-1) === '/';
    this.statCache[abs] = stat;

    if (abs.slice(-1) === '/' && !stat.isDirectory()) return cb(null, false, stat);

    var c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;

    if (needDir && c !== 'DIR') return cb();

    return cb(null, c, stat);
  };
});

var require$$5$2 = glob && (typeof glob === 'undefined' ? 'undefined' : babelHelpers.typeof(glob)) === 'object' && 'default' in glob ? glob['default'] : glob;

var rimraf = __commonjs(function (module) {
  module.exports = rimraf;
  rimraf.sync = rimrafSync;

  var assert = require$$5;
  var path = require$$2;
  var fs = require$$1;
  var glob = require$$5$2;

  var defaultGlobOpts = {
    nosort: true,
    silent: true
  };

  // for EMFILE handling
  var timeout = 0;

  var isWindows = process.platform === "win32";

  function defaults(options) {
    var methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
    methods.forEach(function (m) {
      options[m] = options[m] || fs[m];
      m = m + 'Sync';
      options[m] = options[m] || fs[m];
    });

    options.maxBusyTries = options.maxBusyTries || 3;
    options.emfileWait = options.emfileWait || 1000;
    if (options.glob === false) {
      options.disableGlob = true;
    }
    options.disableGlob = options.disableGlob || false;
    options.glob = options.glob || defaultGlobOpts;
  }

  function rimraf(p, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    assert(p, 'rimraf: missing path');
    assert.equal(typeof p === 'undefined' ? 'undefined' : babelHelpers.typeof(p), 'string', 'rimraf: path should be a string');
    assert(options, 'rimraf: missing options');
    assert.equal(typeof options === 'undefined' ? 'undefined' : babelHelpers.typeof(options), 'object', 'rimraf: options should be object');
    assert.equal(typeof cb === 'undefined' ? 'undefined' : babelHelpers.typeof(cb), 'function', 'rimraf: callback function required');

    defaults(options);

    var busyTries = 0;
    var errState = null;
    var n = 0;

    if (options.disableGlob || !glob.hasMagic(p)) return afterGlob(null, [p]);

    fs.lstat(p, function (er, stat) {
      if (!er) return afterGlob(null, [p]);

      glob(p, options.glob, afterGlob);
    });

    function next(er) {
      errState = errState || er;
      if (--n === 0) cb(errState);
    }

    function afterGlob(er, results) {
      if (er) return cb(er);

      n = results.length;
      if (n === 0) return cb();

      results.forEach(function (p) {
        rimraf_(p, options, function CB(er) {
          if (er) {
            if (isWindows && (er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++;
              var time = busyTries * 100;
              // try again, with the same exact callback as this one.
              return setTimeout(function () {
                rimraf_(p, options, CB);
              }, time);
            }

            // this one won't happen if graceful-fs is used.
            if (er.code === "EMFILE" && timeout < options.emfileWait) {
              return setTimeout(function () {
                rimraf_(p, options, CB);
              }, timeout++);
            }

            // already gone
            if (er.code === "ENOENT") er = null;
          }

          timeout = 0;
          next(er);
        });
      });
    }
  }

  // Two possible strategies.
  // 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
  // 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
  //
  // Both result in an extra syscall when you guess wrong.  However, there
  // are likely far more normal files in the world than directories.  This
  // is based on the assumption that a the average number of files per
  // directory is >= 1.
  //
  // If anyone ever complains about this, then I guess the strategy could
  // be made configurable somehow.  But until then, YAGNI.
  function rimraf_(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');

    // sunos lets the root user unlink directories, which is... weird.
    // so we have to lstat here and make sure it's not a dir.
    options.lstat(p, function (er, st) {
      if (er && er.code === "ENOENT") return cb(null);

      if (st && st.isDirectory()) return rmdir(p, options, er, cb);

      options.unlink(p, function (er) {
        if (er) {
          if (er.code === "ENOENT") return cb(null);
          if (er.code === "EPERM") return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
          if (er.code === "EISDIR") return rmdir(p, options, er, cb);
        }
        return cb(er);
      });
    });
  }

  function fixWinEPERM(p, options, er, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');
    if (er) assert(er instanceof Error);

    options.chmod(p, 666, function (er2) {
      if (er2) cb(er2.code === "ENOENT" ? null : er);else options.stat(p, function (er3, stats) {
        if (er3) cb(er3.code === "ENOENT" ? null : er);else if (stats.isDirectory()) rmdir(p, options, er, cb);else options.unlink(p, cb);
      });
    });
  }

  function fixWinEPERMSync(p, options, er) {
    assert(p);
    assert(options);
    if (er) assert(er instanceof Error);

    try {
      options.chmodSync(p, 666);
    } catch (er2) {
      if (er2.code === "ENOENT") return;else throw er;
    }

    try {
      var stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT") return;else throw er;
    }

    if (stats.isDirectory()) rmdirSync(p, options, er);else options.unlinkSync(p);
  }

  function rmdir(p, options, originalEr, cb) {
    assert(p);
    assert(options);
    if (originalEr) assert(originalEr instanceof Error);
    assert(typeof cb === 'function');

    // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
    // if we guessed wrong, and it's not a directory, then
    // raise the original error.
    options.rmdir(p, function (er) {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options, cb);else if (er && er.code === "ENOTDIR") cb(originalEr);else cb(er);
    });
  }

  function rmkids(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');

    options.readdir(p, function (er, files) {
      if (er) return cb(er);
      var n = files.length;
      if (n === 0) return options.rmdir(p, cb);
      var errState;
      files.forEach(function (f) {
        rimraf(path.join(p, f), options, function (er) {
          if (errState) return;
          if (er) return cb(errState = er);
          if (--n === 0) options.rmdir(p, cb);
        });
      });
    });
  }

  // this looks simpler, and is strictly *faster*, but will
  // tie up the JavaScript thread and fail on excessively
  // deep directory trees.
  function rimrafSync(p, options) {
    options = options || {};
    defaults(options);

    assert(p, 'rimraf: missing path');
    assert.equal(typeof p === 'undefined' ? 'undefined' : babelHelpers.typeof(p), 'string', 'rimraf: path should be a string');
    assert(options, 'rimraf: missing options');
    assert.equal(typeof options === 'undefined' ? 'undefined' : babelHelpers.typeof(options), 'object', 'rimraf: options should be object');

    var results;

    if (options.disableGlob || !glob.hasMagic(p)) {
      results = [p];
    } else {
      try {
        fs.lstatSync(p);
        results = [p];
      } catch (er) {
        results = glob.sync(p, options.glob);
      }
    }

    if (!results.length) return;

    for (var i = 0; i < results.length; i++) {
      var p = results[i];

      try {
        var st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") return;
      }

      try {
        // sunos lets the root user unlink directories, which is... weird.
        if (st && st.isDirectory()) rmdirSync(p, options, null);else options.unlinkSync(p);
      } catch (er) {
        if (er.code === "ENOENT") return;
        if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        if (er.code !== "EISDIR") throw er;
        rmdirSync(p, options, er);
      }
    }
  }

  function rmdirSync(p, options, originalEr) {
    assert(p);
    assert(options);
    if (originalEr) assert(originalEr instanceof Error);

    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOENT") return;
      if (er.code === "ENOTDIR") throw originalEr;
      if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options);
    }
  }

  function rmkidsSync(p, options) {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach(function (f) {
      rimrafSync(path.join(p, f), options);
    });
    options.rmdirSync(p, options);
  }
});

var require$$1$13 = rimraf && (typeof rimraf === 'undefined' ? 'undefined' : babelHelpers.typeof(rimraf)) === 'object' && 'default' in rimraf ? rimraf['default'] : rimraf;

var index$21 = __commonjs(function (module) {
  var rimraf = require$$1$13;

  function removeSync(dir) {
    return rimraf.sync(dir);
  }

  function remove(dir, callback) {
    return callback ? rimraf(dir, callback) : rimraf(dir, function () {});
  }

  module.exports = {
    remove: remove,
    removeSync: removeSync
  };
});

var require$$0$16 = index$21 && (typeof index$21 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$21)) === 'object' && 'default' in index$21 ? index$21['default'] : index$21;

var index$20 = __commonjs(function (module) {
  var fs = require$$1;
  var path = require$$2;
  var mkdir = require$$0$12;
  var remove = require$$0$16;

  function emptyDir(dir, callback) {
    fs.readdir(dir, function (err, items) {
      if (err) return mkdir.mkdirs(dir, callback);

      items = items.map(function (item) {
        return path.join(dir, item);
      });

      deleteItem();

      function deleteItem() {
        var item = items.pop();
        if (!item) return callback();
        remove.remove(item, function (err) {
          if (err) return callback(err);
          deleteItem();
        });
      }
    });
  }

  function emptyDirSync(dir) {
    var items;
    try {
      items = fs.readdirSync(dir);
    } catch (err) {
      return mkdir.mkdirsSync(dir);
    }

    items.forEach(function (item) {
      item = path.join(dir, item);
      remove.removeSync(item);
    });
  }

  module.exports = {
    emptyDirSync: emptyDirSync,
    emptydirSync: emptyDirSync,
    emptyDir: emptyDir,
    emptydir: emptyDir
  };
});

var require$$3$5 = index$20 && (typeof index$20 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$20)) === 'object' && 'default' in index$20 ? index$20['default'] : index$20;

var createOutputStream$1 = __commonjs(function (module) {
  var path = require$$2;
  var fs = require$$1;
  var mkdir = require$$0$12;
  var WriteStream = fs.WriteStream;

  function createOutputStream(file, options) {
    var dirExists = false;
    var dir = path.dirname(file);
    options = options || {};

    // if fd is set with an actual number, file is created, hence directory is too
    if (options.fd) {
      return fs.createWriteStream(file, options);
    } else {
      // this hacks the WriteStream constructor from calling open()
      options.fd = -1;
    }

    var ws = new WriteStream(file, options);

    var oldOpen = ws.open;
    ws.open = function () {
      ws.fd = null; // set actual fd
      if (dirExists) return oldOpen.call(ws);

      // this only runs once on first write
      mkdir.mkdirs(dir, function (err) {
        if (err) {
          ws.destroy();
          ws.emit('error', err);
          return;
        }
        dirExists = true;
        oldOpen.call(ws);
      });
    };

    ws.open();

    return ws;
  }

  module.exports = createOutputStream;
});

var require$$0$21 = createOutputStream$1 && (typeof createOutputStream$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(createOutputStream$1)) === 'object' && 'default' in createOutputStream$1 ? createOutputStream$1['default'] : createOutputStream$1;

var index$25 = __commonjs(function (module) {
  module.exports = {
    createOutputStream: require$$0$21
  };
});

var require$$4$5 = index$25 && (typeof index$25 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$25)) === 'object' && 'default' in index$25 ? index$25['default'] : index$25;

var utimes = __commonjs(function (module) {
  var fs = require$$3$3;
  var path = require$$2;
  var os = require$$0;

  // HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
  function hasMillisResSync() {
    var tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2));
    tmpfile = path.join(os.tmpdir(), tmpfile);

    // 550 millis past UNIX epoch
    var d = new Date(1435410243862);
    fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141');
    var fd = fs.openSync(tmpfile, 'r+');
    fs.futimesSync(fd, d, d);
    fs.closeSync(fd);
    return fs.statSync(tmpfile).mtime > 1435410243000;
  }

  function hasMillisRes(callback) {
    var tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2));
    tmpfile = path.join(os.tmpdir(), tmpfile);

    // 550 millis past UNIX epoch
    var d = new Date(1435410243862);
    fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', function (err) {
      if (err) return callback(err);
      fs.open(tmpfile, 'r+', function (err, fd) {
        if (err) return callback(err);
        fs.futimes(fd, d, d, function (err) {
          if (err) return callback(err);
          fs.close(fd, function (err) {
            if (err) return callback(err);
            fs.stat(tmpfile, function (err, stats) {
              if (err) return callback(err);
              callback(null, stats.mtime > 1435410243000);
            });
          });
        });
      });
    });
  }

  function timeRemoveMillis(timestamp) {
    if (typeof timestamp === 'number') {
      return Math.floor(timestamp / 1000) * 1000;
    } else if (timestamp instanceof Date) {
      return new Date(Math.floor(timestamp.getTime() / 1000) * 1000);
    } else {
      throw new Error('fs-extra: timeRemoveMillis() unknown parameter type');
    }
  }

  function utimesMillis(path, atime, mtime, callback) {
    // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
    fs.open(path, 'r+', function (err, fd) {
      if (err) return callback(err);
      fs.futimes(fd, atime, mtime, function (err) {
        if (err) return callback(err);
        fs.close(fd, callback);
      });
    });
  }

  module.exports = {
    hasMillisRes: hasMillisRes,
    hasMillisResSync: hasMillisResSync,
    timeRemoveMillis: timeRemoveMillis,
    utimesMillis: utimesMillis
  };
});

var require$$0$22 = utimes && (typeof utimes === 'undefined' ? 'undefined' : babelHelpers.typeof(utimes)) === 'object' && 'default' in utimes ? utimes['default'] : utimes;

var ncp = __commonjs(function (module) {
  // imported from ncp (this is temporary, will rewrite)

  var fs = require$$3$3;
  var path = require$$2;
  var utimes = require$$0$22;

  function ncp(source, dest, options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    }

    var basePath = process.cwd();
    var currentPath = path.resolve(basePath, source);
    var targetPath = path.resolve(basePath, dest);

    var filter = options.filter;
    var transform = options.transform;
    var clobber = options.clobber !== false;
    var dereference = options.dereference;
    var preserveTimestamps = options.preserveTimestamps === true;

    var errs = null;

    var started = 0;
    var finished = 0;
    var running = 0;
    // this is pretty useless now that we're using graceful-fs
    // consider removing
    var limit = options.limit || 512;

    startCopy(currentPath);

    function startCopy(source) {
      started++;
      if (filter) {
        if (filter instanceof RegExp) {
          if (!filter.test(source)) {
            return doneOne(true);
          }
        } else if (typeof filter === 'function') {
          if (!filter(source)) {
            return doneOne(true);
          }
        }
      }
      return getStats(source);
    }

    function getStats(source) {
      var stat = dereference ? fs.stat : fs.lstat;
      if (running >= limit) {
        return setImmediate(function () {
          getStats(source);
        });
      }
      running++;
      stat(source, function (err, stats) {
        if (err) return onError(err);

        // We need to get the mode from the stats object and preserve it.
        var item = {
          name: source,
          mode: stats.mode,
          mtime: stats.mtime, // modified time
          atime: stats.atime, // access time
          stats: stats // temporary
        };

        if (stats.isDirectory()) {
          return onDir(item);
        } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
          return onFile(item);
        } else if (stats.isSymbolicLink()) {
          // Symlinks don't really need to know about the mode.
          return onLink(source);
        }
      });
    }

    function onFile(file) {
      var target = file.name.replace(currentPath, targetPath);
      isWritable(target, function (writable) {
        if (writable) {
          copyFile(file, target);
        } else {
          if (clobber) {
            rmFile(target, function () {
              copyFile(file, target);
            });
          } else {
            doneOne();
          }
        }
      });
    }

    function copyFile(file, target) {
      var readStream = fs.createReadStream(file.name);
      var writeStream = fs.createWriteStream(target, { mode: file.mode });

      readStream.on('error', onError);
      writeStream.on('error', onError);

      if (transform) {
        transform(readStream, writeStream, file);
      } else {
        writeStream.on('open', function () {
          readStream.pipe(writeStream);
        });
      }

      writeStream.once('finish', function () {
        fs.chmod(target, file.mode, function (err) {
          if (err) return onError(err);
          if (preserveTimestamps) {
            utimes.utimesMillis(target, file.atime, file.mtime, function (err) {
              if (err) return onError(err);
              return doneOne();
            });
          } else {
            doneOne();
          }
        });
      });
    }

    function rmFile(file, done) {
      fs.unlink(file, function (err) {
        if (err) return onError(err);
        return done();
      });
    }

    function onDir(dir) {
      var target = dir.name.replace(currentPath, targetPath);
      isWritable(target, function (writable) {
        if (writable) {
          return mkDir(dir, target);
        }
        copyDir(dir.name);
      });
    }

    function mkDir(dir, target) {
      fs.mkdir(target, dir.mode, function (err) {
        if (err) return onError(err);
        // despite setting mode in fs.mkdir, doesn't seem to work
        // so we set it here.
        fs.chmod(target, dir.mode, function (err) {
          if (err) return onError(err);
          copyDir(dir.name);
        });
      });
    }

    function copyDir(dir) {
      fs.readdir(dir, function (err, items) {
        if (err) return onError(err);
        items.forEach(function (item) {
          startCopy(path.join(dir, item));
        });
        return doneOne();
      });
    }

    function onLink(link) {
      var target = link.replace(currentPath, targetPath);
      fs.readlink(link, function (err, resolvedPath) {
        if (err) return onError(err);
        checkLink(resolvedPath, target);
      });
    }

    function checkLink(resolvedPath, target) {
      if (dereference) {
        resolvedPath = path.resolve(basePath, resolvedPath);
      }
      isWritable(target, function (writable) {
        if (writable) {
          return makeLink(resolvedPath, target);
        }
        fs.readlink(target, function (err, targetDest) {
          if (err) return onError(err);

          if (dereference) {
            targetDest = path.resolve(basePath, targetDest);
          }
          if (targetDest === resolvedPath) {
            return doneOne();
          }
          return rmFile(target, function () {
            makeLink(resolvedPath, target);
          });
        });
      });
    }

    function makeLink(linkPath, target) {
      fs.symlink(linkPath, target, function (err) {
        if (err) return onError(err);
        return doneOne();
      });
    }

    function isWritable(path, done) {
      fs.lstat(path, function (err) {
        if (err) {
          if (err.code === 'ENOENT') return done(true);
          return done(false);
        }
        return done(false);
      });
    }

    function onError(err) {
      if (options.stopOnError) {
        return callback(err);
      } else if (!errs && options.errs) {
        errs = fs.createWriteStream(options.errs);
      } else if (!errs) {
        errs = [];
      }
      if (typeof errs.write === 'undefined') {
        errs.push(err);
      } else {
        errs.write(err.stack + '\n\n');
      }
      return doneOne();
    }

    function doneOne(skipped) {
      if (!skipped) running--;
      finished++;
      if (started === finished && running === 0) {
        if (callback !== undefined) {
          return errs ? callback(errs) : callback(null);
        }
      }
    }
  }

  module.exports = ncp;
});

var require$$1$16 = ncp && (typeof ncp === 'undefined' ? 'undefined' : babelHelpers.typeof(ncp)) === 'object' && 'default' in ncp ? ncp['default'] : ncp;

var index$26 = __commonjs(function (module) {
  // most of this code was written by Andrew Kelley
  // licensed under the BSD license: see
  // https://github.com/andrewrk/node-mv/blob/master/package.json

  // this needs a cleanup

  var fs = require$$3$3;
  var ncp = require$$1$16;
  var path = require$$2;
  var rimraf = require$$1$13;
  var mkdirp = require$$0$12.mkdirs;

  function mv(source, dest, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    var shouldMkdirp = 'mkdirp' in options ? options.mkdirp : true;
    var clobber = 'clobber' in options ? options.clobber : false;

    var limit = options.limit || 16;

    if (shouldMkdirp) {
      mkdirs();
    } else {
      doRename();
    }

    function mkdirs() {
      mkdirp(path.dirname(dest), function (err) {
        if (err) return callback(err);
        doRename();
      });
    }

    function doRename() {
      if (clobber) {
        fs.rename(source, dest, function (err) {
          if (!err) return callback();

          if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
            rimraf(dest, function (err) {
              if (err) return callback(err);
              options.clobber = false; // just clobbered it, no need to do it again
              mv(source, dest, options, callback);
            });
            return;
          }

          // weird Windows shit
          if (err.code === 'EPERM') {
            setTimeout(function () {
              rimraf(dest, function (err) {
                if (err) return callback(err);
                options.clobber = false;
                mv(source, dest, options, callback);
              });
            }, 200);
            return;
          }

          if (err.code !== 'EXDEV') return callback(err);
          moveAcrossDevice(source, dest, clobber, limit, callback);
        });
      } else {
        fs.link(source, dest, function (err) {
          if (err) {
            if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM') {
              moveAcrossDevice(source, dest, clobber, limit, callback);
              return;
            }
            callback(err);
            return;
          }
          fs.unlink(source, callback);
        });
      }
    }
  }

  function moveAcrossDevice(source, dest, clobber, limit, callback) {
    fs.stat(source, function (err, stat) {
      if (err) {
        callback(err);
        return;
      }

      if (stat.isDirectory()) {
        moveDirAcrossDevice(source, dest, clobber, limit, callback);
      } else {
        moveFileAcrossDevice(source, dest, clobber, limit, callback);
      }
    });
  }

  function moveFileAcrossDevice(source, dest, clobber, limit, callback) {
    var outFlags = clobber ? 'w' : 'wx';
    var ins = fs.createReadStream(source);
    var outs = fs.createWriteStream(dest, { flags: outFlags });

    ins.on('error', function (err) {
      ins.destroy();
      outs.destroy();
      outs.removeListener('close', onClose);

      // may want to create a directory but `out` line above
      // creates an empty file for us: See #108
      // don't care about error here
      fs.unlink(dest, function () {
        // note: `err` here is from the input stream errror
        if (err.code === 'EISDIR' || err.code === 'EPERM') {
          moveDirAcrossDevice(source, dest, clobber, limit, callback);
        } else {
          callback(err);
        }
      });
    });

    outs.on('error', function (err) {
      ins.destroy();
      outs.destroy();
      outs.removeListener('close', onClose);
      callback(err);
    });

    outs.once('close', onClose);
    ins.pipe(outs);

    function onClose() {
      fs.unlink(source, callback);
    }
  }

  function moveDirAcrossDevice(source, dest, clobber, limit, callback) {
    var options = {
      stopOnErr: true,
      clobber: false,
      limit: limit
    };

    function startNcp() {
      ncp(source, dest, options, function (errList) {
        if (errList) return callback(errList[0]);
        rimraf(source, callback);
      });
    }

    if (clobber) {
      rimraf(dest, function (err) {
        if (err) return callback(err);
        startNcp();
      });
    } else {
      startNcp();
    }
  }

  module.exports = {
    move: mv
  };
});

var require$$5$3 = index$26 && (typeof index$26 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$26)) === 'object' && 'default' in index$26 ? index$26['default'] : index$26;

var index$28 = __commonjs(function (module) {
  var fs = require$$1;

  function readFile(file, options, callback) {
    if (callback == null) {
      callback = options;
      options = {};
    }

    fs.readFile(file, options, function (err, data) {
      if (err) return callback(err);

      var obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err2) {
        err2.message = file + ': ' + err2.message;
        return callback(err2);
      }

      callback(null, obj);
    });
  }

  function readFileSync(file, options) {
    options = options || {};
    if (typeof options === 'string') {
      options = { encoding: options };
    }

    var shouldThrow = 'throws' in options ? options.throws : true;
    var content = fs.readFileSync(file, options);

    try {
      return JSON.parse(content, options.reviver);
    } catch (err) {
      if (shouldThrow) {
        err.message = file + ': ' + err.message;
        throw err;
      } else {
        return null;
      }
    }
  }

  function writeFile(file, obj, options, callback) {
    if (callback == null) {
      callback = options;
      options = {};
    }

    var spaces = (typeof options === 'undefined' ? 'undefined' : babelHelpers.typeof(options)) === 'object' && options !== null ? 'spaces' in options ? options.spaces : this.spaces : this.spaces;

    var str = '';
    try {
      str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n';
    } catch (err) {
      if (callback) return callback(err, null);
    }

    fs.writeFile(file, str, options, callback);
  }

  function writeFileSync(file, obj, options) {
    options = options || {};

    var spaces = (typeof options === 'undefined' ? 'undefined' : babelHelpers.typeof(options)) === 'object' && options !== null ? 'spaces' in options ? options.spaces : this.spaces : this.spaces;

    var str = JSON.stringify(obj, options.replacer, spaces) + '\n';
    // not sure if fs.writeFileSync returns anything, but just in case
    return fs.writeFileSync(file, str, options);
  }

  var jsonfile = {
    spaces: null,
    readFile: readFile,
    readFileSync: readFileSync,
    writeFile: writeFile,
    writeFileSync: writeFileSync
  };

  module.exports = jsonfile;
});

var require$$0$24 = index$28 && (typeof index$28 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$28)) === 'object' && 'default' in index$28 ? index$28['default'] : index$28;

var jsonfile$1 = __commonjs(function (module) {
  var jsonFile = require$$0$24;

  module.exports = {
    // jsonfile exports
    readJson: jsonFile.readFile,
    readJSON: jsonFile.readFile,
    readJsonSync: jsonFile.readFileSync,
    readJSONSync: jsonFile.readFileSync,
    writeJson: jsonFile.writeFile,
    writeJSON: jsonFile.writeFile,
    writeJsonSync: jsonFile.writeFileSync,
    writeJSONSync: jsonFile.writeFileSync,
    spaces: 2 // default in fs-extra
  };
});

var require$$1$17 = jsonfile$1 && (typeof jsonfile$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(jsonfile$1)) === 'object' && 'default' in jsonfile$1 ? jsonfile$1['default'] : jsonfile$1;

var outputJson = __commonjs(function (module) {
  var fs = require$$3$3;
  var path = require$$2;
  var jsonFile = require$$1$17;
  var mkdir = require$$0$12;

  function outputJson(file, data, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    var dir = path.dirname(file);

    fs.exists(dir, function (itDoes) {
      if (itDoes) return jsonFile.writeJson(file, data, options, callback);

      mkdir.mkdirs(dir, function (err) {
        if (err) return callback(err);
        jsonFile.writeJson(file, data, options, callback);
      });
    });
  }

  module.exports = outputJson;
});

var require$$0$23 = outputJson && (typeof outputJson === 'undefined' ? 'undefined' : babelHelpers.typeof(outputJson)) === 'object' && 'default' in outputJson ? outputJson['default'] : outputJson;

var outputJsonSync = __commonjs(function (module) {
  var fs = require$$3$3;
  var path = require$$2;
  var jsonFile = require$$1$17;
  var mkdir = require$$0$12;

  function outputJsonSync(file, data, options) {
    var dir = path.dirname(file);

    if (!fs.existsSync(dir)) {
      mkdir.mkdirsSync(dir);
    }

    jsonFile.writeJsonSync(file, data, options);
  }

  module.exports = outputJsonSync;
});

var require$$1$18 = outputJsonSync && (typeof outputJsonSync === 'undefined' ? 'undefined' : babelHelpers.typeof(outputJsonSync)) === 'object' && 'default' in outputJsonSync ? outputJsonSync['default'] : outputJsonSync;

var index$27 = __commonjs(function (module) {
  var jsonFile = require$$1$17;

  jsonFile.outputJsonSync = require$$1$18;
  jsonFile.outputJson = require$$0$23;
  // aliases
  jsonFile.outputJSONSync = require$$1$18;
  jsonFile.outputJSON = require$$0$23;

  module.exports = jsonFile;
});

var require$$6$2 = index$27 && (typeof index$27 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$27)) === 'object' && 'default' in index$27 ? index$27['default'] : index$27;

var copyFileSync = __commonjs(function (module) {
  var fs = require$$3$3;

  var BUF_LENGTH = 64 * 1024;
  var _buff = new Buffer(BUF_LENGTH);

  function copyFileSync(srcFile, destFile, options) {
    var clobber = options.clobber;
    var preserveTimestamps = options.preserveTimestamps;

    if (fs.existsSync(destFile)) {
      if (clobber) {
        fs.chmodSync(destFile, parseInt('777', 8));
        fs.unlinkSync(destFile);
      } else {
        throw Error('EEXIST');
      }
    }

    var fdr = fs.openSync(srcFile, 'r');
    var stat = fs.fstatSync(fdr);
    var fdw = fs.openSync(destFile, 'w', stat.mode);
    var bytesRead = 1;
    var pos = 0;

    while (bytesRead > 0) {
      bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
      fs.writeSync(fdw, _buff, 0, bytesRead);
      pos += bytesRead;
    }

    if (preserveTimestamps) {
      fs.futimesSync(fdw, stat.atime, stat.mtime);
    }

    fs.closeSync(fdr);
    fs.closeSync(fdw);
  }

  module.exports = copyFileSync;
});

var require$$1$19 = copyFileSync && (typeof copyFileSync === 'undefined' ? 'undefined' : babelHelpers.typeof(copyFileSync)) === 'object' && 'default' in copyFileSync ? copyFileSync['default'] : copyFileSync;

var copySync$1 = __commonjs(function (module) {
  var fs = require$$3$3;
  var path = require$$2;
  var copyFileSync = require$$1$19;
  var mkdir = require$$0$12;

  function copySync(src, dest, options) {
    if (typeof options === 'function' || options instanceof RegExp) {
      options = { filter: options };
    }

    options = options || {};
    options.recursive = !!options.recursive;

    // default to true for now
    options.clobber = 'clobber' in options ? !!options.clobber : true;
    options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false;

    options.filter = options.filter || function () {
      return true;
    };

    var stats = options.recursive ? fs.lstatSync(src) : fs.statSync(src);
    var destFolder = path.dirname(dest);
    var destFolderExists = fs.existsSync(destFolder);
    var performCopy = false;

    if (stats.isFile()) {
      if (options.filter instanceof RegExp) performCopy = options.filter.test(src);else if (typeof options.filter === 'function') performCopy = options.filter(src);

      if (performCopy) {
        if (!destFolderExists) mkdir.mkdirsSync(destFolder);
        copyFileSync(src, dest, { clobber: options.clobber, preserveTimestamps: options.preserveTimestamps });
      }
    } else if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest);
      var contents = fs.readdirSync(src);
      contents.forEach(function (content) {
        var opts = options;
        opts.recursive = true;
        copySync(path.join(src, content), path.join(dest, content), opts);
      });
    } else if (options.recursive && stats.isSymbolicLink()) {
      var srcPath = fs.readlinkSync(src);
      fs.symlinkSync(srcPath, dest);
    }
  }

  module.exports = copySync;
});

var require$$0$25 = copySync$1 && (typeof copySync$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(copySync$1)) === 'object' && 'default' in copySync$1 ? copySync$1['default'] : copySync$1;

var index$29 = __commonjs(function (module) {
  module.exports = {
    copySync: require$$0$25
  };
});

var require$$9$2 = index$29 && (typeof index$29 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$29)) === 'object' && 'default' in index$29 ? index$29['default'] : index$29;

var copy$1 = __commonjs(function (module) {
  var fs = require$$3$3;
  var path = require$$2;
  var ncp = require$$1$16;
  var mkdir = require$$0$12;

  function copy(src, dest, options, callback) {
    if (typeof options === 'function' && !callback) {
      callback = options;
      options = {};
    } else if (typeof options === 'function' || options instanceof RegExp) {
      options = { filter: options };
    }
    callback = callback || function () {};
    options = options || {};

    fs.lstat(src, function (err, stats) {
      if (err) return callback(err);

      var dir = null;
      if (stats.isDirectory()) {
        var parts = dest.split(path.sep);
        parts.pop();
        dir = parts.join(path.sep);
      } else {
        dir = path.dirname(dest);
      }

      fs.exists(dir, function (dirExists) {
        if (dirExists) return ncp(src, dest, options, callback);
        mkdir.mkdirs(dir, function (err) {
          if (err) return callback(err);
          ncp(src, dest, options, callback);
        });
      });
    });
  }

  module.exports = copy;
});

var require$$0$26 = copy$1 && (typeof copy$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(copy$1)) === 'object' && 'default' in copy$1 ? copy$1['default'] : copy$1;

var index$30 = __commonjs(function (module) {
  module.exports = {
    copy: require$$0$26
  };
});

var require$$10$1 = index$30 && (typeof index$30 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$30)) === 'object' && 'default' in index$30 ? index$30['default'] : index$30;

var assign$1 = __commonjs(function (module) {
  // simple mutable assign
  function assign() {
    var args = [].slice.call(arguments).filter(function (i) {
      return i;
    });
    var dest = args.shift();
    args.forEach(function (src) {
      Object.keys(src).forEach(function (key) {
        dest[key] = src[key];
      });
    });

    return dest;
  }

  module.exports = assign;
});

var require$$12$1 = assign$1 && (typeof assign$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(assign$1)) === 'object' && 'default' in assign$1 ? assign$1['default'] : assign$1;

var index$14 = __commonjs(function (module) {
  var assign = require$$12$1;

  var fse = {};
  var gfs = require$$3$3;

  // attach fs methods to fse
  Object.keys(gfs).forEach(function (key) {
    fse[key] = gfs[key];
  });

  var fs = fse;

  assign(fs, require$$10$1);
  assign(fs, require$$9$2);
  assign(fs, require$$0$12);
  assign(fs, require$$0$16);
  assign(fs, require$$6$2);
  assign(fs, require$$5$3);
  assign(fs, require$$4$5);
  assign(fs, require$$3$5);
  assign(fs, require$$2$4);
  assign(fs, require$$1$8);
  assign(fs, require$$0$9);

  module.exports = fs;

  // maintain backwards compatibility for awhile
  var jsonfile = {};
  Object.defineProperty(jsonfile, 'spaces', {
    get: function get() {
      return fs.spaces; // found in ./json
    },
    set: function set(val) {
      fs.spaces = val;
    }
  });

  module.exports.jsonfile = jsonfile; // so users of fs-extra can modify jsonFile.spaces
});

var fs = index$14 && (typeof index$14 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$14)) === 'object' && 'default' in index$14 ? index$14['default'] : index$14;

var Default$4 = {};

var Npm = function (_BaseSourced) {
  babelHelpers.inherits(Npm, _BaseSourced);

  function Npm() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    babelHelpers.classCallCheck(this, Npm);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Npm).call(this, extend(true, {}, Default$4, config)));

    _this.sourceGit = new Git({ cwd: _this.config.sourceCwd, debug: _this.config.debug, sensitive: _this.config.sensitive });
    return _this;
  }

  babelHelpers.createClass(Npm, [{
    key: 'publish',
    value: function publish() {
      if (!this.hasPackage()) {
        return;
      }

      this.exec('npm publish');
    }
  }, {
    key: 'bump',
    value: function bump() {
      if (!this.hasPackage()) {
        return;
      }

      if (!this.config.versionBump) {
        return;
      }

      this.sourceGit.ensureCommitted();

      var fromVersion = this.package().version;
      this.exec('npm --no-git-tag-version version ' + this.config.versionBump);
      this._package = null;

      var toVersion = this.package().version;
      this.sourceGit.add('package.json');
      this.sourceGit.commit('Bumped version from ' + fromVersion + ' to ' + toVersion);
    }
  }, {
    key: 'package',
    value: function _package() {
      if (this._package) {
        return this._package;
      } else {
        return this._package = this.readPackage();
      }
    }
  }, {
    key: 'packageFile',
    value: function packageFile() {
      return require$$2.join(this.config.sourceCwd, 'package.json');
    }
  }, {
    key: 'hasPackage',
    value: function hasPackage() {
      var file = this.packageFile();
      if (shelljs.test('-f', file, { silent: true })) {
        this.debug('Found package.json at ' + file);
        return true;
      } else {
        this.debug('package.json not found at ' + file);
        return false;
      }
    }
  }, {
    key: 'readPackage',
    value: function readPackage() {
      if (this.hasPackage()) {
        return JSON.parse(fs.readFileSync(this.packageFile(), 'utf8'));
      } else {
        return null;
      }
    }
  }]);
  return Npm;
}(BaseSourced);

var encode$1 = __commonjs(function (module) {
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  'use strict';

  var stringifyPrimitive = function stringifyPrimitive(v) {
    switch (typeof v === 'undefined' ? 'undefined' : babelHelpers.typeof(v)) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  };

  module.exports = function (obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if ((typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj)) === 'object') {
      return Object.keys(obj).map(function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function (v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);
    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  };
});

var require$$0$28 = encode$1 && (typeof encode$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(encode$1)) === 'object' && 'default' in encode$1 ? encode$1['default'] : encode$1;

var decode$1 = __commonjs(function (module) {
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  'use strict';

  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707

  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  module.exports = function (qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr,
          vstr,
          k,
          v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };
});

var require$$1$20 = decode$1 && (typeof decode$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(decode$1)) === 'object' && 'default' in decode$1 ? decode$1['default'] : decode$1;

var index$31 = __commonjs(function (module, exports) {
  'use strict';

  exports.decode = exports.parse = require$$1$20;
  exports.encode = exports.stringify = require$$0$28;
});

var require$$0$27 = index$31 && (typeof index$31 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$31)) === 'object' && 'default' in index$31 ? index$31['default'] : index$31;

var util = __commonjs(function (module) {
  'use strict';

  module.exports = {
    isString: function isString(arg) {
      return typeof arg === 'string';
    },
    isObject: function isObject(arg) {
      return (typeof arg === 'undefined' ? 'undefined' : babelHelpers.typeof(arg)) === 'object' && arg !== null;
    },
    isNull: function isNull(arg) {
      return arg === null;
    },
    isNullOrUndefined: function isNullOrUndefined(arg) {
      return arg == null;
    }
  };
});

var require$$1$21 = util && (typeof util === 'undefined' ? 'undefined' : babelHelpers.typeof(util)) === 'object' && 'default' in util ? util['default'] : util;

var punycode = __commonjs(function (module, exports, global) {
	/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function (root) {

		/** Detect free variables */
		var freeExports = (typeof exports === 'undefined' ? 'undefined' : babelHelpers.typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
		var freeModule = (typeof module === 'undefined' ? 'undefined' : babelHelpers.typeof(module)) == 'object' && module && !module.nodeType && module;
		var freeGlobal = (typeof global === 'undefined' ? 'undefined' : babelHelpers.typeof(global)) == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
			root = freeGlobal;
		}

		/**
   * The `punycode` object.
   * @name punycode
   * @type Object
   */
		var punycode,


		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647,
		    // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		    tMin = 1,
		    tMax = 26,
		    skew = 38,
		    damp = 700,
		    initialBias = 72,
		    initialN = 128,
		    // 0x80
		delimiter = '-',
		    // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		    regexNonASCII = /[^\x20-\x7E]/,
		    // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
		    // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},


		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		    floor = Math.floor,
		    stringFromCharCode = String.fromCharCode,


		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) {
						// low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */
		function ucs2encode(array) {
			return map(array, function (value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * http://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,

			/** Cached calculation results */
			baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base;; /* no condition */k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;
				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
			}

			return ucs2encode(output);
		}

		/**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],

			/** `inputLength` will hold the number of code points in `input`. */
			inputLength,

			/** Cached calculation results */
			handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base;; /* no condition */k += base) {
							t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;
			}
			return output.join('');
		}

		/**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */
		function toUnicode(input) {
			return mapDomain(input, function (string) {
				return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
			});
		}

		/**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
		function toASCII(input) {
			return mapDomain(input, function (string) {
				return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
    * A string representing the current Punycode.js version number.
    * @memberOf punycode
    * @type String
    */
			'version': '1.3.2',
			/**
    * An object of methods to convert from JavaScript's internal character
    * representation (UCS-2) to Unicode code points, and back.
    * @see <https://mathiasbynens.be/notes/javascript-encoding>
    * @memberOf punycode
    * @type Object
    */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (typeof define == 'function' && babelHelpers.typeof(define.amd) == 'object' && define.amd) {
			define('punycode', function () {
				return punycode;
			});
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}
	})(__commonjs_global);
});

var require$$2$7 = punycode && (typeof punycode === 'undefined' ? 'undefined' : babelHelpers.typeof(punycode)) === 'object' && 'default' in punycode ? punycode['default'] : punycode;

var url = __commonjs(function (module, exports) {
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  'use strict';

  var punycode = require$$2$7;
  var util = require$$1$21;

  exports.parse = urlParse;
  exports.resolve = urlResolve;
  exports.resolveObject = urlResolveObject;
  exports.format = urlFormat;

  exports.Url = Url;

  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,


  // Special case for a simple path URL
  simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,


  // RFC 2396: characters reserved for delimiting URLs.
  // We actually just auto-escape these.
  delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],


  // RFC 2396: characters not allowed for various reasons.
  unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),


  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
  autoEscape = ['\''].concat(unwise),

  // Characters that are never ever allowed in a hostname.
  // Note that any invalid chars are also handled, but these
  // are the ones that are *expected* to be seen, so we fast-path
  // them.
  nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
      hostEndingChars = ['/', '?', '#'],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,

  // protocols that can allow "unsafe" and "unwise" chars.
  unsafeProtocol = {
    'javascript': true,
    'javascript:': true
  },

  // protocols that never have a hostname.
  hostlessProtocol = {
    'javascript': true,
    'javascript:': true
  },

  // protocols that always contain a // bit.
  slashedProtocol = {
    'http': true,
    'https': true,
    'ftp': true,
    'gopher': true,
    'file': true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
  },
      querystring = require$$0$27;

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) return url;

    var u = new Url();
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }

  Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + (typeof url === 'undefined' ? 'undefined' : babelHelpers.typeof(url)));
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
        splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
        uSplit = url.split(splitter),
        slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = '';
          this.query = {};
        }
        return this;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }

    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1) hostEnd = rest.length;

      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      this.parseHost();

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      this.hostname = this.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              this.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = '';
      } else {
        // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname);
      }

      var p = this.port ? ':' + this.port : '';
      var h = this.hostname || '';
      this.host = h + p;
      this.href += this.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1) continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }

    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
      if (parseQueryString) {
        this.query = querystring.parse(this.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      this.search = '';
      this.query = {};
    }
    if (rest) this.pathname = rest;
    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
      this.pathname = '/';
    }

    //to support http.request
    if (this.pathname || this.search) {
      var p = this.pathname || '';
      var s = this.search || '';
      this.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    this.href = this.format();
    return this;
  };

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (util.isString(obj)) obj = urlParse(obj);
    if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
    return obj.format();
  }

  Url.prototype.format = function () {
    var auth = this.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = this.protocol || '',
        pathname = this.pathname || '',
        hash = this.hash || '',
        host = false,
        query = '';

    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
      if (this.port) {
        host += ':' + this.port;
      }
    }

    if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
      query = querystring.stringify(this.query);
    }

    var search = this.search || query && '?' + query || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function (match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  };

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }

  Url.prototype.resolve = function (relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }

  Url.prototype.resolveObject = function (relative) {
    if (util.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol') result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }

    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift())) {}
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
        isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
        mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
        removeAllDots = mustEndAbs,
        srcPath = result.pathname && result.pathname.split('/') || [],
        relPath = relative.pathname && relative.pathname.split('/') || [],
        psychotic = result.protocol && !slashedProtocol[result.protocol];

    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }

    if (isRelAbs) {
      // it's absolute.
      result.host = relative.host || relative.host === '' ? relative.host : result.host;
      result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
        // it's relative
        // throw away the existing file, and take the new path instead.
        if (!srcPath) srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
      } else if (!util.isNullOrUndefined(relative.search)) {
        // just pull out the search.
        // like href='?foo'.
        // Put this after the other two cases because it simplifies the booleans
        if (psychotic) {
          result.hostname = result.host = srcPath.shift();
          //occationaly the auth can get stuck only in host
          //this especially happens in cases like
          //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
          var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        result.search = relative.search;
        result.query = relative.query;
        //to support http.request
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
        }
        result.href = result.format();
        return result;
      }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || result.host && srcPath.length;

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function () {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) this.hostname = host;
  };
});

var url$1 = url && (typeof url === 'undefined' ? 'undefined' : babelHelpers.typeof(url)) === 'object' && 'default' in url ? url['default'] : url;

var semver = __commonjs(function (module, exports) {
  exports = module.exports = SemVer;

  // The debug function is excluded entirely from the minified version.
  /* nomin */var debug;
  /* nomin */if ((typeof process === 'undefined' ? 'undefined' : babelHelpers.typeof(process)) === 'object' &&
  /* nomin */process.env &&
  /* nomin */process.env.NODE_DEBUG &&
  /* nomin *//\bsemver\b/i.test(process.env.NODE_DEBUG))
    /* nomin */debug = function debug() {
      /* nomin */var args = Array.prototype.slice.call(arguments, 0);
      /* nomin */args.unshift('SEMVER');
      /* nomin */console.log.apply(console, args);
      /* nomin */
    };
    /* nomin */else
    /* nomin */debug = function debug() {};

  // Note: this is the semver.org version of the spec that it implements
  // Not necessarily the package version of this code.
  exports.SEMVER_SPEC_VERSION = '2.0.0';

  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

  // The actual regexps go on exports.re
  var re = exports.re = [];
  var src = exports.src = [];
  var R = 0;

  // The following Regular Expressions can be used for tokenizing,
  // validating, and parsing SemVer version strings.

  // ## Numeric Identifier
  // A single `0`, or a non-zero digit followed by zero or more digits.

  var NUMERICIDENTIFIER = R++;
  src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
  var NUMERICIDENTIFIERLOOSE = R++;
  src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';

  // ## Non-numeric Identifier
  // Zero or more digits, followed by a letter or hyphen, and then zero or
  // more letters, digits, or hyphens.

  var NONNUMERICIDENTIFIER = R++;
  src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

  // ## Main Version
  // Three dot-separated numeric identifiers.

  var MAINVERSION = R++;
  src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';

  var MAINVERSIONLOOSE = R++;
  src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

  // ## Pre-release Version Identifier
  // A numeric identifier, or a non-numeric identifier.

  var PRERELEASEIDENTIFIER = R++;
  src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';

  var PRERELEASEIDENTIFIERLOOSE = R++;
  src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';

  // ## Pre-release Version
  // Hyphen, followed by one or more dot-separated pre-release version
  // identifiers.

  var PRERELEASE = R++;
  src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

  var PRERELEASELOOSE = R++;
  src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

  // ## Build Metadata Identifier
  // Any combination of digits, letters, or hyphens.

  var BUILDIDENTIFIER = R++;
  src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

  // ## Build Metadata
  // Plus sign, followed by one or more period-separated build metadata
  // identifiers.

  var BUILD = R++;
  src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';

  // ## Full Version String
  // A main version, followed optionally by a pre-release version and
  // build metadata.

  // Note that the only major, minor, patch, and pre-release sections of
  // the version string are capturing groups.  The build metadata is not a
  // capturing group, because it should not ever be used in version
  // comparison.

  var FULL = R++;
  var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';

  src[FULL] = '^' + FULLPLAIN + '$';

  // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
  // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
  // common in the npm registry.
  var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';

  var LOOSE = R++;
  src[LOOSE] = '^' + LOOSEPLAIN + '$';

  var GTLT = R++;
  src[GTLT] = '((?:<|>)?=?)';

  // Something like "2.*" or "1.2.x".
  // Note that "x.x" is a valid xRange identifer, meaning "any version"
  // Only the first item is strictly required.
  var XRANGEIDENTIFIERLOOSE = R++;
  src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
  var XRANGEIDENTIFIER = R++;
  src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

  var XRANGEPLAIN = R++;
  src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';

  var XRANGEPLAINLOOSE = R++;
  src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';

  var XRANGE = R++;
  src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
  var XRANGELOOSE = R++;
  src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

  // Tilde ranges.
  // Meaning is "reasonably at or greater than"
  var LONETILDE = R++;
  src[LONETILDE] = '(?:~>?)';

  var TILDETRIM = R++;
  src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
  re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
  var tildeTrimReplace = '$1~';

  var TILDE = R++;
  src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
  var TILDELOOSE = R++;
  src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

  // Caret ranges.
  // Meaning is "at least and backwards compatible with"
  var LONECARET = R++;
  src[LONECARET] = '(?:\\^)';

  var CARETTRIM = R++;
  src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
  re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
  var caretTrimReplace = '$1^';

  var CARET = R++;
  src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
  var CARETLOOSE = R++;
  src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

  // A simple gt/lt/eq thing, or just "" to indicate "any version"
  var COMPARATORLOOSE = R++;
  src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
  var COMPARATOR = R++;
  src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';

  // An expression to strip any whitespace between the gtlt and the thing
  // it modifies, so that `> 1.2.3` ==> `>1.2.3`
  var COMPARATORTRIM = R++;
  src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

  // this one has to use the /g flag
  re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
  var comparatorTrimReplace = '$1$2$3';

  // Something like `1.2.3 - 1.2.4`
  // Note that these all use the loose form, because they'll be
  // checked against either the strict or loose comparator form
  // later.
  var HYPHENRANGE = R++;
  src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';

  var HYPHENRANGELOOSE = R++;
  src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';

  // Star ranges basically just allow anything at all.
  var STAR = R++;
  src[STAR] = '(<|>)?=?\\s*\\*';

  // Compile to actual regexp objects.
  // All are flag-free, unless they were created above with a flag.
  for (var i = 0; i < R; i++) {
    debug(i, src[i]);
    if (!re[i]) re[i] = new RegExp(src[i]);
  }

  exports.parse = parse;
  function parse(version, loose) {
    if (version instanceof SemVer) return version;

    if (typeof version !== 'string') return null;

    if (version.length > MAX_LENGTH) return null;

    var r = loose ? re[LOOSE] : re[FULL];
    if (!r.test(version)) return null;

    try {
      return new SemVer(version, loose);
    } catch (er) {
      return null;
    }
  }

  exports.valid = valid;
  function valid(version, loose) {
    var v = parse(version, loose);
    return v ? v.version : null;
  }

  exports.clean = clean;
  function clean(version, loose) {
    var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
    return s ? s.version : null;
  }

  exports.SemVer = SemVer;

  function SemVer(version, loose) {
    if (version instanceof SemVer) {
      if (version.loose === loose) return version;else version = version.version;
    } else if (typeof version !== 'string') {
      throw new TypeError('Invalid Version: ' + version);
    }

    if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');

    if (!(this instanceof SemVer)) return new SemVer(version, loose);

    debug('SemVer', version, loose);
    this.loose = loose;
    var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

    if (!m) throw new TypeError('Invalid Version: ' + version);

    this.raw = version;

    // these are actually numbers
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError('Invalid major version');

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version');

    // numberify any prerelease numeric ids
    if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
      }
      return id;
    });

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  SemVer.prototype.format = function () {
    this.version = this.major + '.' + this.minor + '.' + this.patch;
    if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
    return this.version;
  };

  SemVer.prototype.toString = function () {
    return this.version;
  };

  SemVer.prototype.compare = function (other) {
    debug('SemVer.compare', this.version, this.loose, other);
    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

    return this.compareMain(other) || this.comparePre(other);
  };

  SemVer.prototype.compareMain = function (other) {
    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  };

  SemVer.prototype.comparePre = function (other) {
    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;

    var i = 0;
    do {
      var a = this.prerelease[i];
      var b = other.prerelease[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) return 0;else if (b === undefined) return 1;else if (a === undefined) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
    } while (++i);
  };

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  SemVer.prototype.inc = function (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break;
      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break;
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) this.patch++;
        this.prerelease = [];
        break;
      // This probably shouldn't be used publicly.
      // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) this.prerelease = [0];else {
          var i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) // didn't increment anything
            this.prerelease.push(0);
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
          } else this.prerelease = [identifier, 0];
        }
        break;

      default:
        throw new Error('invalid increment argument: ' + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  };

  exports.inc = inc;
  function inc(version, release, loose, identifier) {
    if (typeof loose === 'string') {
      identifier = loose;
      loose = undefined;
    }

    try {
      return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }

  exports.diff = diff;
  function diff(version1, version2) {
    if (eq(version1, version2)) {
      return null;
    } else {
      var v1 = parse(version1);
      var v2 = parse(version2);
      if (v1.prerelease.length || v2.prerelease.length) {
        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return 'pre' + key;
            }
          }
        }
        return 'prerelease';
      }
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return key;
          }
        }
      }
    }
  }

  exports.compareIdentifiers = compareIdentifiers;

  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);

    if (anum && bnum) {
      a = +a;
      b = +b;
    }

    return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
  }

  exports.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
  }

  exports.major = major;
  function major(a, loose) {
    return new SemVer(a, loose).major;
  }

  exports.minor = minor;
  function minor(a, loose) {
    return new SemVer(a, loose).minor;
  }

  exports.patch = patch;
  function patch(a, loose) {
    return new SemVer(a, loose).patch;
  }

  exports.compare = compare;
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(b);
  }

  exports.compareLoose = compareLoose;
  function compareLoose(a, b) {
    return compare(a, b, true);
  }

  exports.rcompare = rcompare;
  function rcompare(a, b, loose) {
    return compare(b, a, loose);
  }

  exports.sort = sort;
  function sort(list, loose) {
    return list.sort(function (a, b) {
      return exports.compare(a, b, loose);
    });
  }

  exports.rsort = rsort;
  function rsort(list, loose) {
    return list.sort(function (a, b) {
      return exports.rcompare(a, b, loose);
    });
  }

  exports.gt = gt;
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }

  exports.lt = lt;
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }

  exports.eq = eq;
  function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
  }

  exports.neq = neq;
  function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
  }

  exports.gte = gte;
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }

  exports.lte = lte;
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }

  exports.cmp = cmp;
  function cmp(a, op, b, loose) {
    var ret;
    switch (op) {
      case '===':
        if ((typeof a === 'undefined' ? 'undefined' : babelHelpers.typeof(a)) === 'object') a = a.version;
        if ((typeof b === 'undefined' ? 'undefined' : babelHelpers.typeof(b)) === 'object') b = b.version;
        ret = a === b;
        break;
      case '!==':
        if ((typeof a === 'undefined' ? 'undefined' : babelHelpers.typeof(a)) === 'object') a = a.version;
        if ((typeof b === 'undefined' ? 'undefined' : babelHelpers.typeof(b)) === 'object') b = b.version;
        ret = a !== b;
        break;
      case '':case '=':case '==':
        ret = eq(a, b, loose);break;
      case '!=':
        ret = neq(a, b, loose);break;
      case '>':
        ret = gt(a, b, loose);break;
      case '>=':
        ret = gte(a, b, loose);break;
      case '<':
        ret = lt(a, b, loose);break;
      case '<=':
        ret = lte(a, b, loose);break;
      default:
        throw new TypeError('Invalid operator: ' + op);
    }
    return ret;
  }

  exports.Comparator = Comparator;
  function Comparator(comp, loose) {
    if (comp instanceof Comparator) {
      if (comp.loose === loose) return comp;else comp = comp.value;
    }

    if (!(this instanceof Comparator)) return new Comparator(comp, loose);

    debug('comparator', comp, loose);
    this.loose = loose;
    this.parse(comp);

    if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;

    debug('comp', this);
  }

  var ANY = {};
  Comparator.prototype.parse = function (comp) {
    var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var m = comp.match(r);

    if (!m) throw new TypeError('Invalid comparator: ' + comp);

    this.operator = m[1];
    if (this.operator === '=') this.operator = '';

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.loose);
  };

  Comparator.prototype.toString = function () {
    return this.value;
  };

  Comparator.prototype.test = function (version) {
    debug('Comparator.test', version, this.loose);

    if (this.semver === ANY) return true;

    if (typeof version === 'string') version = new SemVer(version, this.loose);

    return cmp(version, this.operator, this.semver, this.loose);
  };

  exports.Range = Range;
  function Range(range, loose) {
    if (range instanceof Range && range.loose === loose) return range;

    if (!(this instanceof Range)) return new Range(range, loose);

    this.loose = loose;

    // First, split based on boolean or ||
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function (range) {
      return this.parseRange(range.trim());
    }, this).filter(function (c) {
      // throw out any that are not relevant for whatever reason
      return c.length;
    });

    if (!this.set.length) {
      throw new TypeError('Invalid SemVer Range: ' + range);
    }

    this.format();
  }

  Range.prototype.format = function () {
    this.range = this.set.map(function (comps) {
      return comps.join(' ').trim();
    }).join('||').trim();
    return this.range;
  };

  Range.prototype.toString = function () {
    return this.range;
  };

  Range.prototype.parseRange = function (range) {
    var loose = this.loose;
    range = range.trim();
    debug('range', range, loose);
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug('hyphen replace', range);
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
    debug('comparator trim', range, re[COMPARATORTRIM]);

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[TILDETRIM], tildeTrimReplace);

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[CARETTRIM], caretTrimReplace);

    // normalize spaces
    range = range.split(/\s+/).join(' ');

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var set = range.split(' ').map(function (comp) {
      return parseComparator(comp, loose);
    }).join(' ').split(/\s+/);
    if (this.loose) {
      // in loose mode, throw out any that are not valid comparators
      set = set.filter(function (comp) {
        return !!comp.match(compRe);
      });
    }
    set = set.map(function (comp) {
      return new Comparator(comp, loose);
    });

    return set;
  };

  // Mostly just for testing and legacy API reasons
  exports.toComparators = toComparators;
  function toComparators(range, loose) {
    return new Range(range, loose).set.map(function (comp) {
      return comp.map(function (c) {
        return c.value;
      }).join(' ').trim().split(' ');
    });
  }

  // comprised of xranges, tildes, stars, and gtlt's at this point.
  // already replaced the hyphen ranges
  // turn into a set of JUST comparators.
  function parseComparator(comp, loose) {
    debug('comp', comp);
    comp = replaceCarets(comp, loose);
    debug('caret', comp);
    comp = replaceTildes(comp, loose);
    debug('tildes', comp);
    comp = replaceXRanges(comp, loose);
    debug('xrange', comp);
    comp = replaceStars(comp, loose);
    debug('stars', comp);
    return comp;
  }

  function isX(id) {
    return !id || id.toLowerCase() === 'x' || id === '*';
  }

  // ~, ~> --> * (any, kinda silly)
  // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
  // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
  // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
  // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
  // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
  function replaceTildes(comp, loose) {
    return comp.trim().split(/\s+/).map(function (comp) {
      return replaceTilde(comp, loose);
    }).join(' ');
  }

  function replaceTilde(comp, loose) {
    var r = loose ? re[TILDELOOSE] : re[TILDE];
    return comp.replace(r, function (_, M, m, p, pr) {
      debug('tilde', comp, _, M, m, p, pr);
      var ret;

      if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p))
        // ~1.2 == >=1.2.0- <1.3.0-
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
        debug('replaceTilde pr', pr);
        if (pr.charAt(0) !== '-') pr = '-' + pr;
        ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
      } else
        // ~1.2.3 == >=1.2.3 <1.3.0
        ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';

      debug('tilde return', ret);
      return ret;
    });
  }

  // ^ --> * (any, kinda silly)
  // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
  // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
  // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
  // ^1.2.3 --> >=1.2.3 <2.0.0
  // ^1.2.0 --> >=1.2.0 <2.0.0
  function replaceCarets(comp, loose) {
    return comp.trim().split(/\s+/).map(function (comp) {
      return replaceCaret(comp, loose);
    }).join(' ');
  }

  function replaceCaret(comp, loose) {
    debug('caret', comp, loose);
    var r = loose ? re[CARETLOOSE] : re[CARET];
    return comp.replace(r, function (_, M, m, p, pr) {
      debug('caret', comp, _, M, m, p, pr);
      var ret;

      if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
        if (M === '0') ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
      } else if (pr) {
        debug('replaceCaret pr', pr);
        if (pr.charAt(0) !== '-') pr = '-' + pr;
        if (M === '0') {
          if (m === '0') ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
        } else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
      } else {
        debug('no pr');
        if (M === '0') {
          if (m === '0') ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
        } else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
      }

      debug('caret return', ret);
      return ret;
    });
  }

  function replaceXRanges(comp, loose) {
    debug('replaceXRanges', comp, loose);
    return comp.split(/\s+/).map(function (comp) {
      return replaceXRange(comp, loose);
    }).join(' ');
  }

  function replaceXRange(comp, loose) {
    comp = comp.trim();
    var r = loose ? re[XRANGELOOSE] : re[XRANGE];
    return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
      debug('xRange', comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;

      if (gtlt === '=' && anyX) gtlt = '';

      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          // nothing is allowed
          ret = '<0.0.0';
        } else {
          // nothing is forbidden
          ret = '*';
        }
      } else if (gtlt && anyX) {
        // replace X with 0
        if (xm) m = 0;
        if (xp) p = 0;

        if (gtlt === '>') {
          // >1 => >=2.0.0
          // >1.2 => >=1.3.0
          // >1.2.3 => >= 1.2.4
          gtlt = '>=';
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else if (xp) {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === '<=') {
          // <=0.7.x is actually <0.8.0, since any 0.7.x should
          // pass.  Similarly, <=7.x is actually <8.0.0, etc.
          gtlt = '<';
          if (xm) M = +M + 1;else m = +m + 1;
        }

        ret = gtlt + M + '.' + m + '.' + p;
      } else if (xm) {
        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
      } else if (xp) {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      }

      debug('xRange return', ret);

      return ret;
    });
  }

  // Because * is AND-ed with everything else in the comparator,
  // and '' means "any version", just remove the *s entirely.
  function replaceStars(comp, loose) {
    debug('replaceStars', comp, loose);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[STAR], '');
  }

  // This function is passed to string.replace(re[HYPHENRANGE])
  // M, m, patch, prerelease, build
  // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
  // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
  // 1.2 - 3.4 => >=1.2.0 <3.5.0
  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {

    if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;

    if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;

    return (from + ' ' + to).trim();
  }

  // if ANY of the sets match ALL of its comparators, then pass
  Range.prototype.test = function (version) {
    if (!version) return false;

    if (typeof version === 'string') version = new SemVer(version, this.loose);

    for (var i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version)) return true;
    }
    return false;
  };

  function testSet(set, version) {
    for (var i = 0; i < set.length; i++) {
      if (!set[i].test(version)) return false;
    }

    if (version.prerelease.length) {
      // Find the set of versions that are allowed to have prereleases
      // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
      // That should allow `1.2.3-pr.2` to pass.
      // However, `1.2.4-alpha.notready` should NOT be allowed,
      // even though it's within the range set by the comparators.
      for (var i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === ANY) continue;

        if (set[i].semver.prerelease.length > 0) {
          var allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
        }
      }

      // Version has a -pre, but it's not one of the ones we like.
      return false;
    }

    return true;
  }

  exports.satisfies = satisfies;
  function satisfies(version, range, loose) {
    try {
      range = new Range(range, loose);
    } catch (er) {
      return false;
    }
    return range.test(version);
  }

  exports.maxSatisfying = maxSatisfying;
  function maxSatisfying(versions, range, loose) {
    return versions.filter(function (version) {
      return satisfies(version, range, loose);
    }).sort(function (a, b) {
      return rcompare(a, b, loose);
    })[0] || null;
  }

  exports.validRange = validRange;
  function validRange(range, loose) {
    try {
      // Return '*' instead of '' so that truthiness works.
      // This will throw if it's invalid anyway
      return new Range(range, loose).range || '*';
    } catch (er) {
      return null;
    }
  }

  // Determine if version is less than all the versions possible in the range
  exports.ltr = ltr;
  function ltr(version, range, loose) {
    return outside(version, range, '<', loose);
  }

  // Determine if version is greater than all the versions possible in the range.
  exports.gtr = gtr;
  function gtr(version, range, loose) {
    return outside(version, range, '>', loose);
  }

  exports.outside = outside;
  function outside(version, range, hilo, loose) {
    version = new SemVer(version, loose);
    range = new Range(range, loose);

    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case '>':
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = '>';
        ecomp = '>=';
        break;
      case '<':
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = '<';
        ecomp = '<=';
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }

    // If it satisifes the range it is not outside
    if (satisfies(version, range, loose)) {
      return false;
    }

    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.

    for (var i = 0; i < range.set.length; ++i) {
      var comparators = range.set[i];

      var high = null;
      var low = null;

      comparators.forEach(function (comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator('>=0.0.0');
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, loose)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, loose)) {
          low = comparator;
        }
      });

      // If the edge version comparator has a operator then our version
      // isn't outside it
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }

      // If the lowest version comparator has an operator and our version
      // is less than it then it isn't higher than the range
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  }
});

var semver$1 = semver && (typeof semver === 'undefined' ? 'undefined' : babelHelpers.typeof(semver)) === 'object' && 'default' in semver ? semver['default'] : semver;

var Default = {
  branch: 'dist', // The branch to commit to.
  versionBump: 'patch', // Will bump the versino if package.json is present https://docs.npmjs.com/cli/version.  Pass false to avoid bump.
  remote: {
    repo: '../', // The remote repo to push to (URL|RemoteName|FileSystemPath). Common examples include:
    //   - `git@github.com:alienfast/foo.git` - your main project's remote (gh-pages branch)
    //   - `../` - the local project repository itself

    // If token && login are provided, the remote.repo will be formatted to include these
    login: undefined,
    token: undefined,
    branch: undefined // The remote branch to push to. Common usage would be for Heroku's master branch requirement.
  },
  clean: { // clean the cwd dir before/after a run
    before: false,
    after: false
  },
  tag: {
    name: undefined, // fn or string.  Default will autoresolve from the package.json version if possible.  Pass false to avoid tagging.
    existsFailure: false // if tag already exists, fail the executions
  },
  push: true, // Pushes `branch` to remote. If tag is set, pushes the specified tag as well. false will disable
  disableRelativeAutoPush: false, // when testing, we may have nothing to push to.  By default, if using a remote repo that is relative, will try to push using the config.branch using the sourceGit all the way to the server.
  commit: {
    auto: true, // Commits built code to `branch`. A new commit is only created if the built code has changed. false will disable

    // The commit template to use when committing. (special characters must be escaped)
    //  The following tokens are replaced:
    //    - %sourceName%:   the package.json name or the project directory name
    //    - %sourceTag%: the current tag i.e. v1.0.0
    //    - %sourceBranch%: the current branch
    //    - %sourceCommit%: the most recent commit
    template: 'Built %sourceName% %sourceTag% from commit %sourceCommit% on branch %sourceBranch%',
    ensure: true // require the source and build to be fully committed prior to running.
  },
  fetch: {
    shallow: false // Fetches branch from remote with the flag --depth=1. Which makes a shallow clone with a history truncated to the last revision. Might bring some boost on long-history repositories.
  },
  git: {
    config: {} // [git config](http://git-scm.com/docs/git-config) settings for the repository when preparing the repository. e.g. `{'user.name': 'John Doe'}`
  },
  force: false // Pushes branch to remote with the flag --force. This will NOT checkout the remote branch, and will OVERRIDE remote with the repo commits.  Use with caution.
};

var BuildControl = function (_BaseSourced) {
  babelHelpers.inherits(BuildControl, _BaseSourced);

  function BuildControl() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    babelHelpers.classCallCheck(this, BuildControl);


    // modify

    // Build remote repo if sensitive information is passed in

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BuildControl).call(this, extend(true, {}, Default, { tag: { name: function name() {
          return _this.autoResolveTagName();
        } } }, // tag package version auto resolver
    config)));

    if (_this.config.remote.login && _this.config.remote.token) {
      var remote = url$1.parse(_this.config.remote.repo);

      _this.config.remote.repo = url$1.format({
        protocol: remote.protocol,
        auth: _this.config.remote.login + ':' + _this.config.remote.token,
        host: remote.host,
        pathname: remote.pathname
      });

      // configure sensitive information
      _this.config.sensitive[_this.config.remote.login + ':' + _this.config.remote.token] = '<credentials>';
      _this.config.sensitive[_this.config.remote.token] = '<token>';
    }

    _this.sourceGit = new Git({
      debug: _this.config.debug,
      cwd: _this.config.sourceCwd,
      sensitive: _this.config.sensitive
    });

    _this.git = new Git({
      debug: _this.config.debug,
      cwd: _this.config.cwd,
      sensitive: _this.config.sensitive
    });

    _this.npm = new Npm({
      debug: _this.config.debug,
      cwd: _this.config.cwd,
      versionBump: _this.config.versionBump,
      sourceCwd: _this.config.sourceCwd,
      sensitive: _this.config.sensitive
    });

    // Ensure/initialize
    _this.cleanBefore();
    _this.ensureDir();
    if (_this.config.remote.repo === '../') {
      _this.verifySourceBranchIsTracked();
    }

    // Set up repository
    _this.ensureGitInit();
    _this.configureGit();
    _this.ensureRemote();
    return _this;
  }

  babelHelpers.createClass(BuildControl, [{
    key: 'ensureDir',
    value: function ensureDir() {
      // reestablish a build dir
      fs.ensureDirSync(this.config.cwd);
    }
  }, {
    key: 'cleanBefore',
    value: function cleanBefore() {
      // clean dir
      if (this.config.clean.before) {
        fs.removeSync(this.config.cwd);
      }
    }
  }, {
    key: 'cleanAfter',
    value: function cleanAfter() {
      // clean dir
      if (this.config.clean.after) {
        fs.removeSync(this.config.cwd);
      }
    }
  }, {
    key: 'resolveBranch',
    value: function resolveBranch() {
      return this.config.remote.branch || this.config.branch;
    }

    /**
     *  Can run prior to tests etc to ensure versions are ready as well as commits.
     */

  }, {
    key: 'prepublishCheck',
    value: function prepublishCheck() {
      // Check if git version meets requirements
      var version = this.git.version();
      if (!version || semver$1.lt(version, '1.8.0')) {
        throw 'Current Git version is ' + version + '. This plugin requires Git >= 1.8.0.';
      }

      // If config.commit.ensure is true check that the main project's working directory is clean
      if (this.config.commit.ensure) {
        this.git.ensureCommitted();
        this.sourceGit.ensureCommitted();
      }

      if (this.config.fetch.shallow && semver$1.lt(version, '1.9.0')) {
        this.notifyError('Option "fetch.shallow" is supported on Git >= 1.9.0 and your version is ' + version + '.');
      }

      // trigger message if tag exists in remote.
      this.tagName();
    }
  }, {
    key: 'prepublishBuildCheck',
    value: function prepublishBuildCheck() {
      this.prepublishCheck();

      // Check that build directory contains files
      if (fs.readdirSync(this.config.cwd).length === 0) {
        throw 'Build directory ' + this.config.cwd + ' is empty. Nothing to version.';
      }

      // Check that build directory exists
      if (!fs.existsSync(this.config.cwd)) {
        throw 'Build directory ' + this.config.cwd + ' doesn\'t exist. Nothing to version.';
      }
    }

    /**
     * Attempt to track a branch from origin. It may fail on times that the branch is already tracking another remote. There is no problem when that happens, nor does it have any affect
     */

  }, {
    key: 'verifySourceBranchIsTracked',
    value: function verifySourceBranchIsTracked() {
      this.sourceGit.track(this.config.branch);
    }

    /**
     * Initialize git repo if one doesn't exist
     */

  }, {
    key: 'ensureGitInit',
    value: function ensureGitInit() {
      var repo = require$$2.join(this.config.cwd, '.git');
      if (!fs.existsSync(repo)) {
        this.log('Creating git repository in ' + this.config.cwd + '.');
        this.git.init();
      } else {
        this.debug('Git repo already exists in ' + this.config.cwd + '.');
      }
    }

    /**
     * Initialize the git config
     */

  }, {
    key: 'configureGit',
    value: function configureGit() {

      this.debugDump('this.config.git.config', this.config.git.config);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this.config.git.config)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          this.git.configure(key, this.config.git.config[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Create a named remote if one doesn't exist
     */

  }, {
    key: 'ensureRemote',
    value: function ensureRemote() {
      var remoteUrlRegex = new RegExp('[\/\\:]');
      if (remoteUrlRegex.test(this.config.remote.repo)) {
        this.config.remote.name = this.git.hash('remote', this.config.remote.repo);
        if (!this.git.remote().includes(this.config.remote.name)) {
          this.log('Creating remote ' + this.config.remote.name);
          this.git.remoteAdd(this.config.remote.name, this.config.remote.repo);
        }
      }
    }

    /**
     * Check if local branch can safely merge upstream (requires fetched refs)
     * @returns {boolean}
     */

  }, {
    key: 'shouldUpdate',
    value: function shouldUpdate() {
      // WARNING: With force, we're not even going to attempt to check out, We're just going to push the repo and override EVERYTHING in the remote
      if (this.config.force === true) return false;

      var status = this.git.status();
      if (status) {
        var ahead = status.includes('ahead');
        var behind = status.includes('behind');

        if (ahead && behind) {
          throw 'The remote and local branches have diverged please\n' + 'resolve manually. Deleting the local **built code**\n' + '.git directory will usually fix things up.';
        } else if (ahead) {
          return false;
        } else if (behind) {
          return true;
        }
      }
    }

    /**
     * Fetch remote refs to a specific branch, equivalent to a pull without checkout
     * @param dest
     */

  }, {
    key: 'fetch',
    value: function fetch(dest) {
      var branch = this.resolveBranch() + (dest ? ':' + this.config.branch : '');
      this.log('Fetching \'' + this.config.branch + '\' ' + (this.config.fetch.shallow ? 'files' : 'history') + ' from ' + this.config.remote.repo + '.');
      this.git.fetch(this.config.remote.name, branch, this.config.fetch.shallow);
    }

    /**
     * Set branch to track remote
     */

  }, {
    key: 'ensureLocalBranchTracksRemote',
    value: function ensureLocalBranchTracksRemote() {
      var remoteBranch = this.config.remote.branch || this.config.branch;
      if (this.git.configBranchRemote(this.config.branch) !== this.config.remote.name) {
        this.git.branchRemote(this.config.branch, this.config.remote.name, remoteBranch);
      }
    }
  }, {
    key: 'sourceName',
    value: function sourceName() {
      if (this._sourceName) {
        return this._sourceName;
      } else {
        if (this.npm.package() != null) {
          this._sourceName = this.npm.package().name;
        } else {
          this._sourceName = this.config.sourceCwd.split('/').pop();
        }

        return this._sourceName;
      }
    }
  }, {
    key: 'sourceCommit',
    value: function sourceCommit() {
      if (this._sourceCommit) {
        return this._sourceCommit;
      }
      return this._sourceCommit = this.sourceGit.sourceCommit();
    }
  }, {
    key: 'sourceCommitFull',
    value: function sourceCommitFull() {
      if (this._sourceCommitFull) {
        return this._sourceCommitFull;
      }
      return this._sourceCommitFull = this.sourceGit.sourceCommitFull();
    }
  }, {
    key: 'sourceCommitLink',
    value: function sourceCommitLink() {
      return '[`%sourceCommit%`](../../commit/%sourceCommitFull%)'.replace(/%sourceCommit%/g, this.sourceCommit()).replace(/%sourceCommitFull%/g, this.sourceCommitFull());
    }
  }, {
    key: 'sourceBranch',
    value: function sourceBranch() {
      if (this._sourceBranch) {
        return this._sourceBranch;
      }
      return this._sourceBranch = this.sourceGit.sourceBranch();
    }
  }, {
    key: 'sourceTag',
    value: function sourceTag() {
      if (this._sourceTag) {
        return this._sourceTag;
      }
      '';

      var name = this.tagName();
      if (name) {
        this._sourceTag = name;
      } else {
        this._sourceTag = '';
      }

      return this._sourceTag;
    }
  }, {
    key: 'sourceTagLink',
    value: function sourceTagLink() {
      if (this.tagName()) {
        return '[`%sourceTag%`](../../releases/tag/%sourceTag%)'.replace(/%sourceTag%/g, this.sourceTag());
      } else {
        return '';
      }
    }
  }, {
    key: 'interpolate',
    value: function interpolate(template) {
      return template.replace(/%sourceName%/g, this.sourceName()).replace(/%sourceTag%/g, this.sourceTag()).replace(/%sourceTagLink%/g, this.sourceTagLink()).replace(/%sourceCommit%/g, this.sourceCommit()).replace(/%sourceCommitFull%/g, this.sourceCommitFull()).replace(/%sourceCommitLink%/g, this.sourceCommitLink()).replace(/%sourceBranch%/g, this.sourceBranch());
    }

    /**
     * Stage and commit to a branch
     */

  }, {
    key: 'commit',
    value: function commit() {

      if (!this.config.commit.auto) {
        return;
      }

      var message = this.interpolate(this.config.commit.template);

      // If there are no changes, skip commit
      if (!this.git.status()) {
        this.log('No changes to your branch. Skipping commit.');
        return;
      }

      this.log('Committing changes to \'' + this.config.branch + '\'.');
      this.git.add();
      this.git.commit(message);
    }

    /**
     * Tag local branch
     */

  }, {
    key: 'tag',
    value: function tag() {
      var tagName = this.tagName();
      if (!tagName) {
        return;
      }

      this.log('Tagging the local repository with ' + tagName);
      this.git.tag(tagName);
    }

    /**
     * Convenience to resolve from a fn or string.  If tag already exists in a remote, it will return false (don't forget to bump your version in the package.json!)
     */

  }, {
    key: 'tagName',
    value: function tagName() {
      if (this._tagName !== undefined) {
        return this._tagName;
      }

      if (this.config.tag.name === false) {
        this._tagName = false;
      } else if (this.config.tag.name === undefined) {
        this._tagName = false;
      } else {
        var name = null;
        if (typeof this.config.tag.name === 'function') {
          name = this.config.tag.name();
        } else {
          name = this.config.tag.name;
        }

        // If the tag exists, skip tagging
        if (name && this.tagExists(name)) {
          var msg = 'The tag "' + name + '" already exists on ' + this.config.remote.name;
          if (this.config.tag.existsFailure) {
            this.notifyError(msg);
          } else {
            this.log('WARNING: ' + msg + ', skipping tagging.');
          }

          name = false;
        }

        this._tagName = name;
      }

      return this._tagName;
    }

    /**
     * Resolver plugged into options as tag: {name: ()} that can be overridden by a string or other fn
     */

  }, {
    key: 'autoResolveTagName',
    value: function autoResolveTagName() {
      if (this.npm.package() && this.npm.package().version) {
        return 'v' + this.npm.package().version;
      } else {
        return false;
      }
    }
  }, {
    key: 'tagExists',
    value: function tagExists(name) {
      if (this.git.tagExists(name, this.config.remote.name)) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Push branch to remote
     */

  }, {
    key: 'push',
    value: function push() {
      if (!this.config.push) {
        return;
      }

      var branch = this.config.branch;

      if (this.config.remote.branch) {
        branch += ':' + this.config.remote.branch;
      }

      this.git.push(this.config.remote.name, branch, this.config.force);
      if (this.tagName()) {
        this.git.pushTag(this.config.remote.name, this.tagName());
      }

      // if this was pushed to a relative path, go ahead and try and push that up to the origin
      if (!this.config.disableRelativeAutoPush && this.config.remote.repo.includes('..')) {
        var remote = 'origin';
        this.log('Repo is using relative path, pushing ' + branch + ' from the source directory...');
        this.sourceGit.push(remote, branch);

        if (this.tagName()) {
          this.source.pushTag(remote, this.tagName());
        }
      }
    }
  }, {
    key: 'localBranchExists',
    value: function localBranchExists() {
      return this.git.branchExists(this.config.branch);
    }
  }, {
    key: 'remoteBranchExists',
    value: function remoteBranchExists() {
      return this.git.branchRemoteExists(this.resolveBranch(), this.config.remote.name);
    }
  }, {
    key: 'run',
    value: function run() {
      // Run task
      this.log(this.interpolate('Starting %sourceName% for commit %sourceCommit% on branch %sourceBranch% using directory ' + this.config.cwd + '...'));

      // Prepare
      this.prepublishBuildCheck();

      // Set up local branch
      var localBranchExists = this.localBranchExists();
      var remoteBranchExists = this.remoteBranchExists();

      if (remoteBranchExists) {
        this.fetch();
      }

      if (remoteBranchExists && localBranchExists) {
        // Make sure local is tracking remote
        this.ensureLocalBranchTracksRemote();

        // Update local branch history if necessary
        if (this.shouldUpdate()) {
          this.fetch(true);
        }
      } else if (remoteBranchExists && !localBranchExists) {
        //// TEST THIS ONE
        // Create local branch that tracks remote
        this.git.track(this.config.branch, this.config.remote.name, this.resolveBranch());
      } else if (!remoteBranchExists && !localBranchExists) {
        // Create local branch
        this.log('Creating branch \'' + this.config.branch + '\'.');
        this.git.checkout(this.config.branch);
      }

      // Perform actions
      this.git.symbolicRefHead(this.config.branch);
      this.git.reset();

      this.commit();
      this.tag();
      this.push();
      this.cleanAfter();
    }
  }]);
  return BuildControl;
}(BaseSourced);

exports.BuildControl = BuildControl;
exports.Git = Git;
//# sourceMappingURL=build-control.cjs.js.map