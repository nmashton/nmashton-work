var gulp = require('gulp');
var connect = require('gulp-connect');
var fm = require('gulp-front-matter');
var marked = require('gulp-marked');
var tap = require('gulp-tap');
var fs = require('fs');
var pug = require('pug');

var DIST = 'dist';
var DEFAULT_TEMPLATE = 'templates/base.pug'

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
      var templateFile = file.frontMatter.template || DEFAULT_TEMPLATE;
      var template = pug.compile(fs.readFileSync(templateFile).toString());
      var contents = file.contents.toString();
      var data = Object.assign({}, file.frontMatter, {contents: contents});
      file.contents = new Buffer(template(data), 'utf-8');
    }))
    .pipe(gulp.dest(DIST));
});

gulp.task('default', ['pages', 'connect']);
