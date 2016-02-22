import BuildControl from '../src/build_control'
import chai from 'chai'
import glob from 'glob'
import path from 'path'
import fs from 'fs-extra'
import async from 'async'
import childProcess from 'child_process'
import shelljs from 'shelljs'
//import _ from 'lodash'
import Promise from 'bluebird'
import fancyLog from 'fancy-log'

let expect = chai.expect

let debug = false

/**
 *  @callback scenarioCallback
 * @param {Error} err - If there's an error, this will not be null
 * @param {String} stdout - stdout from running grunt
 * @param {String} stderr - stderr from running grunt
 */

/**
 * Executes a Scenario given by tests.
 * The `describe` block needs to correspond with the name of the Mock folder to be tested
 *
 * A Scenario contains:
 *    repo - the folder to contain the repository
 *    repo/gruntfile.js - the gruntfile to be tested
 *    remote - (optional) folder to be the stand in for the the cloud repository
 *    validate - (will be overwritten) its cloned from remote/ (used to validate a push)
 *
 **
 * NOTE: this function DOES change the process's working directory to the `scenario` so that
 * validations are easier access.
 *
 * @param {scenarioCallback} assertionCallback - The callback that handles the response
 */
let execScenario = (assertionCallback) => {

  let mockRepoDir = path.normalize(__dirname + '/mock')
  let distDir = path.join(mockRepoDir, 'repo')
  let remoteDir = path.join(mockRepoDir, 'remote')
  let verifyDir = path.join(mockRepoDir, 'validate')

  return Promise.resolve()

    // create the "remote" to be pushed to
    .tap(() => {
      fs.ensureDirSync(remoteDir)
      return childProcessExec('git init --bare', {cwd: remoteDir})
    })

    // make `repo/` a repository
    .tap(() => {
      //return childProcessExec('git init', {cwd: distDir})
    })

    // execute the grunt default command
    .then(() => {

      let originalPwd = shelljs.pwd()
      try {
        // Change working directory
        shelljs.cd(distDir)

        // configurations.json should be an array of configurations

        // for each configuration, run an instance of BuildControl
        let configurationsPath = `${distDir}/*.json`
        fancyLog(`\n\n\n------------------------------------------`)
        let files = glob.sync(configurationsPath, {realpath: true})
        if (!files || files.length <= 0) {
          throw new Error(`Unable to find any configurations at ${configurationsPath}`)
        }

        let configurations = readConfig(files[0])
        let buildControls = []

        //capture the logs and verify the output
        let logs = ``
        for (let config of configurations) {
          config['debug'] = debug
          let buildControl = new LogCaptureBuildControl(config)
          buildControls.push(buildControl)
          buildControl.run()
          logs += buildControl.logs.join('\n')
        }

        return {error: null, stdout: logs, stderror: null, buildControls: buildControls}
      }
      finally {
        shelljs.cd(originalPwd)
      }
    })

    // clone the "remote" into "verify/"
    .tap(() => {
      fs.removeSync(verifyDir) // since we're cloning from `remote/` we'll just remove the folder if it exists
      return childProcessExec('git clone remote validate', {cwd: mockRepoDir})
    })
    .then((processOutput) => {
      return assertionCallback(processOutput.error, processOutput.stdout, processOutput.stderr, processOutput.buildControls)
    })
}

const LogCaptureBuildControl = class extends BuildControl {

  constructor(config = {}) {
    super(config)
    this.logs = []

    // hack to get the git messages as well
    this.originalGitLog = this.git.log
    this.git.log = ((msg) => {
      this.logs.push(this.maskSensitive(msg))
      this.originalGitLog(msg)
    })
  }

  log(msg) {
    this.logs.push(this.maskSensitive(msg))
    super.log(msg)
  }
}


let readConfig = (path) => {
  if (shelljs.test('-f', path, {silent: true})) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  }
  else {
    throw new Error(`Unable to read configuration file ${path}`)
  }
}


let childProcessExec = (command, options) => {
  return new Promise(function (resolve) {
    fancyLog(`test: ${command}`)
    return childProcess.exec(command, options, function (err, stdout, stderr, buildControls) {
      return resolve({
        error: err,
        stdout: stdout,
        stderr: stderr
      })
    })
  })
}

let assertBuildControls = (buildControls, length) => {
  expect(buildControls).not.to.equal(null)
  expect(buildControls).to.be.a('array')
  expect(buildControls).to.have.length(length)
  expect(buildControls[0]).to.be.a('object')
  return buildControls
}

