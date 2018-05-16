
const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')
const watch = require('gulp-watch')

gulp.task('transpile', function () {
  return watch('./src/**/*', { ignoreInitial: false })
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('nodemon', function () {
  nodemon({
    script: './build/app.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['transpile', 'nodemon']);
