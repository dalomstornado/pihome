var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var del = require('del');
var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
 

gulp.task('default', ['nodemon']);

gulp.task('nodemon', ['sass', 'js'], function() {
	livereload.listen();
	nodemon({
		script: './app/app.js',
		ext: 'js html pug scss'
	}).on('restart', function(){
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
});

gulp.task('sass', function(){
	return gulp.src('./app/scss/**/*')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/static/css/'));
});

gulp.task('js', function() {
   	browserify('./app/js/app.js')
    .transform(babelify, {presets: ["es2016"], extensions: ['.js']})
    .bundle()
    .pipe(fs.createWriteStream('./app/static/js/app.js'));
});

//DIST
gulp.task('del-dist', function(){
	return del.sync('./dist/**/*', { force: true });
});

gulp.task('app-dist', function() {
	gulp.src(['./app/app.js'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('node-dist', function(){
	gulp.src(['./package.json'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('static-dist', function() {
	gulp.src(['./app/static/**/*'])
		.pipe(gulp.dest('./dist/static/'));
});

gulp.task('views-dist', function() {
	gulp.src(['./app/views/**/*'])
		.pipe(gulp.dest('./dist/views/'));
});

gulp.task('dist', ['del-dist', 'app-dist', 'node-dist', 'static-dist', 'views-dist']);

gulp.task('dist-pi', ['dist'], function(){
	gulp.src(['./dist/**/*'])
		.pipe(gulp.dest('afp://raspberrypi.local/Websites/pihome/'));
});