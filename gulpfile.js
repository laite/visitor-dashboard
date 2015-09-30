var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

gulp.task('default', function () {
    return gulp.src('app.js')
        .pipe(watch('app.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});
