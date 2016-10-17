var gulp = require('gulp');
var connect = require('gulp-connect');
var fm = require('gulp-front-matter');
var marked = require('gulp-marked');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var tap = require('gulp-tap');
var fs = require('fs');
var path = require('path');

var DIST = 'dist';
var DEFAULT_TEMPLATE = 'templates/page.pug'

gulp.task('connect', function () {
  connect.server({
    root: DIST
  });
});

gulp.task('pages', function () {
  gulp.src('./src/pages/*.md')
    .pipe(fm())
    .pipe(marked())
    .pipe(tap(function (file) {
      var templateName = file.frontMatter.template || DEFAULT_TEMPLATE;
      var contents = file.contents.toString();
      var data = Object.assign({}, file.frontMatter, {contents: contents});

      gulp.src(templateName)
        .pipe(pug({
          locals: data
        }))
        .pipe(rename(path.basename(file.path).replace(/\.md$/, '.html')))
        .pipe(gulp.dest(DIST));
    }));
});

gulp.task('default', ['pages', 'connect']);
