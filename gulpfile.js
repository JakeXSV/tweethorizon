var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src(
        [
            /* Client */
            './public/js/*.js',
            './public/js/store/*.js',
            './public/js/store/models/*.js',
            './public/js/view/*.js',
            './public/js/util/*.js',
            /* Server */
            './util/*.js',
            './twitter/*.js',
            './routes/*.js',
            './persistence/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .on('error', function (error) {
            console.error(String(error));
        });
});