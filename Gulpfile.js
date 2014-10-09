var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('clean', function(){
	return plugins.cache.clearAll();
});

gulp.task('sass', function() {
	return gulp.src(['scss/*.scss'])
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass({
				includePaths: ['scss', 'bower_components/foundation/scss', 'bower_components/compass-mixins/lib'],
				outputStyle: 'compressed'
			}))
		.pipe(plugins.sourcemaps.write('./maps'))
		.pipe(gulp.dest('../public/css'));
});

gulp.task('pixrem', function() {
	gulp.src('../public/css/app.css')
		.pipe(plugins.pixrem())
		.pipe(plugins.rename({ basename: 'ie8' }))
		.pipe(gulp.dest('../public/css'));
});

gulp.task('scripts-modern', function() {
	gulp.src([
			'bower_components/jquery-placeholder/jquery.placeholder.js'
			, 'bower_components/fastclick/lib/fastclick.js'
			, 'bower_components/jquery.cookie/jquery.cookie.js'
			, 'bower_components/foundation/js/foundation.js'
			, 'bower_components/jquery-easing-original/jquery.easing.1.3.js'
			, 'js/app.js'
		])
		// .pipe(plugins.jshint())
		// .pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.concat('all.js', {newLine: ';'}))
			.pipe(plugins.rename({ basename: 'app', suffix: '.min'}))
			.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./maps'))
		.pipe(gulp.dest('../public/js'))
});

gulp.task('scripts-legacy', function() {
	gulp.src([
		'bower_components/html5shiv/dist/html5shiv.js'
		, 'bower_components/es5-shim/es5-shim.js'
		, 'js/ie8/nwmatcher-1.2.5-min.js'
		, 'bower_componenets/selectivizr/selectivizr.js'
		, 'bower_components/respond/dest/respond.min.js'
	])
	.pipe(plugins.concat('legacy.min.js', {newLine: ';'}))
	.pipe(plugins.uglify())
	.pipe(gulp.dest('../public/js'))
});

gulp.task('copy', function(){
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

gulp.task('copy-rem-polyfill', function(){
	return gulp.src('bower_components/rem-unit-polyfill/js/rem.min.js')
		.pipe(gulp.dest('../public/js'));
});

gulp.task('images', function() {
	return gulp.src('images/**/*')
		.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }), { cacheDirName: 'image-cache' }))
		.pipe(gulp.dest('../public/images'))
});

gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('scss/**/*.scss', ['sass']);

	// Watch public .css files (pixrem for IE8)
	gulp.watch('../public/css/app.css', ['pixrem']);

	// Watch .js files
	gulp.watch('js/**/*.js', ['scripts-modern']);

	// Watch image files
	gulp.watch('images/**/*', ['images']);

});

// Livereload
gulp.task('livereload', function(){
	plugins.livereload.listen();
	gulp.watch('../public/**/*').on('change', plugins.livereload.changed);
});

gulp.task('install', [ 'clean', 'sass', 'scripts-modern', 'scripts-legacy', 'copy', 'copy-jquery-legacy', 'copy-rem-polyfill', 'images']);

gulp.task('default', [ 'watch', 'install']);
