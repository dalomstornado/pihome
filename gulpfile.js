var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var del = require('del');
var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

gulp.task('default', ['nodemon']);

gulp.task('nodemon', ['sass', 'clientJs'], function() {
	livereload.listen();
	nodemon({
		script: './app/app.js',
		ext: 'js html pug scss json',
		ignore: './app/static/',
	}).on('restart', ['sass', 'clientJs']
	).on('start', function(){
		livereload.reload('/');
		gulp.src('./app/app.js');
		//.pipe(notify('Reloading page'));
	});
});

gulp.task('sass', function() {
	del.sync('./app/static/css/**/*', { force: true })
	
	return gulp.src('./app/scss/**/*')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/static/css/'));
});

gulp.task('clientJs', function() {
	// set up the browserify instance on a task basis
  	var b = browserify({
    	entries: './app/client/entry.js',
    	debug: true,
    	// defining transforms here will avoid crashing your stream
    	transform: [babelify.configure({
      		presets: ['es2015']
    	})]
  	});

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/static/js/'));
});

//DIST
gulp.task('dist-del', function() {
	return del.sync('./dist/**/*', { force: true });
});

//TODO Rewrite this to take all folders excluding client, scss. Take app.js, and package.json separate
gulp.task('dist-app', function() {
	gulp.src(['./app/app.js'])
		.pipe(gulp.dest('./dist/'));
	gulp.src(['./app/api/**/*'])
		.pipe(gulp.dest('./dist/api/'));
	gulp.src(['./app/common/**/*'])
		.pipe(gulp.dest('./dist/common/'));
	gulp.src(['./app/server/**/*'])
		.pipe(gulp.dest('./dist/server/'));
});

gulp.task('dist-npm', function(){
	gulp.src(['./package.json'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('dist-static', function() {
	gulp.src(['./app/static/**/*'])
		.pipe(gulp.dest('./dist/static/'));
});

gulp.task('dist-views', function() {
	gulp.src(['./app/views/**/*'])
		.pipe(gulp.dest('./dist/views/'));
});

gulp.task('dist', function() {
	runSequence('clientJs', 'sass', 'dist-del', ['dist-app', 'dist-npm', 'dist-static', 'dist-views'])
});

gulp.task('dist-pi', ['dist'], function(){
	gulp.src(['./dist/**/*'])
		.pipe(gulp.dest('afp://raspberrypi.local/Websites/pihome/'));
});