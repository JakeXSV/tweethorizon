var gulp = require('gulp');
var coveralls = require('gulp-coveralls');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('coveralls-coverage', function () {
    return gulp.src([
        'domain/**/*.js',
        'routes/**/*.js',
        'service/**/*.js'
    ])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('coveralls-report', ['coveralls-coverage'], function () {
    return gulp.src(['test/**/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
        dir: './coverage',
        reporters: [
            'lcovonly'
        ],
        reportOpts: { dir: './coverage' }
    }));
});

gulp.task('coveralls', ['coveralls-report'], function () {
    return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});
