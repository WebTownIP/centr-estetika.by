const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const csso = require('gulp-csso');

const imagemin = require('gulp-imagemin');

const htmlSrc = require('gulp-html-src');
const htmlreplace = require('gulp-html-replace');

const rename = require('gulp-rename');

gulp.task('minify-libs-js', () => {
  gulp.src('index.html')
    .pipe(htmlSrc())
    .pipe(concat('index.lib.js'))
    .pipe(uglify())
    .pipe(rename('index.lib.min.js'))
    .pipe(gulp.dest('./dist/assets/js')) 
})

gulp.task('minify-libs-css', () => {
  gulp.src('index.html')
    .pipe(htmlSrc({
      presets: 'css'
    }))
    .pipe(concat('index.lib.css'))
    .pipe(csso())
    .pipe(rename('index.lib.min.css'))
    .pipe(gulp.dest('./dist/assets/css')) 
})

gulp.task('minify-css', () => {
  gulp.src('./assets/css/**/*.css')
    .pipe(concat('index.css'))
    .pipe(csso())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('./dist/assets/css')) 
})

gulp.task('minify-img', () =>
  gulp.src('./assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'))
)

gulp.task('favicon', () =>
  gulp.src('./assets/favicon.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets'))
)

gulp.task('fonts', () => {
  gulp.src([
    './node_modules/font-awesome/fonts/*',
    './assets/fonts/*'
  ])
    .pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('replace-sources', () => {
  gulp.src('index.html')
    .pipe(htmlreplace({
      'js-lib': './assets/js/index.lib.min.js',
      'css-lib': './assets/css/index.lib.min.css',
      'css': './assets/css/index.min.css'
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('deploy', [
  'minify-libs-js',
  'minify-libs-css',
  'minify-css',
  'minify-img',
  'fonts',
  'favicon',
  'replace-sources'
]);