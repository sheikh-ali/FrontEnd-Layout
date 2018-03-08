var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var lessGlob = require('gulp-less-glob');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var jsMin = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');

var autoprefix = new LessPluginAutoPrefix ({browsers : ['last 2 version']});

gulp.task('htmlMinify', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('jsMinify', function() {
    return gulp.src('src/assets/js/*.js')
        .pipe(rename('script.min.js'))
        .pipe(sourcemaps.init())
        .pipe(jsMin())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('dist/assets/js/'));

});
 
gulp.task('styles', function () {
    return gulp.src('src/assets/less/main.less')
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.init())
        .pipe(lessGlob())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('watch', function(){
    gulp.watch('src/assets/*.html', ['htmlMinify'])
    gulp.watch('src/assets/less/**/*.less', ['styles'])
    gulp.watch('src/assets/js/*.js', ['jsMinify'])
    
});

gulp.task('default', ['htmlMinify', 'jsMinify', 'styles', 'watch']);