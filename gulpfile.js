'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();

gulp.task('connect', function () {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({port: 35729}))
    .use(connect.static('app'))
    .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});


gulp.task('serve', ['connect'], function () {
  require('opn')('http://localhost:9000');
});


gulp.task('styles', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}))
//        .pipe($.notify("Compilation complete."))
    ;
});


gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
    .pipe($.size());
});


gulp.task('ts', function () {
  return gulp.src('app/ts/**/*.ts')
    .pipe($.tsc({
      out: 'app.js'
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest('app/scripts'))
});


gulp.task('watch', ['ts', 'connect', 'serve'], function () {
  var server = $.livereload();

  gulp.watch('app/sass/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/ts/**/*.ts', ['ts']);
  gulp.watch([
    'app/*.html',
    'app/styles/**/*.css',
    'app/sass/**/*.scss',
    'app/scripts/**/*.js',
    'app/ts/**/*.ts'
  ]).on('change', function (file) {
    server.changed(file.path);
  });

});

var notifiedErrors = {};

function handleErrors(error) {

  var args = Array.prototype.slice.call(arguments);

  var hashedMsg = hash(error.message);

  // If already notified less than 2 seconds ago, don't do it again!
  if (!notifiedErrors.hasOwnProperty(hashedMsg) || notifiedErrors[hashedMsg] < new Date().getTime() - 2000) {
    // Send error to notification center with gulp-notify
    $.notify.onError({
      title  : "Compile Error",
      message: "<%= error.message %>"
    }).apply(this, args);

    notifiedErrors[hashedMsg] = new Date().getTime();
  }

  // Keep gulp from hanging on this task
  this.emit('end');
};


/**
 * Creates the hash function
 * Inspired from http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
 * !! not sure if the best, since it creates very big hash keys.
 * @param key
 * @returns {number}
 */
function hash(key) {
  var hash = 0;
  if (key.length == 0) return hash;
  for (var i = 0; i < key.length; i++) {
    var char = key.charCodeAt(i);

    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
