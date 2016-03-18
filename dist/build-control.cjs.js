'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var extend = _interopDefault(require('extend'));
var stringify = _interopDefault(require('stringify-object'));
var shelljs = _interopDefault(require('shelljs'));
var chalk = _interopDefault(require('chalk'));
var fancyLog = _interopDefault(require('fancy-log'));
var path = _interopDefault(require('path'));
var pathIsAbsolute = _interopDefault(require('path-is-absolute'));
var fs = _interopDefault(require('fs'));
var crypto = _interopDefault(require('crypto'));
var fs$1 = _interopDefault(require('fs-extra'));
var url = _interopDefault(require('url'));
var semver = _interopDefault(require('semver'));

var babelHelpers = {};

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
      msg += '[' + chalk.grey(this.constructor.name) + '] ' + message;
      fancyLog(this.maskSensitive(msg));
    }
  }, {
    key: 'error',
    value: function error(msg) {
      this.log(msg, '[' + chalk.red('error') + ']');
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this.config.debug) {
        this.log(msg, '[' + chalk.cyan('debug') + ']');
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

var Paths = function () {
  function Paths() {
    babelHelpers.classCallCheck(this, Paths);
  }

  babelHelpers.createClass(Paths, null, [{
    key: 'resolveCwd',
    value: function resolveCwd(base, cwd) {
      if (!pathIsAbsolute(cwd)) {
        return path.join(base, cwd);
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
      var logResult = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      return this.exec('git diff', logResult);
    }
  }, {
    key: 'ensureCommitted',
    value: function ensureCommitted() {
      var diff = this.diff(false);
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
      var commitMessageFile = path.join(this.config.cwd, this.hash('commitMessageFile', message));
      fs.writeFileSync(commitMessageFile, message);
      this.exec('git commit --file=' + commitMessageFile);

      fs.unlinkSync(commitMessageFile);
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
      return path.join(this.config.sourceCwd, 'package.json');
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
        return JSON.parse(fs$1.readFileSync(this.packageFile(), 'utf8'));
      } else {
        return null;
      }
    }
  }]);
  return Npm;
}(BaseSourced);

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
    existsFailure: true // if tag already exists, fail the execution
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
      _this.log('Configuring remote with login and token...');
      var remote = url.parse(_this.config.remote.repo);

      _this.config.remote.repo = url.format({
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
      fs$1.ensureDirSync(this.config.cwd);
    }
  }, {
    key: 'cleanBefore',
    value: function cleanBefore() {
      // clean dir
      if (this.config.clean.before) {
        fs$1.removeSync(this.config.cwd);
      }
    }
  }, {
    key: 'cleanAfter',
    value: function cleanAfter() {
      // clean dir
      if (this.config.clean.after) {
        fs$1.removeSync(this.config.cwd);
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
      if (!version || semver.lt(version, '1.8.0')) {
        throw 'Current Git version is ' + version + '. This plugin requires Git >= 1.8.0.';
      }

      // If config.commit.ensure is true check that the main project's working directory is clean
      if (this.config.commit.ensure) {
        this.git.ensureCommitted();
        this.sourceGit.ensureCommitted();
      }

      if (this.config.fetch.shallow && semver.lt(version, '1.9.0')) {
        this.notifyError('Option "fetch.shallow" is supported on Git >= 1.9.0 and your version is ' + version + '.');
      }
    }
  }, {
    key: 'prepublishBuildCheck',
    value: function prepublishBuildCheck() {
      this.prepublishCheck();

      // trigger message if tag exists in remote.
      this.tagName();

      // Check that build directory contains files
      if (fs$1.readdirSync(this.config.cwd).length === 0) {
        throw 'Build directory ' + this.config.cwd + ' is empty. Nothing to version.';
      }

      // Check that build directory exists
      if (!fs$1.existsSync(this.config.cwd)) {
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
      var repo = path.join(this.config.cwd, '.git');
      if (!fs$1.existsSync(repo)) {
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
          this.sourceGit.pushTag(remote, this.tagName());
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
exports.Npm = Npm;
//# sourceMappingURL=build-control.cjs.js.map