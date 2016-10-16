var gulp = require('gulp');
var connect = require('gulp-connect');

var DIST = 'dist';

gulp.task('connect', function () {
  connect.server({
    root: DIST
  });
});

gulp.task('default', ['connect']);
