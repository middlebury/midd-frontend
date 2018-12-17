const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const data = require('gulp-data');
const notify = require('gulp-notify');
const prettify = require('gulp-prettify');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');
const yaml = require('js-yaml');
const del = require('del');
const beeper = require('beeper');
const args = require('yargs').argv;
const gulpIf = require('gulp-if');
const size = require('gulp-size');
const rename = require('gulp-rename');
const rollup = require('rollup');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const mqPacker = require('css-mqpacker');
const sortCSSMq = require('sort-css-media-queries');
const cssnano = require('cssnano');
const _ = require('lodash');
const zip = require('gulp-zip');
const dotenv = require('dotenv');

const rollupConfig = require('./rollup');

dotenv.config();

const production = process.env.NODE_ENV === 'production';

const THEME_DIR = process.env.THEME_DIR || args.themeDir || '';

const paths = {
  html: {
    src: './src/templates/*.twig',
    dest: './dist'
  },
  styles: {
    src: './src/scss/**/*.scss',
    dest: './dist/css/'
  },
  scripts: {
    src: './src/js/**/*.js',
    dest: './dist/js'
  },
  images: {
    src: './src/images/*.{png,jpg,svg}',
    dest: './dist/images/'
  }
};

/**
 * Change output paths if --themeDir is passed.
 *
 * This is so frontend can be iterated on and continuously ouput
 * to a Drupal theme (helpful for frontend changes on dev server).
 *
 * Use `gulp dev` in conjunction with this so browser sync server is not started.
 */
if (THEME_DIR !== '') {
  console.info('outputing into', THEME_DIR);
  paths.styles.dest = THEME_DIR + '/css/';
  paths.scripts.dest = THEME_DIR + '/js/';
  paths.images.dest = THEME_DIR + '/images/';
}

const onError = function(err) {
  notify.onError({
    title: 'Gulp error in ' + err.plugin,
    message: err.toString()
  })(err);
  beeper();
  this.emit('end');
};

const clean = () =>
  del([
    './dist/**/*.html',
    './dist/**/*.js',
    './dist/**/*.css',
    './dist/images/*'
  ]);

const serve = () =>
  browserSync.init({
    notify: false,
    server: {
      baseDir: './dist'
    },
    open: false,
    directory: true
  });

const copyIcons = () =>
  gulp
    .src('./node_modules/middlebury-design-system/dist/icons/mds-icons.svg')
    .pipe(rename('icons.twig'))
    .pipe(gulp.dest('./src/templates/partials'));

const styles = () => {
  const plugins = [
    postcssPresetEnv({
      autoprefixer: {
        grid: true
      }
    })
  ];

  if (production) {
    plugins.push(
      cssnano(),
      mqPacker({
        sort: sortCSSMq
      })
    );
  }

  return gulp
    .src(paths.styles.src)
    .pipe(gulpIf(!production, sourcemaps.init({ loadMaps: true })))
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulpIf(!production, sourcemaps.write('./')))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
};

const scripts = () =>
  rollup
    .rollup(rollupConfig)
    .then(bundle =>
      bundle.write({
        file: paths.scripts.dest + '/bundle.js',
        format: 'iife',
        sourcemap: !production
      })
    )
    .then(() => {
      browserSync.reload();
    });

const html = () =>
  gulp
    .src(paths.html.src)
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(
      data(function(file) {
        const ymlData = yaml.safeLoad(
          fs.readFileSync('./src/data/data.yml', 'utf8')
        );

        return Object.assign({}, ymlData, {
          env: {
            production
          }
        });
      })
    )
    .pipe(
      twig({
        base: './src/templates',
        filters: [
          {
            name: 'groupBy',
            func: (items, field) => {
              const grouped = _.groupBy(items, field[0]);

              const groupArr = Object.keys(grouped).map(key => ({
                group: key,
                items: grouped[key]
              }));

              return groupArr;
            }
          }
        ]
      })
    )
    .pipe(prettify())
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());

const images = () =>
  gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeDimensions: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());

const replaceImagePaths = () => {
  const imagesDir = args.imagesDir || '/images/';
  return gulp
    .src('./dist/css/*.css')
    .pipe(replace('/images/', imagesDir))
    .pipe(gulp.dest('./dist/css'));
};

const copyDeps = () => {
  // NOTE: Chart.bundle.min.js includes Momentjs but so far we are not using time axis
  // http://www.chartjs.org/docs/latest/getting-started/installation.html#bundled-build
  return gulp
    .src(['./node_modules/chart.js/dist/Chart.min.js'])
    .pipe(gulp.dest('./dist/js'));
};

const deployDist = () => {
  if (!THEME_DIR) {
    return console.error('No `--themeDir` argument passed'); // eslint-disable-line no-console
  }
  return gulp
    .src(
      [
        './dist/css/main.css',
        './dist/js/bundle.js',
        './dist/js/Chart.min.js',
        './dist/images/*'
      ],
      {
        base: './dist'
      }
    )
    .pipe(gulp.dest(THEME_DIR));
};

const bundleMarkup = () =>
  gulp
    .src(
      [
        './dist/midd-wrapper.html',
        './dist/css/main.css',
        './dist/js/bundle.js',
        './dist/images/midd-shield.svg',
        './dist/images/midd-wordmark.svg',
        './dist/images/middlebury-logo-white.svg'
      ],
      {
        base: './dist/'
      }
    )
    .pipe(zip(`midd-wrapper-${new Date().getTime()}.zip`))
    .pipe(gulp.dest('./dist'));

const watch = () => {
  gulp.watch('./src/templates/**/*.twig', html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch('./src/data/*.yml', html);
};

const build = gulp.series(
  clean,
  copyIcons,
  copyDeps,
  gulp.parallel(html, images, styles, scripts)
);

const dev = gulp.series(build, watch);

const server = gulp.series(dev, serve);

const deploy = gulp.series(replaceImagePaths, deployDist);

module.exports = {
  deploy,
  scripts,
  build,
  dev,
  zip: bundleMarkup,
  default: server
};
