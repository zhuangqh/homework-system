/**
 * Created by zhuangqh on 2016/2/13.
 */

import gulp from 'gulp';
import sass from 'gulp-sass';
import jade from 'gulp-jade';
import autoprefixer from 'gulp-autoprefixer';
import livereload from 'gulp-livereload';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';
import babel from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import sourcemaps from 'gulp-sourcemaps';

const path = {
  jade: 'views/**/*.jade',
  sass: 'public/sass/**/*.sass',
  sjs: 'public/js/app.js',
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

function compile(watch) {
  var bundler = watchify(browserify(path.sjs, { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.js))
      .pipe(connect.reload());
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watchJS() {
  return compile(true);
}

gulp.task('scripts', () => compile());

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
  gulp.watch(path.image, ['images']);
  watchJS();
});

