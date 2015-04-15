var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    webpack = require('gulp-webpack'),
    destFolder = 'build';

gulp.task('assets', function() {
    gulp.src('./assets/**')
        .pipe(gulp.dest(destFolder + '/assets/'));
});

gulp.task('uglify', function () {
    return gulp.src('./assets/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(destFolder + '/assets'));
});

gulp.task('build', ['assets', 'uglify'], function() {
    return gulp.src('js/app.js')
        .pipe(webpack(require('./webpack.dist.config.js')))
        .pipe(gulp.dest(destFolder));
});
