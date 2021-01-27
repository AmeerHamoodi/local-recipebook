const gulp = require("gulp");
const webpack = require("webpack-stream");
const exec = require("gulp-run");

const sass = require("gulp-sass");

sass.compiler = require("node-sass");

const run = [0, 0, 0];

const js = () => {
    run[0] == 0 && gulp.watch("./src/js/**", js);

    run[0] = 1;

    return gulp.src("./src/js/main.jsx")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("./devBuild/js"));
};

const html = () => {
    run[1] == 0 && gulp.watch("./src/*.html", html);

    run[1] = 1;

    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./devBuild"))
};

const css = () => {
    run[2] == 0 && gulp.watch("./src/css/*.scss", css)

    run[2] = 1;

    return gulp.src("./src/css/master.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./devBuild/css"))
};

const vendor = () => {

    return gulp.src("./src/vendor/**")
        .pipe(gulp.dest("./devBuild/vendor"))
}

const electron = () => {
    return exec("npm start").exec();
};

const imgs = () => {
    return gulp.src("./src/imgs/**")
        .pipe(gulp.dest("./devBuild/imgs"))
};

module.exports.default = gulp.parallel(js, html, css, electron, imgs, vendor);