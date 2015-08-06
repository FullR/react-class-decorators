import {extend} from "lodash";
import browserify from "browserify";
import browserifyInc from "browserify-incremental";
import babelify from "babelify";
import express from "express";
import fs from "fs";
import gulp from "gulp";
import sass from "gulp-ruby-sass";
const port = 8080;

gulp.task("babel", () => {
  const b = browserify("./lib/app.js", extend({
    debug: true,
    paths: ["./node_modules", "./lib"]
  }, browserifyInc.args));

  // compile ES6/JSX
  b.transform(babelify.configure({
    ignore: /node_modules/,
    stage: 0
  })).on("error", function(error) {
    console.log(`Babel Error: ${error}`);
    this.emit("end"); // keeps task from hanging on error
  });

  // Cache
  browserifyInc(b, {cacheFile: "./.browserify-cache"});

  return b
    .bundle()
    .pipe(fs.createWriteStream("./bin/app.js"));
});

gulp.task("sass", () => {
  return sass("./lib/style/app.scss")
    .on("error", (error) => console.log(`Sass Error: ${error}`))
    .pipe(gulp.dest("./bin"));
});

gulp.task("html", () => {
  return gulp.src("./lib/index.html")
    .pipe(gulp.dest("./bin"));
});

gulp.task("images", () => {
  return gulp.src("./images/**/*")
    .pipe(gulp.dest("./bin"));
});

gulp.task("watch", () => {
  gulp.watch("./lib/**/*.?(js|json)", ["babel"]);
  gulp.watch("./lib/style/**/*.scss", ["sass"]);
  gulp.watch("./lib/index.html", ["html"]);
});

gulp.task("serve", () => {
  const app = express();
  app.use(express.static("./bin"));
  app.use(express.static("./node_modules"));
  app.route("/api/things").get((req, res) => {
    setTimeout(() => {
      res.json(["foo", "bar", "fizz", "buzz"])
    }, 3000);
  });
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

gulp.task("build", ["babel", "sass", "html", "images"]);

gulp.task("default", ["build", "watch", "serve"]);
