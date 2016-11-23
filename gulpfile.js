var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var react = require('gulp-react');
var babel = require('gulp-babel');
var uglify      = require('gulp-uglify');
var rename = require('gulp-rename');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');


/*
SOME FILE VARIABLES
===================
*/

var jsxSrc = 'js/*.{jsx,js}';
var jsxDist = 'dist/js/';

var scssSrc = 'scss/*.{scss,sass}';
var cssDist = 'dist/css/';


/*
GULP REACT STUFF.
=================
*/

gulp.task('jsReact', function (cb) {
    return gulp.src(jsxSrc)
    	.pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsxDist));
        cb(err); //message
});

/*
USE BABEL TO TRANSLATE ES6 TO ES5
=================================
*/

gulp.task('babel',['jsReact'], function() {
    return gulp.src('dist/js/index.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({ extname: '-es5.js' }))
        .pipe(gulp.dest(jsxDist));
});


/*
UGLIFY JAVASCRIPT -NOT WORKING PROPERLY-
========================================
*/

// gulp.task('uglify',function(){
// 	return gulp.src(['dist/js/index-es5.js'])
// 		.pipe(uglify({preserveComments: false, compress: true, mangle: true}).on('error',function(e){console.log('\x07',e.message);return this.end();}))
// 		.pipe(rename({ extname: '.min.js' }))
// 		.pipe(gulp.dest(jsxDist));
// });

/*
PREFIX. CONCAT AND MINIFY STYLES
================================
*/

gulp.task('styles', () =>
    gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
		.pipe(autoprefixer('last 3 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) // Adds browser prefixes (eg. -webkit, -moz, etc.)
        .pipe(concat('all.min.css'))
        .pipe(minifycss({compatibility: 'ie8'},{debug:true}, function(details) {
        	console.log(details.name + ': ' + details.stats.originalSize);
        	console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDist))
);

/*
WATCH
=====
*/
gulp.task('js-watch', ['jsReact','babel',/*'uglify'*/]);
gulp.task('watch', function() {

  gulp.watch(scssSrc, ['styles']);
  gulp.watch(jsxSrc, ['js-watch']);

});
