import gulp from 'gulp'
import {Prepublish, PublishBuild, Clean, EsLint, Mocha, Preset, RollupEs, RollupCjs, TaskSeries} from 'gulp-pipeline/src/index'

let preset = Preset.nodeSrc()

// instantiate ordered array of recipes (for each instantiation the tasks will be created e.g. rollup:es and rollup:es:watch)
let rollup = [
  new Clean(gulp, preset),
  new RollupEs(gulp, preset, {options: {dest: 'build-control.es.js'}}),
  new RollupCjs(gulp, preset, {options: {dest: 'build-control.cjs.js'}})
]

let recipes = [
  new EsLint(gulp, preset),
  new Mocha(gulp, preset, {debug: false}),
  rollup
]

let buildControlConfig = {
  debug: true,
  options: {
    tag: {
      existsFailure: false
    }
  }
}
let prepublish = new Prepublish(gulp, preset, buildControlConfig)
let publishBuild = new PublishBuild(gulp, preset, buildControlConfig)

// Simple helper to create the `default` and `default:watch` tasks as a sequence of the recipes already defined
new TaskSeries(gulp, 'default', recipes, {debug: false})
new TaskSeries(gulp, 'rollup', rollup)
new TaskSeries(gulp, 'publish', [prepublish].concat(recipes).concat(publishBuild), {debug: false})



