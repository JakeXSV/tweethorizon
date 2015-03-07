var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
    return gulp.src(
        [
            /* Client */
            './public/js/**/*.js',
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

gulp.task('minify-js', function() {
    gulp.src('./public/js/**/*.js', {base: "./public"})
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'))
});
