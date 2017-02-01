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

gulp.task('default', ['nodemon']);

gulp.task('nodemon', ['serverJs', 'sass', 'clientJs'], function() {
	livereload.listen();
	console.log('listens');

	nodemon({
		script: './app/server.js',
		ext: 'js html pug scss',
		ignore: './app/static/',
	}).on('restart', ['serverJs', 'sass', 'clientJs']
	).on('start', function(){
		livereload.reload('/');
		gulp.src('./app.js')
		.pipe(notify('Reloading page'));
	});
});

gulp.task('sass', function(){
	return gulp.src('./app/scss/**/*')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/static/css/'));
});

gulp.task('serverJs', function() {
	// set up the browserify instance on a task basis
  	var b = browserify({
    	entries: './app/js/server/entry.js',
    	debug: true,
    	// defining transforms here will avoid crashing your stream
    	transform: [babelify.configure({
      		presets: ['es2015']
    	})]
  	});

  return b.bundle()
    .pipe(source('server.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        .on('error', gutil.log)
    .pipe(gulp.dest('./app/'));
});

gulp.task('clientJs', function() {
	// set up the browserify instance on a task basis
  	var b = browserify({
    	entries: './app/js/client/entry.js',
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
        //.pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/static/js/'));
});

//DIST
gulp.task('del-dist', function(){
	return del.sync('./dist/**/*', { force: true });
});

gulp.task('app-dist', function() {
	gulp.src(['./app/server.js'])
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