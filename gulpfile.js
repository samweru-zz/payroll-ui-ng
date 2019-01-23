'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
 
// var jasmine = require('gulp-jasmine');
var pump = require('pump');
 
sass.compiler = require('node-sass');

// gulp.task('default', () =>
//   gulp.src(["tests/fixture/main.js", 
//             "tests/specs/services/emoployee.js",
//             "tests/specs/payroll.js"])
//     // gulp-jasmine works on filepaths so you can't have any plugins before it
//     .pipe(jasmine())
// );

gulp.task('imagemin', function(){

   return gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'))
});

gulp.task('sass', function () {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./assets/**/*.scss', gulp.series('sass'));
});
 
gulp.task('compress', function (cb) {

  // gulp.src([

  //   "src/app/directives/simplr-grid.js",
  //   "src/app/directives/tree-menu.js",
  //   "src/app/directives/currency.js",
  // ])
  // .pipe(concat("directives.min.js"))
  // .pipe(uglify())
  // .pipe(gulp.dest("dist"))

  return gulp.src([

     "src/app/services/dept.js",
      "src/app/services/post.js",
      "src/app/services/employee.js",
      "src/app/services/benefits.js",
      "src/app/services/nhif.js",
      "src/app/services/taxrelief.js",
      "src/app/services/paye.js",
      "src/app/services/role.js",
      "src/app/services/user.js",
      "src/app/services/period.js",
      "src/app/services/payroll.js",
      "src/app/controllers/payroll.js",
      "src/app/controllers/benefits.js",
      "src/app/controllers/dept.js",
      "src/app/controllers/employee.js",
      "src/app/controllers/login.js",
      "src/app/controllers/period.js",
      "src/app/controllers/post.js",
      "src/app/controllers/role.js",
      "src/app/controllers/user.js",
      "src/app/controllers/paye.js",
      "src/app/controllers/nhif.js",
      "src/app/controllers/taxrelief.js"

  ])
  .pipe(concat("core.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("dist/app"))

  // pump([
  //       // gulp.src('src/app/**/*.js')
  //       gulp.src([
  //           // "src/helper.js",
  //           // "src/db/payroll.js",
  //           "src/app/main.js",
  //           "src/app/runner.js",
  //           "src/app/validation.js",
  //           "src/app/directives/dialog.js",
  //           // "src/app/directives/simplr-grid.js",
  //           // "src/app/directives/tree-menu.js",
  //           // "src/app/directives/currency.js",
  //           "src/app/services/dept.js",
  //           "src/app/services/post.js",
  //           "src/app/services/employee.js",
  //           "src/app/services/benefits.js",
  //           "src/app/services/nhif.js",
  //           "src/app/services/taxrelief.js",
  //           "src/app/services/paye.js",
  //           "src/app/services/role.js",
  //           "src/app/services/user.js",
  //           "src/app/services/period.js",
  //           "src/app/services/payroll.js",
  //           "src/app/controllers/payroll.js",
  //           "src/app/controllers/benefits.js",
  //           "src/app/controllers/dept.js",
  //           "src/app/controllers/employee.js",
  //           "src/app/controllers/login.js",
  //           "src/app/controllers/period.js",
  //           "src/app/controllers/post.js",
  //           "src/app/controllers/role.js",
  //           "src/app/controllers/user.js",
  //           "src/app/controllers/paye.js",
  //           "src/app/controllers/nhif.js",
  //           "src/app/controllers/taxrelief.js"
  //         ].reverse())
  //         // .pipe(rename({suffix: '.min'}))
  //         .pipe(concat('app.min.js')),
  //       uglify({

  //         mangle: true//,
  //         // output: {
            
  //         //     beautify: true,
  //         //     comments: "all"
  //         // }
  //       }),
  //       gulp.dest('src')
  //   ],
  //   cb
  // );
});
