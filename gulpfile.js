import fs from 'node:fs';
import gulp from 'gulp';
const { series, parallel, task } = gulp;
import gulpTwig from 'gulp-twig';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import data from 'gulp-data';
import notify from 'gulp-notify';
import prettify from 'gulp-prettify';
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import replace from 'gulp-replace';
import yaml from 'js-yaml';
import { deleteAsync } from 'del';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import gulpIf from 'gulp-if';
import size from 'gulp-size';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqPacker from 'css-mqpacker';
import sortCSSMq from 'sort-css-media-queries';
import cssnano from 'cssnano';
import _ from 'lodash';
import dotenv from 'dotenv';
import svgSprite from 'gulp-svg-sprite';
import gulpSvgo from 'gulp-svgo';
import dom from 'gulp-dom';
import gulpStylelint from 'gulp-stylelint';
import webpack from 'webpack-stream';
import config from './webpack.config.js';

const args = yargs(hideBin(process.argv))
const sass = gulpSass(nodeSass);

dotenv.config();

const PROD = process.env.NODE_ENV === 'production';
const TEST = process.env.CI;

const THEME_DIR = process.env.THEME_DIR || args.argv.themeDir || '';

const paths = {
  html: {
    src: ['./src/templates/*.twig', '!./src/templates/*layout.twig'],
    dest: './dist'
  },
  styles: {
    src: './src/scss/**/*.scss',
    dest: './dist/css/'
  },
  scripts: {
    src: './src/js/index.ts',
    dest: './dist/js/'
  },
  images: {
    // ignore sub folders in production build since demo images may be too big.
    src: `./src/images/${PROD ? '*' : '**/*'}.{png,jpg,svg}`,
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

const onError = function (err) {
  notify.onError({
    title: 'Gulp error in ' + err.plugin,
    message: err.toString()
  })(err);
  this.emit('end');
};

const clean = () =>
  deleteAsync([
    './dist/**/*.html',
    './dist/**/*.js',
    './dist/**/*.css',
    './dist/images/*'
  ]);

const serve = () =>
  browserSync.init({
    files: './dist/**/*',
    notify: false,
    server: {
      baseDir: './dist'
    },
    directory: true,
    ghostMode: false
  });

const copyIcons = () =>
  gulp
    .src('./dist/icons/sprites/symbol/svg/sprite.symbol.svg')
    .pipe(rename('icons.twig'))
    .pipe(gulp.dest('./src/templates/partials'));

const lintStyles = () => {
  return gulp.src(paths.styles.src).pipe(
    gulpStylelint({
      failAfterError: false,
      reporters: [{ formatter: 'string', console: true }]
    })
  );
};

const styles = () => {
  const plugins = [autoprefixer()];

  if (PROD) {
    plugins.push(
      cssnano(),
      mqPacker({
        sort: sortCSSMq
      })
    );
  }

  return gulp
    .src(paths.styles.src)
    .pipe(gulpIf(!PROD, sourcemaps.init({ loadMaps: true })))
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulpIf(!PROD, sourcemaps.write('./')))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.styles.dest));
};

const scripts = () =>
  gulp
    .src(paths.scripts.src)
    .pipe(webpack(config))
    .on('error', function handleError() {
      // we want the build to fail in production builds due to TS errors...
      if (PROD) return;
      // ...but recover from errors in development.
      // https://github.com/shama/webpack-stream/issues/34#issuecomment-171644957
      this.emit('end');
    })
    .pipe(gulp.dest(paths.scripts.dest));

const html = () =>
  gulp
    .src(paths.html.src)
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(
      data(function () {
        const ymlData = yaml.load(
          fs.readFileSync('./src/data/data.yml', 'utf8')
        );
        const imageStyles = yaml.load(
          fs.readFileSync('./src/data/image_styles.yml', 'utf8')
        );

        return {
          ...ymlData,
          ...imageStyles,
          env: {
            test: TEST,
            production: PROD,
            // store if this is vercel, so we can change templates for deploy previews
            vercel: Boolean(process.env.VERCEL_URL)
          }
        };
      })
    )
    .pipe(
      gulpTwig({
        base: './src/templates',
        filters: [
          {
            name: 'exists',
            func: (value, args) => {
              if (!value) {
                console.log(args);
                throw new Error('value is falsy');
              }

              return value;
            }
          },
          {
            name: 'groupBy',
            func: (items, field) => {
              const grouped = _.groupBy(items, field[0]);

              const groupArr = Object.keys(grouped).map((key) => ({
                group: key,
                items: grouped[key]
              }));

              return groupArr;
            }
          },
          {
            name: 'cast_to_array',
            func: (items) => {
              return Object.keys(items).map((key) => {
                return {
                  ...items[key],
                  key
                };
              });
            }
          }
        ]
      })
    )
    .pipe(prettify())
    .pipe(gulp.dest(paths.html.dest));

