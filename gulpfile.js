var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var minifyCSS = minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

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

gulp.task('clean', function () {
    return gulp.src('./public/dist', {read: false})
        .pipe(clean());
});

gulp.task('minify-css-app', function() {
    return gulp.src('./public/css/*.css')
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./public/dist/css'))
});

gulp.task('minify-dist-html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };
    return gulp.src('./public/views/*.html')
        .pipe(replace(/\.\.\//g, "../dist/"))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./public/dist/views'));
});

gulp.task('minify-js-app', function() {
    return gulp.src('./public/js/**/*.js', {base: "./public"})
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('minify-css-libs', function() {
    return gulp.src('./public/lib/**/*.css', {base: "./public"})
        .pipe(minifyCSS())
        .pipe(gulp.dest("./public/dist"));
});

gulp.task('minify-js-libs', function() {
    return gulp.src(
        [
            './public/lib/socket.io-client/socket.io.js',
            './public/lib/requirejs/require.js'
        ], {base: "./public"})
        .pipe(uglify())
        .pipe(gulp.dest("./public/dist"));
});

gulp.task('move-preminifyd-libs', function() {
    return gulp.src(
        [
            './public/lib/**/*.min.js'
        ], {base: './public'})
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('build', function(callback) {
    runSequence(
        'lint',
        'clean',
        [
            'minify-js-app',
            'minify-css-app',
            'minify-dist-html',
            'minify-js-libs',
            'minify-css-libs'
        ],
        'move-preminifyd-libs',
        callback);
});
