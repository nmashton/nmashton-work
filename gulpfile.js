var gulp = require('gulp');
var connect = require('gulp-connect');
var fm = require('gulp-front-matter');
var marked = require('gulp-marked');

var DIST = 'dist';

gulp.task('connect', function () {
  connect.server({
    root: DIST
  });
});

gulp.task('pages', function () {
  gulp.src('./src/pages/*.md')
    .pipe(fm())
    .pipe(marked())
    .pipe(gulp.dest(DIST));
});

gulp.task('default', ['pages', 'connect']);
