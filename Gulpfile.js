'use strict';

const gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watch = require('gulp-watch');

gulp.task('css', function(cb) {
    return gulp.src(['src/**/*.css'])
        .pipe(concat('index.css'))
        .pipe(gulp.dest('build/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('build/'));
});

gulp.task('js', function () {
    return browserify({
            entries: 'src/index.js'
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function (cb) {
    return del(['build/**/*'], cb);
});

gulp.task('build', function() {
    gulp.series('css', 'js');
})

gulp.task('watch', function() {
    watch(['src/**/*.css'], {}, 'css');
    watch(['src/**/*.js'], {}, 'js');
});
