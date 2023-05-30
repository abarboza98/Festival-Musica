const { src, dest, watch, parallel } = require('gulp');
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const webp = require('gulp-webp');

function css(done) {
  src('src/scss/**/*.scss') //Identificar el archivo de sass
    .pipe(plumber())
    .pipe(sass()) //COmpilar el archivo de SASS

    .pipe(dest('build/css')); //Guardarlo en dico duro

  done();
}

function versionWebp(done) {
  const options = {
    quality: 50,
  };
  src('src/img/**/*.{png, jpg}').pipe(webp(options)).pipe(dest('build/img'));

  done();
}

function dev(done) {
  watch('src/scss/**/*.scss', css);

  done();
}
exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);
