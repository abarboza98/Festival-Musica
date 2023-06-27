const { src, dest, watch, parallel } = require('gulp');
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
  src('src/scss/**/*.scss') //Identificar el archivo de sass
    .pipe(plumber())
    .pipe(sass()) //COmpilar el archivo de SASS

    .pipe(dest('build/css')); //Guardarlo en dico duro

  done();
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src('src/img/**/*.{png, jpg}')
    .pipe(cache(imageMin(opciones)))
    .pipe(dest('build/img'));

  done();
}

function versionWebp(done) {
  const options = {
    quality: 50,
  };
  src('src/img/**/*.{png, jpg}').pipe(webp(options)).pipe(dest('build/img'));

  done();
}

function versionAvif(done) {
  const options = {
    quality: 50,
  };
  src('src/img/**/*.{png, jpg}').pipe(avif(options)).pipe(dest('build/img'));

  done();
}

function dev(done) {
  watch('src/scss/**/*.scss', css);

  done();
}
exports.css = css;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);
