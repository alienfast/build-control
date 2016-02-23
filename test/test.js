import BuildControl from '../src/build_control'
import Paths from '../src/paths'
import chai from 'chai'
import glob from 'glob'
import path from 'path'
import fs from 'fs-extra'
import childProcess from 'child_process'
import shelljs from 'shelljs'
//import _ from 'lodash'
import Promise from 'bluebird'
import fancyLog from 'fancy-log'
import stringify from 'stringify-object'
import extend from 'extend'

let expect = chai.expect
let debug = false


/**
 * Executes a Scenario given by tests.
 * The `describe` block needs to correspond with the name of the Mock folder to be tested
 *
 * A Scenario contains:
 *    repo - the folder to contain the repository
 *    remote - (optional) folder to be the stand in for the the cloud repository
 *    validate - (will be overwritten) its cloned from remote/ (used to validate a push)
 *
 **
 * NOTE: this function DOES change the process's working directory to the `scenario` so that
 * validations are easier access.
 *
 * @param {scenarioCallback} assertionCallback - The callback that handles the response
 */
const PATH_MOCK = path.join(__dirname, 'mock')
const PATH_MOCK_REPO = path.join(PATH_MOCK, 'repo')
const PATH_MOCK_VALIDATE = path.join(PATH_MOCK, 'validate')
const PATH_MOCK_REMOTE = path.join(PATH_MOCK, 'remote')
const PATH_MOCK_REPO_DIST = path.join(PATH_MOCK_REPO, 'dist')


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
describe('BuildControl', function () {
  this.timeout(20000)

  describe('basics', function () {
    // WARNING: we are looking direct at the scenario fixture here, DO NOT #run()
    it('should resolve from package.json', () => {
      // the current working directory is `test/mock/
      return Promise.resolve()
        .then(() => {
          let scenarioCwd = path.join(scenarioPath('basic deployment'), 'repo')
          let configurations = [{
            sourceCwd: scenarioCwd,
            remote: {
              repo: "../../remote"
            },
            branch: "master"
          }]

          let buildControls = buildConfigurations(configurations, false)
          let bc = assertBuildControls(buildControls, 1)[0]
          expect(bc.config.sourceCwd).to.equal(scenarioCwd)
          expect(bc.config.cwd).to.equal(path.join(scenarioCwd, 'dist'))
          expect(bc.sourceName()).to.equal('basic-deployment') // name from package.json
          expect(bc.sourceCommit()).not.to.equal(null)
          expect(bc.sourceBranch()).to.equal('master')
          expect(bc.tagName()).to.equal('v0.0.1')
        })
    })

    it('should resolve from directory', () => {
      // the current working directory is `test/mock/
      return Promise.resolve()
        .then(() => {
          let scenarioCwd = path.join(scenarioPath('connect commits'), 'repo')
          let configurations = [{
            sourceCwd: scenarioCwd,
            cwd: 'build',
            branch: 'build',
            remote: {repo: '../'},
            connectCommits: true
          }]

          // NOTE: we are looking direct at the fixture here, DO NOT #run()
          let buildControls = buildConfigurations(configurations, false)
          let bc = assertBuildControls(buildControls, 1)[0]
          expect(bc.config.sourceCwd).to.equal(scenarioCwd)
          expect(bc.config.cwd).to.equal(path.join(scenarioCwd, 'build'))
          expect(bc.sourceName()).to.equal('repo')
          expect(bc.sourceCommit()).not.to.equal(null)
          expect(bc.sourceBranch()).to.equal('master')
          expect(bc.tagName()).to.equal(false)
        })
    })
  })

  describe('scenarios', function () {

    beforeEach(function (done) {
      let from = scenarioPath(this.currentTest.parent.title)
      let to = PATH_MOCK

      // clean testing folder `test/mock`
      fs.removeSync(to)
      fs.ensureDirSync(to)

      try {
        fancyLog(`Copying from ${from} to ${to}...`)
        // copy scenario to `test/mock`
        fs.copySync(from, to)

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
      let configurations = [
        {
          remote: {
            repo: "../../remote"
          },
          branch: "master"
        }
      ]

      it('should have pushed a file and had the correct commit in "validate" repo', () => {
        // the current working directory is `test/mock/
        return Promise.resolve()
          .then(() => {
            return gitInit()
          })
          .then(() => {
            return gitAdd()
          })
          .then(() => {
            return gitCommit("basic deployment")
          })
          .then(() => {
            // verify output
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
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
          .then(() => {
            // verify that the commit actually got pushed
            return childProcessExec('git rev-parse HEAD', {cwd: PATH_MOCK_REPO})
          })
          .then(function (results) {
            // the commit sha from the source repo
            return results.stdout.substr(0, 7)
          })
          .then(function (sha) {
            return childProcessExec('git log --pretty=oneline --no-color', {cwd: PATH_MOCK_VALIDATE})
              .then(function (results) {
                expect(results.error).to.equal(null)
                expect(results.stdout).to.contain('from commit ' + sha)
              })
          })
      })
    })

    describe('feature branch deployment', function () {
      let configurations = [
        {
          remote: {
            repo: "../../remote"
          },
          branch: "master",
          connectCommits: false,
          commit: {
            template: "%sourceBranch%"
          }
        }
      ]
      it('should contain the correct sourceBranch name', () => {
        return Promise.resolve()
          // Test case specific setup
          .then(() => {
            return gitInit()
          })
          .then(() => {
            return childProcessExec('git checkout -b feature/numbers', {cwd: PATH_MOCK_REPO})
          })
          .then(() => {
            return gitAdd()
          })
          .then(() => {
            return gitCommit("feature branch deployment")
          })
          .then(() => {
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
              expect(err).to.equal(null)
              let bc = assertBuildControls(buildControls, 1)[0]
              expect(bc.sourceName()).to.equal('repo') // from the parent dir name
              expect(bc.tagName()).to.equal(false)
            })
          })
          .then(() => {
            return childProcessExec('git log -1 --pretty=%B', {cwd: PATH_MOCK_VALIDATE})
              .then((results) => {
                let commitMsg = results.stdout.replace(/\n/g, '')
                expect(commitMsg).to.equal('feature/numbers')
              })
          })
      })
    })

    describe('merge multiple repos', function () {
      let configurations = [
        {
          remote: {
            repo: "../../remote"
          },
          connectCommits: false,
          branch: "master",
          cwd: "setup",
          commit: {
            template: "setup commit"
          }
        },
        {
          remote: {
            repo: "../../remote"
          },
          connectCommits: false,
          branch: "master",
          commit: {
            template: "test commit"
          }
        }
      ]

      it('merge multiple repos', () => {
        return execScenario(configurations, function (err, stdout, stderr, buildControls) {
          expect(err).to.equal(null)
          let bc = assertBuildControls(buildControls, 2)[1]
          expect(bc.sourceName()).to.equal('repo') // from the parent dir name
          expect(bc.tagName()).to.equal(false)
          //expect(bc.remoteBranchExist()).to.equal(true)

          let numberFile = fs.readFileSync(path.join(PATH_MOCK_VALIDATE, 'numbers.txt'), {encoding: 'utf8'})
          expect(numberFile).be.eql('0 1 2\n')
        })
      })
    })

    describe('simple deploy', function () {

      let configurations = [
        {
          remote: {
            repo: "../../remote"
          },
          branch: "master",
          connectCommits: false,
          commit: {
            template: "simple deploy commit message"
          }
        }
      ]

      it('should deploy multiple times with the correct commit message', () => {
        return Promise.resolve()
          .then(() => {
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
              expect(err).to.equal(null)
              let bc = assertBuildControls(buildControls, 1)[0]

              let numberFile = fs.readFileSync(path.join(PATH_MOCK_VALIDATE, 'numbers.txt'), {encoding: 'utf8'})
              expect(numberFile).be.eql('1 2 3 4\n')
            })
          })

          .then(() => {
            fs.writeFileSync(path.join(PATH_MOCK_REPO_DIST, 'numbers.txt'), '100 200')

            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
              expect(err).to.equal(null)
              let bc = assertBuildControls(buildControls, 1)[0]

              let numberFile = fs.readFileSync(path.join(PATH_MOCK_VALIDATE, 'numbers.txt'), {encoding: 'utf8'})
              expect(numberFile).be.eql('100 200')
            })
          })

          .then(() => {
            return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: PATH_MOCK_VALIDATE})
              .then((results) => {
                expect(results.stdout).to.contain('simple deploy commit message')
              })
          })
      })
    })

    describe('secure endpoint', function () {

      let configurations = [
        {
          remote: {
            repo: "https://github.com/pubUsername/temp.git",
            login: "privateUsername",
            token: "1234567890abcdef"
          },
          branch: "master",
          commit: {
            template: "secure endpoint commit message"
          },
          connectCommits: false
        }
      ]

      it('should mask sensitive information', () => {
        return Promise.resolve()
          .then(() => {
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
              expect(stdout).not.to.contain('privateUsername')
              expect(stdout).not.to.contain('1234567890abcdef')
              expect(stdout).to.contain('<credentials>@github.com/pubUsername/temp.git')
            }, true)
          })
          .then(() => {
            // 'should have the correct remote url in git'
            return childProcessExec('git remote -v', {cwd: PATH_MOCK_REPO_DIST})
              .then((results) => {
                expect(results.stdout).to.contain('https://privateUsername:1234567890abcdef@github.com/pubUsername/temp.git')
                expect(results.stdout).not.to.contain('<credentials>@github.com/pubUsername/temp.git')
              })
          })
      })
    })

    describe('untracked branch in src repo', function () {

      let configurations = [
        {
          remote: {
            repo: "../"
          },
          cwd: "build",
          branch: "build",
          connectCommits: false,
          commit: {
            template: "a build commit for the untracked branch scenario"
          }
        }
      ]

      it('should track a branch in ../ if it was untracked', () => {
        return Promise.resolve()
          .then(() => {
            fs.removeSync(PATH_MOCK_REPO)
            return childProcessExec('git clone remote repo', {cwd: PATH_MOCK})
          })
          .then(() => {
            fs.ensureDirSync(path.join(PATH_MOCK_REPO, 'build'))
            fs.writeFileSync(path.join(PATH_MOCK_REPO, 'build/hello.txt'), 'hello world!')
          })
          .then(() => {
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
            })
          })
          .then(() => {
            return childProcessExec('git checkout build', {cwd: PATH_MOCK_REPO})
          })
          .then(() => {
            return childProcessExec('git log', {cwd: PATH_MOCK_REPO})
              .then((results) => {
                expect(results.stdout).to.contain('a build commit for the untracked branch scenario')
              })
          })
      })

      it('should not set tracking info if branch already exists', () => {
        return Promise.resolve()
          .then(() => {
            fs.removeSync(PATH_MOCK_REPO)
            return childProcessExec('git clone remote repo', {cwd: PATH_MOCK})
          })
          .then(() => {
            return childProcessExec('git branch build', {cwd: PATH_MOCK_REPO})
          })
          .then(() => {
            fs.ensureDirSync(path.join(PATH_MOCK_REPO, 'build'))
            fs.writeFileSync(path.join(PATH_MOCK_REPO, 'build/hello.txt'), 'hello world!')
          })
          .then(() => {
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {

            })
          })
          .then(() => {
            return childProcessExec('git branch -lvv', {cwd: PATH_MOCK_REPO}).then((results) => {
              expect(results.stdout).not.to.contain('origin/build')
            })
          })
      })
    })

    describe('remote urls', function () {

      let configurations = (url) => {
        return [
          {
            cwd: 'dist',
            branch: 'master',
            remote: {
              repo: url
            },
            connectCommits: false,
            commit: {
              auto: false
            },
            push: false
          }
        ]
      }

      let shouldMatch = [
        '/path/to/repo.git/',
        'path/to/repo.git/',
        '/path/to/repo',
        'path/to/repo',
        'C:/user/repo',
        'file:///path/to/repo.git/',
        'git://github.com:kevinawoo/temp.git',
        'git@github.com:kevinawoo/temp.git',
        'http://git.com/path/to/repo.git/',
        'https://github.com/user/repo',
        'ssh://user@server/project.git',
        'user@server:project.git',
        '../'
      ]

      for (let url of shouldMatch) {
        it('should have created remote for: ' + url, () => {
          return Promise.resolve()
            .then(() => {
              return execScenario(configurations(url), function (err, stdout, stderr, buildControls) {

              })
            })
            // get remote url
            .then(() => {
              return childProcessExec('git remote -v', {cwd: PATH_MOCK_REPO_DIST})
                .then((results) => {

                  fancyLog(`\n*******************\n${stringify(results)}`)

                  expect(results.stdout).to.contain(url)
                })
            })
        })
      }
      let shouldNotMatch = [
        'origin',
        'weird$1+name',
        'remote_name',
        'remote_name_extended',
        'remote-name',
        'remote.test'
      ]

      for (let url of shouldNotMatch) {

        it('should not have created remote for: ' + url, () => {

          return Promise.resolve()
            .then(() => {
              return execScenario(configurations(url), function (err, stdout, stderr, buildControls) {

              })
            })
            // get remote url
            .then(() => {
              return childProcessExec('git remote -v', {cwd: PATH_MOCK_REPO_DIST})
                .then((results) => {

                  //fancyLog(`\n*******************\n${stringify(results)}`)
                  expect(results.stdout).not.to.contain(url)
                  expect(results.stderr).not.to.contain(url)
                })
            })
        })
      }
    })

    describe('push diff branches', function () {

      let configurations = [
        {
          connectCommits: false,
          remote: {
            repo: '../../stage_remote',
            branch: 'master'
          },
          branch: 'stage',
          commit: {template: 'new stage commit'}
        },
        {
          connectCommits: false,
          remote: {
            repo: '../../prod_remote',
            branch: 'master'
          },
          branch: 'prod',
          commit: {template: 'new prod commit'}
        }
      ]

      it('should push local:stage to stage:master and local:prod to prod:master', () => {
        return Promise.resolve()

          .then(() => {
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
              fs.removeSync(PATH_MOCK_VALIDATE)  // not needed because there's two diff remotes
            })
          })
          .then(() => {
            fs.removeSync('stage_validate', {cwd: PATH_MOCK})
            return childProcessExec('git clone stage_remote stage_validate', {cwd: PATH_MOCK})
          })
          .then(() => {
            return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: path.join(PATH_MOCK, 'stage_validate')})
              .then((results) => {
                expect(results.stdout).to.contain('first stage commit')
                expect(results.stdout).to.contain('new stage commit')
              })
          })
          .then(() => {
            fs.removeSync('prod_validate', {cwd: PATH_MOCK})
            return childProcessExec('git clone prod_remote prod_validate', {cwd: PATH_MOCK})
          })
          .then(() => {
            return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: path.join(PATH_MOCK, 'prod_validate')})
              .then((results) => {
                expect(results.stdout).to.contain('first prod commit')
                expect(results.stdout).to.contain('new prod commit')

              })
          })
      })


      it('should do it multiple times', () => {
        this.timeout(30000)

        return Promise.resolve()

          .then(() => {
            return execScenario(configurations)
          })
          .then(() => {
            fs.writeFileSync(path.join(PATH_MOCK_REPO_DIST, 'empty_file'), 'file not empty anymore')
          })
          .then(() => {
            return execScenario(configurations)
          })
          .then(() => {
            return childProcessExec('git clone stage_remote stage_validate', {cwd: PATH_MOCK})
          })
          .then(() => {
            return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: path.join(PATH_MOCK, 'stage_validate')})
              .then((results) => {
                expect(results.stdout.match(/new stage commit/g)).be.length(2)
              })
          })
          .then(() => {
            return childProcessExec('git clone prod_remote prod_validate', {cwd: PATH_MOCK})
          })
          .then(() => {
            return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: path.join(PATH_MOCK, 'prod_validate')})
              .then((results) => {
                expect(results.stdout.match(/new prod commit/g)).be.length(2)

              })
          })
      })
    })


    describe('git config', function () {

      let configurations = [{
        git: {
          config: {
            'user.name': "John Doe",
            'user.email': "johndoe@example.com",
            'http.sslVerify': false
          }
        },
        remote: {repo: '../../remote'},
        connectCommits: false,
        branch: 'master',
        commit: {template: 'git config deploy message'}
      }]

      it('should set git config variables properly', () => {
        return Promise.resolve()

          .then(() => {
            return childProcessExec('git init', {cwd: PATH_MOCK_REPO_DIST})
          })

          .then(() => {
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
              expect(err).to.equal(null)
            })
          })
          .then(() => {
            return childProcessExec('git config user.name', {cwd: PATH_MOCK_REPO_DIST}).then(function (results) {
              expect(results.stdout).to.contain('John Doe')
            })
          })
          .then(() => {
            return childProcessExec('git config user.email', {cwd: PATH_MOCK_REPO_DIST}).then(function (results) {
              expect(results.stdout).to.contain('johndoe@example.com')
            })
          })
          .then(() => {
            return childProcessExec('git config http.sslVerify', {cwd: PATH_MOCK_REPO_DIST}).then(function (results) {
              expect(results.stdout).to.contain('false')
            })
          })
      })
    })

    describe('deploy to named remote', function () {

      let configurations = [{
        remote: {
          name: 'origin',
          repo: '../../remote'
        },
        connectCommits: false,
        branch: 'master',
        commit: {template: 'new deploy to named remote commit'}
      }]

      it('should have deployed to origin', () => {
        return Promise.resolve()

          .then(() => {
            return childProcessExec('git init', {cwd: PATH_MOCK_REPO_DIST})
          })
          .then(() => {
            return childProcessExec('git remote add origin ../../remote', {cwd: PATH_MOCK_REPO_DIST})
          })
          .then(() => {
            return execScenario(configurations)
          })
          .then(() => {
            return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: PATH_MOCK_VALIDATE}).then((results) => {
              expect(results.stdout).to.contain('new deploy to named remote commit')
            })
          })
      })
    })


    describe('force push', function () {

      let overrwrittenMessage = '(this commit should not appear in the final log)'
      let configurations = [{
        remote: {repo: '../../remote'},
        connectCommits: false,
        force: true,
        branch: 'master',
        commit: {template: `1st commit ${overrwrittenMessage}`}
      }]

      it('should force push', () => {
        return Promise.resolve()
          .then(() => {
            // initialize dist to be a repo and make a commit, this commit is a "bad" commit with the '6 7 8 9' numbers.txt
            return execScenario(configurations)
          })
          .then(() => {
            // sanity check, make sure our reset worked
            let numberFile = fs.readFileSync(path.join(PATH_MOCK_REPO_DIST, 'numbers.txt'), {encoding: 'utf8'})
            expect(numberFile).be.eql('6 7 8 9\n')
          })
          .then(() => {
            // we set our dist repo to be one commit behind remote
            return childProcessExec('git reset --hard HEAD^ ', {cwd: PATH_MOCK_REPO_DIST})
              .then(() => {
                // sanity check, make sure our reset worked
                let numberFile = fs.readFileSync(path.join(PATH_MOCK_REPO_DIST, 'numbers.txt'), {encoding: 'utf8'})
                expect(numberFile).be.eql('1 2 3 4\n')
              })
          })
          .then(() => {
            // now we'll go and diverge, remember we're 1 behind, 1 ahead
            fs.writeFileSync(path.join(PATH_MOCK_REPO_DIST, 'numbers.txt'), '9 9 9 9\n')
            gitAdd(PATH_MOCK_REPO_DIST)
            return gitCommit("3rd commit", PATH_MOCK_REPO_DIST)
          })
          .then(() => {
            // sanity check
            let numberFile = fs.readFileSync(path.join(PATH_MOCK_REPO_DIST, 'numbers.txt'), {encoding: 'utf8'})
            expect(numberFile).be.eql('9 9 9 9\n')
          })
          .then(() => {
            // We're now going to push to the remote, since we've committed before
            // there will be nothing new to commit. This is just a push to remote
            // however, we're forcing remote to track the dist repo.
            configurations[0].commit.template = `2nd commit ${overrwrittenMessage} (data should be unchanged from 1st commit)`
            return execScenario(configurations)
          })
          .then(() => {
            // the dist repo has 2 commits, namely "3rd commit"
            // and it should not have the old commit "intentional bad commit ${overrwrittenMessage}"
            return childProcessExec('git log --pretty=oneline --abbrev-commit --no-color', {cwd: PATH_MOCK_VALIDATE})
              .then((results) => {
                expect(results.stdout).to.contain('3rd commit')
                expect(results.stdout).not.to.contain(overrwrittenMessage)
              })
          })
      })
    })

    describe('connect commits', function () {

      let configurations = [{
        cwd: 'build',
        branch: 'build',
        remote: {repo: '../'},
        connectCommits: true
      }]

      it('should not be able to deploy if there is uncommitted files', () => {
        return Promise.resolve()
          .then(() => {
            return gitInit()
          })
          .then(() => {
            fs.writeFileSync(path.join(PATH_MOCK_REPO, 'file.txt'), 'brand file contents.\n')
            return gitAdd()
          })
          .then(() => {
            return gitCommit("first commit")
          })
          .then(() => {
            fs.ensureDirSync(path.join(PATH_MOCK_REPO, 'build'))
            fs.writeFileSync(path.join(PATH_MOCK_REPO, 'build/hello.txt'), 'hello world!\n')

            // pretend there was some unchanged files
            fs.writeFileSync(path.join(PATH_MOCK_REPO, 'file.txt'), 'more content added.\n')
            return execScenario(configurations, function (err, stdout, stderr, buildControls) {
              expect(err).to.equal(null)
              expect(stdout).to.contain('more content added.')
              // should be in both, the last part is really just testing test code, but useful because test errors on allowErrors is hairy otherwise.
              expect(stdout).to.contain('There are uncommitted changes in your working directory.')
              expect(stderr).to.contain('There are uncommitted changes in your working directory.')
            }, true)
          })
      })
    })
  })
})

