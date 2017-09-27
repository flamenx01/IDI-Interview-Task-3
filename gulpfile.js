// 
// Interview gulp config file
// 

// Project.
var project                 = 'IDI Interview';
var projectHost             = 'localhost';
var projectPort             = '3000';
var productURL              = './';

// HTML.
var htmlSRC                  = './src/**/*.html';
var htmlDestination          = './build/';

// Styles.
var styleSRC                = './src/styles/styles.less';
var styleDestination        = './build/';

// Fonts.
var fontsSRC                = './src/fonts/*';
var fontsDestination        = './build/fonts/';

// Images.
var imagesSRC               = './src/images/**/*.{png,jpg,gif,svg}';
var imagesDestination       = './build/images/';

// Watch files paths.
var styleWatchFiles         = './src/styles/**/*.less';
var projectHTMLWatchFiles    = './src/**/*.html';

//json
var jsonSRC                  = './src/**/*.json';
var jsonDestination          = './build/';

const AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
];

/**
* Load Gulp Plugins.
*/
var gulp         = require('gulp'); // Gulp of-course

// HTML plugins
var htmlmin     = require('gulp-htmlmin');

// CSS plugins.
var less         = require('gulp-less'); // Gulp pluign for Sass compilation.
var minifycss    = require('gulp-uglifycss'); // Minifies CSS files.
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.
var mmq          = require('gulp-merge-media-queries'); // Combine matching media queries into one media query definition.

// Image plugins.
var imagemin     = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility plugins.
var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var lineec       = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)
var filter       = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using globbing.
var notify       = require('gulp-notify'); // Sends message notification to you
var browserSync  = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload       = browserSync.reload; // For manual browser reload.
var del          = require('del');
var vinylPaths   = require('vinyl-paths');
var plumber      = require('gulp-plumber');

// Error notifications
var notify = {
  html: { errorHandler: notify.onError('HTML: BUILD FAILED!\n' + 'Error:\n<%= error.message %>') },
  styles: { errorHandler: notify.onError('STYLES: BUILD FAILED!\n' + 'Error:\n<%= error.message %>') },
  font: { errorHandler: notify.onError('FONTS: SOMETHING WRONG!\n' + 'Error:\n<%= error.message %>') },
  img: { errorHandler: notify.onError('IMAGES: SOMETHING WRONG!\n' + 'Error:\n<%= error.message %>') },
  json: { errorHandler: notify.onError('JSON: SOMETHING WRONG!\n' + 'Error:\n<%= error.message %>') },  
};

/**
* Task: `html`.
* Copies all html files that are in ./src/** maintaining directory structure
*/
gulp.task('html', function() {
  return gulp
    .src(htmlSRC, {base: './src/'})
    .pipe(plumber(notify.html))
    // .pipe(htmlmin({collapseWhitespace: true, includeAutoGeneratedTags: false}))
    .pipe(gulp.dest(htmlDestination))
    .pipe(browserSync.reload({ stream: true }))
});

/**
* Task: `styles`.
* Compiles Less, Autoprefixes it and Minifies CSS.
*/
gulp.task('styles', function () {
  return gulp
    .src(styleSRC)
    .pipe(plumber(notify.styles))
    .pipe(less())
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS ))
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(gulp.dest(styleDestination ))
    .pipe(mmq()) // Merge Media Queries only for .min.css version.
    .pipe(vinylPaths(del))
    .pipe(rename('style.css'))
    .pipe(minifycss({
      maxLineLen: 10,
      keepSpecialComments : 1
    }))
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(gulp.dest(styleDestination))
    .pipe(browserSync.reload({ stream: true }))
});

/**
* Task: `fonts`.
* Copies fonts from ./src to destination
*/
gulp.task('fonts', function() {
  return gulp  
    .src(fontsSRC )
    .pipe(plumber(notify.font))
    .pipe(gulp.dest(fontsDestination))
    .pipe(browserSync.reload({ stream: true }))
})


/**
* Task: `json`.
* Copies all json files that are in ./src/** maintaining directory structure
*/
gulp.task('json', function() {
  return gulp
    .src(jsonSRC)
    .pipe(plumber(notify.json))
    .pipe(gulp.dest(jsonDestination))
    .pipe(browserSync.reload({ stream: true }))
});

/**
* Task: `images`.
* Minifies PNG, JPEG, GIF and SVG images.
*/
gulp.task('images', function() {
  return gulp
    .src(imagesSRC )
    .pipe(plumber(notify.img))
    .pipe(imagemin({
          progressive: true,
          optimizationLevel: 3, // 0-7 low-high
          interlaced: true,
          svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(imagesDestination))
    .pipe(browserSync.reload({ stream: true }))
});

/**
* Task `clean`.
* Clean build directory before building
*/
gulp.task('clean', function (cb) {
  return gulp
    .src([ htmlDestination ])
    .pipe(vinylPaths(del));
});

/**
* Task: `browser-sync`.
* Auto reloads, CSS injections, Localhost tunneling.
*/
gulp.task( 'browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: htmlDestination
    }
  });
  gulp.watch(projectHTMLWatchFiles, ['html']);
  gulp.watch(styleWatchFiles, ['styles']);
});

gulp.task('build', ['html', 'styles', 'json', 'fonts', 'images']);
gulp.task( 'default', ['build', 'browser-sync']);