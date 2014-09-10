var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var benchPackage; // set to true for workbench package development

gulp.task('compass', function() {
	gulp.src('./scss/*.scss')
	.pipe(plugins.compass({
		config_file: './config.rb',
		css: 'css',
		sass: 'scss'
	}))
	.pipe(gulp.dest('../public/css'));
});

gulp.task('scripts-modern', function() {
	return gulp.src([
			'bower_components/jquery-placeholder/jquery.placeholder.js'
			, 'bower_components/fastclick/lib/fastclick.js'
			, 'bower_components/jquery.cookie/jquery.cookie.js'
			, 'bower_components/foundation/js/foundation.js'
			, 'js/app.js'
		])
		// .pipe(plugins.jshint())
		// .pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(plugins.concat('all.js', {newLine: ';'}))
		.pipe(plugins.rename({ basename: 'app', suffix: '.min'}))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('../public/js'))
});

gulp.task('scripts-legacy', function() {
	return gulp.src([
			'js/ie8/*.js', // ie8 Polyfills
			'!js/ie8/rem.min.js'
		])
		.pipe(plugins.concat('legacy.min.js', {newLine: ';'}))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('../public/js'))
});

gulp.task('copy-modernizr', function(){
	return gulp.src('bower_components/modernizr/modernizr.js', 'bower_components/jquery-legacy/dist/jquery.js')
		.pipe(plugins.uglify())
		.pipe(plugins.rename({ suffix: '.min'}))
		.pipe(gulp.dest('../public/js'));
});

gulp.task('copy-jquery-legacy', function(){
	return gulp.src('bower_components/jquery-legacy/dist/jquery.js')
		.pipe(plugins.uglify())
	  	.pipe(plugins.rename({ basename: 'jquery-legacy', suffix: '.min'}))
		.pipe(gulp.dest('../public/js'));
});

gulp.task('copy-rem-polyfil', function(){
	return gulp.src('js/ie8/rem.min.js')
		.pipe(gulp.dest('../public/js'));
});

gulp.task('images', function() {
	return gulp.src('images/**/*')
		.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('../public/images'))
});

gulp.task('publish', plugins.shell.task([
	'php ../../../../artisan asset:publish --bench="[vendor]/[package]"'
]));

gulp.task('watch-compass', function(cb) {
	runSequence(
		'compass'
		// ,'publish'
		,cb);
});

gulp.task('watch-scripts-modern', function(cb) {
	runSequence(
		'scripts-modern'
		// ,'publish'
		,cb);
});

gulp.task('watch-images', function(cb) {
	runSequence(
		'images'
		// ,'publish'
		,cb);
});

if(benchPackage) {
	gulp.task('watch', function() {

		// Watch .scss files
		gulp.watch('scss/**/*.scss', ['watch-compass']);

		// Watch .js files
		gulp.watch('js/**/*.js', ['watch-scripts-modern']);

		// Watch image files
		gulp.watch('images/**/*', ['watch-images']);

	});
} else {
	gulp.task('watch', function() {

		// Watch .scss files
		gulp.watch('scss/**/*.scss', ['compass']);

		// Watch .js files
		gulp.watch('js/**/*.js', ['scripts-modern']);

		// Watch image files
		gulp.watch('images/**/*', ['images']);

	});
}



gulp.task('default', [
		'watch'
		, 'compass'
		, 'scripts-modern'
		, 'scripts-legacy'
		, 'copy-modernizr'
		, 'copy-jquery-legacy'
		, 'copy-rem-polyfil'
		, 'images'], function(){
	(benchPackage) ? gulp.start(['publish']) : '';
});