/**
 * Tests
 *
 * Each test is using the perspective as a "user", take a look at the "basic deploy" suite.
 *
 * `describe` suite's title should have the same name as the scenario folder.
 *
 * Assumptions:
 *    - each tests' current working directory has been set to `test/mock`
 */
describe('buildcontrol', function () {
  this.timeout(20000)


  beforeEach(function (done) {
    // the describe is the mock folder's name.
    let scenarioPath = this.currentTest.parent.title

    // ensure that we reset to `test/` dir
    shelljs.cd(__dirname)

    // clean testing folder `test/mock`
    fs.removeSync('mock')
    fs.ensureDirSync('mock')

    try {
      // copy scenario to `test/mock`
      fs.copySync('scenarios/' + scenarioPath, 'mock')

      // ensure all tests are are assuming the current working directory is: `test/mock`
      process.chdir('mock')
      done()
    }
    catch (err) {
      if (err && err.code === 'ENOENT') {
        throw new Error(`Could not find scenario ${scenarioPath} in test/scenarios/`)
      }

      throw new Error(err)
    }
  })


  // NOTE: don't pass arrow functions to mocha https://mochajs.org/#arrow-functions

  describe('basic deployment', function () {
    it('should have pushed a file and had the correct commit in "verify" repo', () => {
      // the current working directory is `test/mock/
      return Promise.resolve()
        .then(() => {
          return childProcessExec('git init', {cwd: 'repo'})
        })
        .then(() => {
          return childProcessExec('git add .', {cwd: 'repo'})
        })
        .then(() => {
          return childProcessExec('git commit -m "basic deployment"', {cwd: 'repo'})
        })

        // verify output from grunt
        .then(() => {
          return execScenario(function (err, stdout, stderr, buildControls) {
            expect(err).to.equal(null)

            let bc = assertBuildControls(buildControls, 1)[0]
            expect(bc.sourceName()).to.equal('basic-deployment') // name from package.json
            expect(bc.sourceCommit()).not.to.equal(null)
            expect(bc.sourceBranch()).to.equal('master')
            expect(bc.tagName()).to.equal('v0.0.1')

            expect(stdout).to.contain('Initialized empty Git repository')
            expect(stdout).to.contain('Committing changes to "master".')
            expect(stdout).to.contain('Pushing master to remote-')
          })
        })

        // verify that the commit actually got pushed
        .then(() => {
          return childProcessExec('git rev-parse HEAD', {cwd: 'repo'})
        })
        .then(function (results) {
          // the commit sha from the source repo
          return results.stdout.substr(0, 7)
        })

        .then(function (sha) {
          return childProcessExec('git log --pretty=oneline --no-color', {cwd: 'validate'})
            .then(function (results) {
              expect(results.error).to.equal(null)
              expect(results.stdout).have.string('from commit ' + sha)
            })
        })
    })
  })

  describe('feature branch deployment', function () {
    it('should contain the correct sourceBranch name', () => {
      return Promise.resolve()

        // Test case specific setup
        .then(() => {
          return childProcessExec('git init', {cwd: 'repo'})
        })

        .then(() => {
          return childProcessExec('git checkout -b feature/numbers', {cwd: 'repo'})
        })

        .then(() => {
          return childProcessExec('git add .', {cwd: 'repo'})
        })

        .then(() => {
          return childProcessExec('git commit -m "feature branch deployment"', {cwd: 'repo'})
        })

        // Execute scenario
        .then(() => {
          return execScenario(function (err, stdout, stderr, buildControls) {
            expect(err).to.equal(null)
            let bc = assertBuildControls(buildControls, 1)[0]
            expect(bc.sourceName()).to.equal('repo') // from the parent dir name
            expect(bc.tagName()).to.equal(false)
          })
        })
        .then(() => {
          return childProcessExec('git log -1 --pretty=%B', {cwd: 'validate'})
            .then((results) => {
              let commitMsg = results.stdout.replace(/\n/g, '')
              expect(commitMsg).to.equal('feature/numbers')
            })
        })
    })
  })

  describe('merge multiple repos', function () {

    it('merge multiple repos', () => {
      return execScenario(function (err, stdout, stderr, buildControls) {
        expect(err).to.equal(null)
        let bc = assertBuildControls(buildControls, 2)[1]
        expect(bc.sourceName()).to.equal('repo') // from the parent dir name
        expect(bc.tagName()).to.equal(false)
        //expect(bc.remoteBranchExist()).to.equal(true)


        let numberFile = fs.readFileSync('validate/numbers.txt', {encoding: 'utf8'})
        expect(numberFile).be.eql('0 1 2\n')
      })
    })
  })


  describe('simple deploy', function () {
    it('should deploy multiple times with the correct commit message', () => {
      return Promise.resolve()

        .then(() => {
          return execScenario(function (err, stdout, stderr, buildControls) {
            expect(err).to.equal(null)
            let bc = assertBuildControls(buildControls, 1)[0]

            let numberFile = fs.readFileSync('validate/numbers.txt', {encoding: 'utf8'})
            expect(numberFile).be.eql('1 2 3 4\n')
          })
        })

        .then(() => {
          fs.writeFileSync('repo/dist/numbers.txt', '100 200')

          return execScenario(function (err, stdout, stderr, buildControls) {
            expect(err).to.equal(null)
            let bc = assertBuildControls(buildControls, 1)[0]

            let numberFile = fs.readFileSync('validate/numbers.txt', {encoding: 'utf8'})
            expect(numberFile).be.eql('100 200')
          })
        })

        .then(() => {
          return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: 'validate'})
            .then((results) => {
              expect(results.stdout).have.string('simple deploy commit message')
            })
        })
    })


    it('should not have <TOKEN> in the message', () => {
      return execScenario(function (err, stdout, stderr, buildControls) {
        expect(err).to.not.exist
        expect(stdout).not.have.string('<TOKEN>')
      })
    })
  })

  //
  //describe('secure endpoint',  function() {
  //  it('should not log out secure information', (done) => {
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      execScenario((err, stdout) => {
  //        expect(stdout).not.have.string('privateUsername')
  //        expect(stdout).not.have.string('1234567890abcdef')
  //        expect(stdout).have.string('github.com/pubUsername/temp.git')
  //        expect(stdout).have.string('<CREDENTIALS>')
  //        next()
  //      })
  //    })
  //
  //
  //  })
  //
  //
  //  it('should have the correct remote url in git', (done) => {
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      execScenario(() => {
  //        next()
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git remote -v', {cwd: 'repo/dist'}, (err, stdout) => {
  //        expect(stdout).have.string('https://privateUsername:1234567890abcdef@github.com/pubUsername/temp.git')
  //        next()
  //      })
  //    })
  //
  //
  //  })
  //
  //})
  //
  //
  //describe('untracked branch in src repo',  function() {
  //  it('should track a branch in ../ if it was untracked', (done) => {
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      fs.removeSync('repo')
  //      return childProcessExec('git clone remote repo', next)
  //    })
  //
  //
  //    .then(() => {
  //      fs.ensureDirSync('repo/build')
  //      fs.writeFileSync('repo/build/hello.txt', 'hello world!')
  //      next()
  //    })
  //
  //    //tasks.push((next) { return childProcessExec('git branch --track build origin/build', {cwd: 'repo'}, next) }) =>
  //
  //    .then(() => {
  //      execScenario((err, stdout) => {
  //        next(err)
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git checkout build', {cwd: 'repo'}, (err, stdout) => {
  //        next()
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git log', {cwd: 'repo'}, (err, stdout) => {
  //        expect(stdout).have.string('a build commit')
  //        next()
  //      })
  //    })
  //
  //
  //  })
  //
  //
  //  it('should not set tracking info it branch already exists', (done) => {
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      fs.removeSync('repo')
  //      return childProcessExec('git clone remote repo', next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git branch build', {cwd: 'repo'}, next)
  //    })
  //
  //    .then(() => {
  //      fs.ensureDirSync('repo/build')
  //      fs.writeFileSync('repo/build/hello.txt', 'hello world!')
  //      next()
  //    })
  //
  //    .then(() => {
  //      execScenario((err, stdout) => {
  //        next(err)
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git branch -lvv', {cwd: 'repo'}, (err, stdout) => {
  //        expect(stdout).not.have.string('origin/build')
  //        next()
  //      })
  //    })
  //
  //
  //  })
  //
  //})
  //
  //
  //describe('remote urls',  function() {
  //  function generateRemote(url, cb) {
  //    return Promise.resolve()
  //
  //    // read template
  //    let gruntfile = fs.readFileSync('repo/gruntfile.js', {encoding: 'UTF8'})
  //
  //    // generate template
  //    gruntfile = _.template(gruntfile, {remoteURL: url})
  //
  //    // write generated gruntfile
  //    fs.writeFileSync('repo/gruntfile.js', gruntfile)
  //
  //    // execute grunt command
  //    .then(() => {
  //      //options
  //      GRUNT_EXEC += ' --no-color'
  //
  //      return childProcessExec(GRUNT_EXEC, {cwd: 'repo'}, function (err, stdout, stderr, buildControls){
  //        // mask error because remote paths may not exist
  //        next(null, {stdout: stdout, stderr: stderr})
  //      })
  //    })
  //
  //    // get remote url
  //    .then(() => {
  //      return childProcessExec('git remote -v', {cwd: 'repo/dist'}, (err, stdout) => {
  //        next(err, stdout)
  //      })
  //    })
  //
  //    // callback
  //    async.series(tasks, (err, results) => {
  //      cb(err, results[1])
  //    })
  //  }
  //
  //
  //  let shouldMatch = [
  //    '/path/to/repo.git/',
  //    'path/to/repo.git/',
  //    '/path/to/repo',
  //    //'\\\\path\\\\to\\\\repo',   // assuming works, there's a lot of escaping to be done
  //    'path/to/repo',
  //    'C:/user/repo',
  //    'file:///path/to/repo.git/',
  //    'git://github.com:kevinawoo/temp.git',
  //    'git@github.com:kevinawoo/temp.git',
  //    'http://git.com/path/to/repo.git/',
  //    'https://github.com/user/repo',
  //    'ssh://user@server/project.git',
  //    'user@server:project.git',
  //    '../'
  //  ]
  //
  //
  //  async.each(shouldMatch, (url) => {
  //    it('should have created remote for: ' + url, (done) => {
  //      generateRemote(url, (err, remoteURL) => {
  //        expect(remoteURL).have.string(url)
  //        done()
  //      })
  //    })
  //  })
  //
  //
  //  let shouldNotMatch = [
  //    'origin',
  //    'weird$1+name',
  //    'remote_name',
  //    'remote_name_extended',
  //    'remote-name',
  //    'remote.test'
  //  ]
  //
  //  async.each(shouldNotMatch, (url) => {
  //    it('should not have created remote for: ' + url, (done) => {
  //      generateRemote(url, (err, remoteURL) => {
  //        expect(remoteURL).not.have.string(url)
  //        expect(remoteURL).be.empty
  //        done()
  //      })
  //    })
  //  })
  //
  //})
  //
  //
  //describe('push diff branches',  function() {
  //  it('should push local:stage to stage:master and local:prod to prod:master', (done) => {
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      execScenario((err, stdout) => {
  //        fs.removeSync('validate')  // not needed because there's two diff remotes
  //        next(err)
  //      })
  //    })
  //
  //    .then(() => {
  //      fs.removeSync('stage_validate')
  //      return childProcessExec('git clone stage_remote stage_validate', next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: 'stage_validate'}, (err, stdout) => {
  //        expect(stdout).have.string('first stage commit')
  //        expect(stdout).have.string('new stage commit')
  //        next()
  //      })
  //    })
  //
  //
  //    .then(() => {
  //      fs.removeSync('prod_validate')
  //      return childProcessExec('git clone prod_remote prod_validate', next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: 'prod_validate'}, (err, stdout) => {
  //        expect(stdout).have.string('first prod commit')
  //        expect(stdout).have.string('new prod commit')
  //        next()
  //      })
  //    })
  //
  //
  //  })
  //
  //
  //  it('should do it multiple times', (done) => {
  //    this.timeout(30000)
  //
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      execScenario(next)
  //    })
  //
  //    .then(() => {
  //      fs.writeFileSync('repo/dist/empty_file', 'file not empty anymore')
  //      next()
  //    })
  //
  //    .then(() => {
  //      execScenario(next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git clone stage_remote stage_validate', next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: 'stage_validate'}, (err, stdout) => {
  //        expect(stdout.match(/new stage commit/g)).be.length(2)
  //        next()
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git clone prod_remote prod_validate', next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: 'prod_validate'}, (err, stdout) => {
  //        expect(stdout.match(/new prod commit/g)).be.length(2)
  //        next()
  //      })
  //    })
  //
  //
  //  })
  //})
  //
  //
  //describe('git config',  function() {
  //  it('should set git config variables properly', (done) => {
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      return childProcessExec('git init', {cwd: 'repo/dist'}, next)
  //    })
  //
  //    .then(() => {
  //      execScenario(function (err, stdout, stderr, buildControls){
  //        expect(err).to.not.exist
  //        next(err)
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git config user.name', {cwd: 'repo/dist'}, function (err, stdout, stderr, buildControls){
  //        expect(stdout).have.string('John Doe')
  //        next(err)
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git config user.email', {cwd: 'repo/dist'}, function (err, stdout, stderr, buildControls){
  //        expect(stdout).have.string('johndoe@example.com')
  //        next(err)
  //      })
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git config http.sslVerify', {cwd: 'repo/dist'}, function (err, stdout, stderr, buildControls){
  //        expect(stdout).have.string('false')
  //        next(err)
  //      })
  //    })
  //
  //
  //  })
  //})
  //
  //
  //describe('deploy to named remote',  function() {
  //  it('should have deployed to origin', (done) => {
  //    return Promise.resolve()
  //
  //    .then(() => {
  //      return childProcessExec('git init', {cwd: 'repo/dist'}, next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git remote add origin ../../remote', {cwd: 'repo/dist'}, next)
  //    })
  //
  //    .then(() => {
  //      execScenario(next)
  //    })
  //
  //    .then(() => {
  //      return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: 'validate'}, (err, stdout) => {
  //        expect(stdout).have.string('new grunt-build commit')
  //        next()
  //      })
  //    })
  //
  //
  //  })
  //})
  //
  //
  //describe('force push',  function() {
  //  beforeEach(function(done) => {
  //    return Promise.resolve()
  //
  //    // initialize dist to be a repo and make a commit
  //    // this commit is a "bad" commit
  //    .then(() => {
  //      execScenario(next)
  //    })
  //
  //    // we set our dist repo to be one commit behind remote
  //    .then(() => {
  //      return childProcessExec('git reset --hard HEAD^ ', {cwd: 'repo/dist'}, next)
  //    })
  //
  //
  //    // now we'll go and diverge.
  //    // remember we're 1 behind, 1 ahead
  //    .then(() => {
  //      fs.writeFileSync('repo/dist/numbers.txt', '9 9 9 9')
  //      return childProcessExec('git commit -m "number 3 commit" .', {cwd: 'repo/dist'}, next)
  //    })
  //
  //
  //  })
  //
  //
  //  it('should force push', (done) => {
  //    return Promise.resolve()
  //
  //    // we're now going to push to the remote, since we've commited before
  //    // there will be nothing new to commit. This is just a push to remote
  //    // however, we're forcing remote to track the dist repo.
  //    .then(() => {
  //      execScenario((err, stdout) => {
  //        next(err)
  //      })
  //    })
  //
  //    // the dist repo has 2 commits, namely "number 3 commit"
  //    // and it should not have the old commit "commit to be overwritten"
  //    .then(() => {
  //      return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: 'validate'}, (err, stdout) => {
  //        expect(stdout).have.string('number 3 commit')
  //        expect(stdout).not.have.string('commit to be overwritten')
  //        next()
  //      })
  //    })
  //
  //
  //
  //  })
  //})
  //
  //
  //describe('connect commits',  function() {
  //  it('should not be able to deploy if there is uncommitted files', () => {
  //    return Promise.resolve()
  //
  //      .then(() => {
  //        return childProcessExec('git init', {cwd: 'repo'})
  //      })
  //      .then(() => {
  //        fs.writeFileSync('repo/file.txt', 'brand file contents.\n')
  //        return childProcessExec('git add .', {cwd: 'repo'})
  //      })
  //
  //      .then(() => {
  //        return childProcessExec('git commit -m "first commit"', {cwd: 'repo'})
  //      })
  //
  //      .then(() => {
  //        fs.ensureDirSync('repo/build')
  //        fs.writeFileSync('repo/build/hello.txt', 'hello world!\n')
  //
  //        // pretend there was some unchanged files
  //        fs.writeFileSync('repo/file.txt', 'more content added.\n')
  //        return execScenario(function (err, stdout, stderr, buildControls) {
  //          expect(err).to.not.equal(null)
  //          expect(stdout).to.contain('more content added.')
  //          expect(stdout).to.contain('Warning: There are uncommitted changes in your working directory.')
  //        })
  //      })
  //  })
  //})
})
