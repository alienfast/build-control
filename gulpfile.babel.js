import gulp from 'gulp'
import {Prepublish, PublishBuild, Clean, EsLint, Mocha, Preset, RollupEs, RollupCjs, Aggregate, series, parallel} from 'gulp-pipeline/src/index'

let preset = Preset.nodeSrc()

// instantiate ordered array of recipes (for each instantiation the tasks will be created e.g. rollup:es and rollup:es:watch)
let rollup = series(gulp,
  new Clean(gulp, preset),
  parallel(gulp,
    new RollupEs(gulp, preset, {options: {dest: 'build-control.es.js'}}),
    new RollupCjs(gulp, preset, {options: {dest: 'build-control.cjs.js'}})
  )
)

let recipes = series(gulp,
  new EsLint(gulp, preset),
  new Mocha(gulp, preset, {debug: false}),
  rollup
)

let buildControlConfig = {
  debug: false,
  options: {}
}
let prepublish = new Prepublish(gulp, preset, buildControlConfig)
let publishBuild = new PublishBuild(gulp, preset, buildControlConfig)

// Simple helper to create the `default` and `default:watch` tasks as a sequence of the recipes already defined
new Aggregate(gulp, 'default', recipes, {debug: false})
new Aggregate(gulp, 'rollup', rollup)
new Aggregate(gulp, 'publish', series(gulp, prepublish, recipes, publishBuild))



