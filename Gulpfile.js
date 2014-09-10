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
			'bower_components/jquery/dist/jquery.js'
			, 'bower_components/jquery-placeholder/jquery.placeholder.js'
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



gulp.task('default', ['watch', 'compass', 'scripts-modern', 'images'], function(){
	(benchPackage) ? gulp.start(['publish']) : '';
});


