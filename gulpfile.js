/**
 * Created by zhuangqh on 2016/2/13.
 */

var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  jade = require('gulp-jade'),
  notify = require('gulp-notify'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect');

var path = {
  jade: 'views/**/*.jade',
  sass: 'src/css/**/**.sass',
  coffee: 'src/js/**/*.js',
  html: 'public/',
  css: 'public/css/',
  js: 'public/js/'
};

gulp.task('html', function () {
  return gulp.src(path.jade)
    .pipe(jade())
    .pipe(gulp.dest(path.html))
    .pipe(notify({message: 'HTML task complete!'}))
    .pipe(connect.reload());
});

gulp.task('styles', function () {
  return gulp.src(path.sass)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(path.css))
    .pipe(notify({message: 'Styles task complete!'}))
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src(path.coffee)
    .pipe(gulp.dest(path.js))
    .pipe(notify({message: 'Scripts task complete!'}))
    .pipe(connect.reload());
});

gulp.task('default', ['connectDev', 'watch'], function () {
  gulp.start('html', 'styles', 'scripts');
});

gulp.task('connectDev', function () {
  connect.server({
    root: 'public/',
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(path.jade, ['html']);
  gulp.watch(path.sass, ['styles']);
  gulp.watch(path.coffee, ['scripts']);
});

