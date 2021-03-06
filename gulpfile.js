'use strict';

const gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      clean = require('gulp-clean'),
      fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const basePaths = {
        src: 'acnh/src/',
        dest: 'acnh/assets/'
      },
      paths = {
        data: {
          src: basePaths.src + 'js/',
          dest: basePaths.dest + 'js/'
        },
        js: {
          src: basePaths.src + 'js/',
          dest: basePaths.dest + 'js/'
        },
        css: {
          src: basePaths.src + 'scss/',
          dest: basePaths.dest + 'css/'
        },
        html: {
          src: basePaths.src + 'html/',
          dest: 'acnh/'
        }
      };

const files = {
  data: [
    paths.data.src + 'init.js',
    paths.data.src + 'sheet-csv/**.js',
    paths.data.src + 'translation/**.js',
    paths.data.src + 'all-items.js'
  ],
  scss: [
    paths.css.src + '**/*.scss'
  ],
  html: [
    paths.html.src + '*.html',
    paths.html.src + '**/*.html'
  ]
}

gulp.task('clean', () => {
  return gulp.src([
    // 'assets/',
    'acnh/' + '*.html'
    ], {read: false})
    .pipe(clean());
});

gulp.task('html', () => {
  return gulp.src(paths.html.src + '*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('acnh/'));
});

gulp.task('minify', () => {
  return gulp.src('acnh/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
});


// gulp.task('css', () => {
//   return gulp.src(files.scss)
//     .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
//     // .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest(paths.css.dest));
// });

// gulp.task('js', () => {
//   return gulp.src(files.data, {allowEmpty: true})
//     .pipe(concat('data.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(paths.js.dest));
// });

gulp.task('watch', () => {
  // gulp.watch(files.scss, gulp.task('css'));
  // gulp.watch(files.js, gulp.task('js'));
  gulp.watch(files.html, gulp.task('html'));
});

gulp.task('default', gulp.series(
    // 'clean',
    // gulp.parallel('css', 'js', 'html'),
    gulp.parallel('html'),
    'watch'
  )
);
