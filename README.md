[![NPM version][npm-image]][npm-url]

# build-control

Build control using git exposed as ES2015 modules

## Install

`npm install --save-dev build-control`


## Usage

1. Direct use

    ```javascript
    import BuildControl from 'build-control'
    
    let bc = new BuildControl({})
    
    // bump version
    bc.npm.bump()

    // check before a long test run
    bc.prepublishCheck()
    
    // run it 
    bc.run()
    
    // publish on npm
    bc.npm.publish()
    ```

1. Use with [gulp-pipeline](https://github.com/alienfast/gulp-pipeline)

  See [this project's `gulpfile.babel.js`](blob/master/gulpfile.babel.js) for a full example.

  1. `gulpfile.babel.js`

    ```javascript
    import gulp from 'gulp'
    import {Prepublish, PublishBuild} from 'gulp-pipeline'
    
    new Prepublish(gulp, preset, buildControlConfig)
    new PublishBuild(gulp, preset, buildControlConfig)
    ```

  2. Run it

      ```javascript
      gulp prepublish
      gulp publishBuild
      ```

## Options

Please see the [`BuildControl` class](https://github.com/alienfast/build-control/blob/master/src/buildControl.js#L11) for a list of configuration options.

## Projects using `build-control` through `gulp-pipeline`
  Be sure to check out their `dist` branch to see what the default distribution looks like when using [gulp-pipeline's](https://github.com/alienfast/gulp-pipeline) `Prepublish`, `PublishBuild`, `PublishGhPages`, and `PublishNpm` which delegate directly to `build-control`. 
  - [keys.js](https://github.com/alienfast/key.js) - very simple ES2015 setup with Mocha tests + automatic deployment (tag + `dist` branch + npm)
  - [picker.js](https://github.com/alienfast/picker.js) - SCSS + ES2015 + Mocha PhantomJs tests written as ES2015 + automatic deployment (tag + `dist` branch + npm)
  - [bulid-control](https://github.com/alienfast/build-control) - ES2015 with automatic deployment using itself through `gulp-pipeline` 
  - [bootstrap-material-design](https://github.com/FezVrasta/bootstrap-material-design/tree/v4-dev) - complex fully custom setup ES2015 + SCSS + independent DOCS pipeline + Jekyll + automatic deployment (tag + `dist` branch + npm)


## Credits

Most of this code was inspired by [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control). 


[npm-url]: https://www.npmjs.com/package/build-control
[npm-image]: https://img.shields.io/npm/v/build-control.svg
[travis-url]: https://travis-ci.org/alienfast/build-control
[travis-image]: https://img.shields.io/travis/alienfast/build-control.svg
