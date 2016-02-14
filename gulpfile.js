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
  connect = require('gulp-connect'),
  coffee = require('gulp-coffee'),
  uglify = require('gulp-uglify');

var path = {
  jade: 'views/**/*.jade',
  sass: 'public/sass/**/*.sass',
  coffee: 'public/js/**/*.coffee',
  image: 'public/image/*',
  html: 'dist/',
  css: 'dist/css/',
  js: 'dist/js/',
  img: 'dist/img/'
};

gulp.task('html', function () {
  return gulp.src(path.jade)
    .pipe(jade())
    .pipe(gulp.dest(path.html))
    .pipe(connect.reload());
});

gulp.task('styles', function () {
  return gulp.src(path.sass)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(path.css))
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src(path.coffee)
    .pipe(coffee())
    //.pipe(uglify())
    .pipe(gulp.dest(path.js))
    .pipe(connect.reload());
});

gulp.task('images', function () {
  return gulp.src(path.image)
    .pipe(gulp.dest(path.img))
    .pipe(connect.reload());
});

gulp.task('default', ['connectDev', 'watch'], function () {
  gulp.start('html', 'styles', 'scripts', 'images');
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
  gulp.watch(path.image, ['images']);
});

