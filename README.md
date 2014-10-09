gulp-core-boilerplate
=====================

Innovative Core front-end boilerplate for Gulp / Foundation 5

Requirements
------------

* [Node.js](http://nodejs.org)
* [Gulp.js](http://gulpjs.com/) `npm install gulp -g`
* [bower](http://bower.io): `npm install bower -g`

To install, run `npm install && bower install && gulp`.

To build, simply run `gulp`.

### Additional Notes
* There is a Gulpfile.workbench.js to be used instead of the main Gulpfile if you are building a laravel workbench package.  Simply rm the Gulpfile.js and rename the workbench file to Gulpfile.js.
* You may optionally run livereload.  To do this you must:
	* ssh into your gulp directory and run `gulp`
	* locally mount your filesytem, locally cd to your Gulp directory, and run `gulp livereload`.  You also must have the [Livereload Extension](https://github.com/livereload/livereload-extensions) installed and listening in your chosen browser. 
