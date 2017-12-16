'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      rename = require('gulp-rename'),
      csso = require('gulp-csso'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      uglify = require('gulp-uglify'),
      babelify = require('babelify'),
      browserify = require('gulp-browserify'),
      pug = require('gulp-pug');


gulp.task('css', function() {
    return gulp.src('src/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function buildHTML() {
    return gulp.src('src/layout/*.pug')
    .pipe(pug({
        pretty: '\t'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
          stream: true
     }));
  });



gulp.task('js', function () {
  return gulp.src('src/js/main.js')
    .pipe(browserify({
        debug: true,
        transform: [babelify.configure({
          presets: ['es2015']
        })]
      }))
    .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function() {

    browserSync({
        server: {
            baseDir: './dist'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/sass/**/*.sass', ['css']);
    gulp.watch('src/**/*.pug', ['html']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('dist/*.html', browserSync.reload);
});
