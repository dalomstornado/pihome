var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var del = require('del');
 

gulp.task('default', ['nodemon', 'sass']);

gulp.task('nodemon', function() {
	livereload.listen();
	nodemon({
		script: './app/js/server/app.js',
		ext: 'js html pug scss'
	}).on('restart', function(){
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

gulp.task('del-dist', function(){
	return del.sync('./dist/**/*', { force: true });
});

gulp.task('css-dist', ['sass'], function() {
	gulp.src(['./app/css/**/*'])
		.pipe(gulp.dest('./dist/static/css/'));
});

gulp.task('js-server-dist', function() {
	gulp.src(['./app/js/server/**/*'])
		.pipe(gulp.dest('./dist/server/'));
});

gulp.task('js-client-dist', function() {
	gulp.src(['./app/js/client/**/*'])
		.pipe(gulp.dest('./dist/static/js/'));
});

gulp.task('static-dist', function() {
	gulp.src(['./app/static/**/*'])
		.pipe(gulp.dest('./dist/static/'));
});

gulp.task('views-dist', function() {
	gulp.src(['./app/views/**/*'])
		.pipe(gulp.dest('./dist/views/'));
});

gulp.task('node-dist', function(){
	gulp.src(['./package.json'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('dist', ['del-dist', 'css-dist', 'js-server-dist', 'js-client-dist', 'static-dist', 'views-dist', 'node-dist']);

gulp.task('dist-pi', ['dist'], function(){
	gulp.src(['./dist/**/*'])
		.pipe(gulp.dest('afp://raspberrypi.local/Websites/pihome/'));
});