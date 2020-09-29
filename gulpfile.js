const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

// file structure

const source = "./src/scss/";
const dest = "./src/css/";

sass.compiler = require("node-sass");

function styles() {
  return gulp
    .src(source + "**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        sourcemap: true,
        style: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest(dest));
}

function watch() {
  gulp.watch(source + "**/*.scss", styles);
}

var build = gulp.series(styles, watch);

gulp.task("default", build);