let buildConfigurations = (configurations, logCapture = true) => {
  let buildControls = []

  for (let config of configurations) {
    config['debug'] = debug

    // modify the cwd to be based off of the mock dir instead of our root dir
    if (config.sourceCwd) {
      config.sourceCwd = Paths.resolveCwd(PATH_MOCK_REPO, config.sourceCwd)
    }
    else {
      // test config didn't have it, set the same default as BuildControl
      config.sourceCwd = PATH_MOCK_REPO
    }

    //capture the logs and verify the output
    let buildControl = null
    if (logCapture) {
      buildControl = new LogCaptureBuildControl(config)
    }
    else {
      buildControl = new BuildControl(config)
    }

    buildControls.push(buildControl)
  }
  return buildControls
}


let execScenario = (configurations, assertionCallback = null, allowErrors = false) => {
  return Promise.resolve()
    // create the "remote" to be pushed to
    .tap(() => {
      fs.ensureDirSync(PATH_MOCK_REMOTE)
      return childProcessExec('git init --bare', {cwd: PATH_MOCK_REMOTE})
    })
    .then(() => {
      let stderr = null
      // for each configuration, run an instance of BuildControl
      fancyLog(`\n\n\n------------------------------------------`)
      let buildControls = buildConfigurations(configurations)

      //capture the logs and verify the output
      let logs = ``
      for (let buildControl of buildControls) {
        try {
          buildControl.run()
        }
        catch (error) {
          if (stderr === null) {
            stderr = ``
          }
          stderr += `${error}\n`
          //fancyLog(stringify(error))

          if (!allowErrors) {
            throw error
          }
          else {
            fancyLog(`Errors are expected on this test`)
          }
        }
        logs += buildControl.allLogs()
      }

      return {error: null, stdout: logs, stderr: stderr, buildControls: buildControls}
    })
    .tap(() => {
      // clone the "remote" into "verify/"
      fs.removeSync(PATH_MOCK_VALIDATE) // since we're cloning from `remote/` we'll just remove the folder if it exists
      return childProcessExec('git clone remote validate', {cwd: PATH_MOCK})
    })
    .then((processOutput) => {
      if (assertionCallback) {
        return assertionCallback(processOutput.error, processOutput.stdout, processOutput.stderr, processOutput.buildControls)
      }
      else {
        return
      }
    })
}

