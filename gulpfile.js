const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const data = require('gulp-data');
const notify = require('gulp-notify');
const eslint = require('gulp-eslint');
const prettify = require('gulp-prettify');
const imagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');
const replace = require('gulp-replace');
const yaml = require('js-yaml');
const del = require('del');
const beeper = require('beeper');
const args = require('yargs').argv;
const gulpIf = require('gulp-if');
const cmq = require('gulp-combine-mq');
const size = require('gulp-size');
const rename = require('gulp-rename');
const rollup = require('rollup');

const rollupBabel = require('rollup-plugin-babel');
const rollupResolve = require('rollup-plugin-node-resolve');
const rollupCommon = require('rollup-plugin-commonjs');

const production = !!args.production;

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
    // TODO: make this so browserify can process multiple files
    src: './src/js/**/*.js',
    dest: './dist/js/'
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
if (!production && args.themeDir) {
  paths.styles.dest = args.themeDir + '/css/';
  paths.scripts.dest = args.themeDir + '/js/';
  paths.images.dest = args.themeDir + '/images/';
}

const onError = function(err) {
  notify.onError({
    title: 'Gulp error in ' + err.plugin,
    message: err.toString()
  })(err);
  beeper();
  this.emit('end');
};

gulp.task('clean', done => {
  return del(
    [
      './dist/**/*.html',
      './dist/**/*.js',
      './dist/**/*.css',
      './dist/images/*'
    ],
    done
  );
});

gulp.task('server', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './dist'
    },
    open: false,
    directory: true
  });
});

gulp.task('copy:icons', () => {
  return gulp
    .src('./node_modules/middlebury-design-system/dist/icons/mds-icons.svg')
    .pipe(rename('icons.twig'))
    .pipe(gulp.dest('./src/templates/partials'));
});

gulp.task('styles', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpIf(!production, sourcemaps.init({ loadMaps: true })))
    .pipe(
      sass({
        onError: browserSync.notify
      })
    )
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(gulpIf(production, cmq()))
    .pipe(gulpIf(production, cssnano()))
    .pipe(gulpIf(!production, sourcemaps.write('./')))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('scripts:dev', () =>
  rollup
    .rollup({
      input: './src/js/index.js',
      plugins: [
        rollupBabel({
          exclude: 'node_modules/**',
          presets: [
            [
              'env',
              {
                modules: false
              }
            ]
          ],
          plugins: ['external-helpers', 'transform-class-properties']
        }),
        rollupResolve(),
        rollupCommon()
      ]
    })
    .then(bundle =>
      // TODO: figure out how to only build one and import it into gatsby site
      Promise.all([
        bundle.write({
          file: './dist/js/bundle.js',
          format: 'iife',
          name: 'MDS',
          sourcemap: true
        })
        // bundle.write(docsBundle)
      ])
    )
    .then(() => {
      browserSync.reload();
    })
);

// gulp.task('scripts', function() {
//   var b = browserify({
//     entries: './src/js/index.js',
//     debug: true,
//     transform: [[babelify, { presets: ['es2015'] }]]
//   });

//   return b
//     .bundle()
//     .on('error', function(err) {
//       console.error(err.message); // eslint-disable-line no-console
//       beeper();
//       this.emit('end');
//     })
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(gulpIf(!production, sourcemaps.init({ loadMaps: true })))
//     .pipe(gulpIf(production, uglify()))
//     .on('error', gutil.log)
//     .pipe(gulpIf(!production, sourcemaps.write('./')))
//     .pipe(size({ showFiles: true }))
//     .pipe(gulp.dest(paths.scripts.dest))
//     .pipe(browserSync.stream());
// });

gulp.task('html', () => {
  gulp
    .src(paths.html.src)
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(
      data(function(file) {
        // TODO: how to import a glob?
        return yaml.safeLoad(fs.readFileSync('./src/data/data.yml', 'utf8'));
      })
    )
    .pipe(
      twig({
        base: './src/templates'
      })
    )
    .pipe(prettify())
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp
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
});

gulp.task('watch', () => {
  gulp.watch('./src/templates/**/*.twig', ['html']);
  gulp.watch(paths.styles.src, ['styles']);
  gulp.watch(paths.images.src, ['images']);
  gulp.watch(paths.scripts.src, ['scripts:dev']);
  gulp.watch('./src/data/*.yml', ['html']);
});

gulp.task('replace:imageurls', () => {
  const imagesDir = args.imagesDir || '/images/';
  return gulp
    .src('./dist/css/*.css')
    .pipe(replace('/images/', imagesDir))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy:deps', function() {
  // NOTE: Chart.bundle.min.js includes Momentjs but so far we are not using time axis
  // http://www.chartjs.org/docs/latest/getting-started/installation.html#bundled-build
  gulp
    .src(['./node_modules/chart.js/dist/Chart.min.js'])
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('deploy', ['replace:imageurls'], () => {
  const dest = args.themeDir || '';
  if (!args.themeDir) {
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
    .pipe(gulp.dest(dest));
});

gulp.task('build', [
  'clean',
  'copy:icons',
  'html',
  'images',
  'styles',
  // 'scripts:lint',
  'scripts:dev'
  // 'copy:deps'
]);

gulp.task('dev', ['build', 'watch']);

gulp.task('default', ['build', 'watch', 'server']);
