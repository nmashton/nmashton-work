var metalsmith = require('metalsmith')
var beautify = require('metalsmith-beautify')
var filter = require('metalsmith-filter')
var layouts = require('metalsmith-layouts')
var markdown = require('metalsmith-markdown')
var rename = require('metalsmith-rename')
var serve = require('metalsmith-serve')
var stylus = require('metalsmith-stylus')
var watch = require('metalsmith-watch')
var minimist = require('minimist')
var path = require('path')

var argv = minimist(process.argv.slice(2))

var SRC = 'src'
var STATIC = 'static'
var DIST = 'dist'

metalsmith(__dirname)
  .source(SRC)
  .use(filter([
    '**/*.md',
    path.join(STATIC, 'stylus', 'index.styl')
  ]))
  .use(markdown())
  .use(layouts({
    engine: 'pug'
  }))
  .use(stylus({
    compress: true
  }))
  .use(rename([
    [/stylus/, 'css'],
    [/index\.css$/, 'bundle.css']
  ]))
  .use(beautify({
    css: false,
    html: {
      indent_size: 2,
      indent_char: ' ',
      wrap_line_length: 80
    }
  }))
  .use(argv.dev && watch({
    paths: {
      '${source}/**/*': true,
      'layouts/**/*': true
    }
  }))
  .use(argv.dev && serve({
    port: 8000
  }))
  .destination(DIST)
  .build(function (err) {
    if (err) {
      throw err
    }
  })
