var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var exec = require('gulp-exec');
var livereload = require('gulp-livereload');
require('jshint-stylish');


var paths = {
    js: './src/js/**/*.js',
    less: './src/less/*.less'
};

gulp.task('less', function () {
    gulp.src(paths.less)
        .pipe(changed('./public/genere/css'))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./public/genere/css'))
        .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(changed('./public/genere/js'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/genere/js'));
});

gulp.task('server', function () {
    gulp.src("server.js")
        .pipe(exec('node server.js'));
});

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.less, ['less']);
    gulp.watch('vues/**/*.jade').on('change', reload);
    function reload() {
        server.changed("");
    }
});

gulp.task('build', ['less', 'js']);

gulp.task('default', ['build','server', 'watch']);