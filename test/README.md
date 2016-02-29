# Tests
Tests can be executed by running
```bash
gulp mocha
```
or 
```bash
gulp mocha:watch
```



## Layout
```
test/
    tests.js        - contains tests to be executed
    mock/      		- [auto gen] testing area for any given scenario
    	repo/		- repository to do tests on
        remote/     - [auto gen] "remote", imagine it as a github repo
        validate/   - [auto gen] `git clone remote validate` produces this folder
    scenarios/      - different scenarios to be executed
        exampleA/
        ...
```

#### Notes

- All tests are executed with the relative path being: `test/mock/`
- The filesystem remote path is usually `../../remote`
- Set `commit.ensure: false` if there's no need to track the source repo, i.e. an extra call to `git init` the folder `repo/`


# Usage Example/Workflow
Still confused? Imagine a `basic deployment` scenario [test/scenarios/basic deployment](/test/scenarios/basic%20deployment)

- Scenario directory: "scenarios/basic deployment/"
- Source code is in "/*"
- Deploy code is in "dist/*"

The test case can be found in "/test/tests.js", high level test flow:
	- purge `mock/`
	- copy `scenarios/basic deployment/**` to `mock/`
	- change working directory to `mock/`
	- execute the test case named `basic deployment`

The "basic deployment" test case does the following:
	- setup
	- runs execScenario()
		- which executes `new BuildControl(config).run()`
		- which executes `git clone remote validate`
	- does validations

How does mocha know which scenario folder to copy? By the `describe` suite name.
