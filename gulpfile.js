// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var del = require('del');
 

gulp.task('default', ['nodemon', 'sass']);

gulp.task('nodemon', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: './app/js/app.js',
		ext: 'js html jade scss'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
});

gulp.task('sass', function(){
	return gulp.src('./app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('css-dist', function() {
	gulp.src(['./app/css/**/*'])
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('js-dist', function() {
	gulp.src(['./app/js/**/*'])
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('public-dist', function() {
	gulp.src(['./app/public/**/*'])
		.pipe(gulp.dest('./dist/public/'));
});

gulp.task('views-dist', function() {
	gulp.src(['./app/views/**/*'])
		.pipe(gulp.dest('./dist/views/'));
});

gulp.task('dist', ['css-dist', 'js-dist', 'public-dist', 'views-dist']);