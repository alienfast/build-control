import gulp from 'gulp'
import {Prepublish, PublishBuild, Clean, EsLint, Mocha, Preset, RollupEs, RollupCjs, Aggregate, series, parallel} from 'gulp-pipeline/src/index'

const preset = Preset.nodeSrc()

// instantiate ordered array of recipes (for each instantiation the tasks will be created e.g. rollup:es and rollup:es:watch)
const rollup = new Aggregate(gulp, 'rollup',
  series(gulp,
    new Clean(gulp, preset),
    parallel(gulp,
      new RollupEs(gulp, preset, {options: {dest: 'build-control.es.js'}}),
      new RollupCjs(gulp, preset, {options: {dest: 'build-control.cjs.js'}})
    )
  )
)

// Create the `default` and `default:watch` tasks as a sequence of the recipes already defined
const recipes = new Aggregate(gulp, 'default',
  series(gulp,
    new EsLint(gulp, preset),
    new Mocha(gulp, preset, {debug: false}),
    rollup
  )
)

//---------------
// Publish tasks

// `publish`, gives us a `publish:watch` as well if we so desire to use it
new Aggregate(gulp, 'publish',
  series(gulp,
    new Prepublish(gulp, preset),
    recipes,
    new PublishBuild(gulp, preset)
  )
)
