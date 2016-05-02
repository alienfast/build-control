[![NPM version][npm-image]][npm-url]

# build-control

Build control using git exposed as ES2015 modules

## Usage

1. Install

    `npm install --save-dev build-control`

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

## Credits

Most of this code was inspired by [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control). 


[npm-url]: https://www.npmjs.com/package/build-control
[npm-image]: https://img.shields.io/npm/v/build-control.svg
[travis-url]: https://travis-ci.org/alienfast/build-control
[travis-image]: https://img.shields.io/travis/alienfast/build-control.svg
