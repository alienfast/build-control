# build-control

Build control using git exposed as ES2015 modules

**WORK IN PROGRESS**

## Usage

1. Install

    `npm install --save-dev build-control`

1. Use

    ```javascript
    import BuildControl from 'build-control'
    
    new BuildControl({}).run()
    ```

## Options

Please see the [`BuildControl` class](https://github.com/alienfast/build-control/blob/master/src/buildControl.js#L11) for a list of configuration options.

## Credits

Most of this code was inspired by [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control). 