const images = () =>
  gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        mozjpeg({ progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({ cleanupIDs: false })
      ])
    )
    .pipe(gulp.dest(paths.images.dest));

const replaceImagePaths = () => {
  const imagesDir = args.argv.imagesDir || '/images/';
  return gulp
    .src('./dist/css/*.css')
    .pipe(replace('/images/', imagesDir))
    .pipe(gulp.dest('./dist/css'));
};

const copyDeps = () => {
  // NOTE: Chart.bundle.min.js includes Momentjs but so far we are not using time axis
  // http://www.chartjs.org/docs/latest/getting-started/installation.html#bundled-build
  return gulp
    .src([
      './node_modules/chart.js/dist/Chart.min.js',
      './node_modules/iframe-resizer/js/iframeResizer.min.js',
      './node_modules/iframe-resizer/js/iframeResizer.contentWindow.min.js'
    ])
    .pipe(gulp.dest('./dist/js'));
};

const copyMeta = () => {
  return gulp.src(['./composer.json']).pipe(gulp.dest('./dist/'));
};

const deployDist = () => {
  if (!THEME_DIR) {
    return console.error('No `--themeDir` argument passed');
  }

  return gulp
    .src(
      [
        './dist/css/main.css',
        './dist/js/*',
        './dist/images/*'
      ],
      {
        base: './dist'
      }
    )
    .pipe(gulp.dest(THEME_DIR));
};

const watch = () => {
  gulp.watch('./src/templates/**/*.twig', html);
  gulp.watch(paths.styles.src, gulp.parallel(styles, lintStyles));
  gulp.watch(paths.images.src, images);
  gulp.watch('./src/data/*.yml', html);
};

const reportFilesizes = () =>
  gulp
    .src('./dist/**/*.{css,js}')
    .pipe(
      size({
        showFiles: true,
        showTotal: false
      })
    )
    .pipe(
      size({
        showFiles: true,
        brotli: true,
        showTotal: false
      })
    );

const minifySvgs = (src) =>
  gulp
    .src(src)
    .pipe(
      dom(function () {
        const svg = this.querySelector('svg');
        svg.setAttribute('fill-rule', 'evenodd');
        return this.querySelector('body').innerHTML;
      }, false)
    )
    .pipe(
      gulpSvgo({
        plugins: [
          { removeTitle: true },
          { removeXMLNS: true },
          { removeAttrs: { attrs: '(stroke)' } }
        ]
      })
    );

// clean up and minify svgs
const cleanAndCopyIcons = () =>
  minifySvgs('./src/icons/*.svg').pipe(gulp.dest('./dist/icons/svg'));

// create svg sprite
const buildIconSprite = () =>
  minifySvgs('./src/icons/*.svg')
    .pipe(
      svgSprite({
        svg: {
          xmlDeclaration: false
        },
        shape: {
          id: {
            generator: 'icon-%s'
          }
        },
        mode: {
          symbol: {
            // Activate the defs mode
            bust: false, // Cache busting
            example: true // Build a page
          }
        }
      })
    )
    .pipe(gulp.dest('./dist/icons/sprites'));

task('scripts', scripts);
task('styles', styles);
task('cleanAndCopyIcons', cleanAndCopyIcons);
task('replaceImagePaths', replaceImagePaths);
task('lintStyles', lintStyles);
task('copyDeps', copyDeps);

task(
  'build',
  series(
    clean,
    copyDeps,
    copyMeta,
    parallel(html, images, lintStyles, styles, scripts),
    reportFilesizes
  )
);
task('icons', series(buildIconSprite, copyIcons));
task('dev', parallel('build', watch, serve));
task('devSaw', parallel('build', watch));
task('deploy', series(replaceImagePaths, deployDist));
