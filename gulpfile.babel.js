import gulp from 'gulp'
import {Preset, Clean, Mocha, RollupEs, RollupCjs, EsLint, TaskSeries} from 'gulp-pipeline/src/index'

let preset = Preset.nodeSrc()

// instantiate ordered array of recipes (for each instantiation the tasks will be created e.g. rollup:es and rollup:es:watch)
let recipes = [
  new Clean(gulp, preset),
  new EsLint(gulp, preset),
  new Mocha(gulp, preset, {debug:true}),
  [
    new RollupEs(gulp, preset, {options: {dest: 'build-control.es.js'}}),
    new RollupCjs(gulp, preset,{options: {dest: 'build-control.cjs.js'}})
  ]
]


// Simple helper to create the `default` and `default:watch` tasks as a sequence of the recipes already defined
new TaskSeries(gulp, 'default', recipes)