/**
 * Simple test helper to capture the output
 */
const LogCaptureBuildControl = class extends BuildControl {

  constructor(config = {}) {
    super(config)
    this.logs = []

    // hack to get the git messages as well
    this.originalGitLog = this.git.log
    this.git.log = ((msg, level) => {
      this.pushLog(msg, level)
      this.originalGitLog(msg, level)
    })
  }

  log(msg, level) {
    this.pushLog(msg, level)
    super.log(msg, level)
  }

  // mimic the log output, and don't capture debug
  pushLog(msg, level) {
    if (level === undefined || !level.includes('debug'))
      this.logs.push(this.maskSensitive(msg))
  }

  allLogs() {
    return this.logs.join('\n')
  }
}

const childProcessExec = (command, options) => {
  return new Promise(function (resolve) {
    fancyLog(`[test.js]: ${command} in cwd: ${options.cwd}`)
    return childProcess.exec(command, options, function (err, stdout, stderr, buildControls) {
      return resolve({
        error: err,
        stdout: stdout,
        stderr: stderr
      })
    })
  })
}

const assertBuildControls = (buildControls, length) => {
  expect(buildControls).not.to.equal(null)
  expect(buildControls).to.be.a('array')
  expect(buildControls).to.have.length(length)
  expect(buildControls[0]).to.be.a('object')
  return buildControls
}

const gitInit = (cwd = PATH_MOCK_REPO) => {
  return childProcessExec('git init', {cwd: cwd}).then(logOutput)
}

const gitAdd = (cwd = PATH_MOCK_REPO) => {
  return childProcessExec('git add .', {cwd: cwd}).then(logOutput)
}

const gitCommit = (msg, cwd = PATH_MOCK_REPO) => {
  return childProcessExec(`git commit -m "${msg}"`, {cwd: cwd}).then(logOutput)
}

const scenarioPath = (name) => {
  return path.join(__dirname, `scenarios/${name}`)
}

const logOutput = (results) => {
  if (results.err) {
    fancyLog(`[test.js][err] ${results.err}`)
  }
  if (results.stdout) {
    fancyLog(`[test.js][stdout] ${results.stdout}`)
  }
  if (results.stderr) {
    fancyLog(`[test.js][stderr] ${results.stderr}`)
  }
}

