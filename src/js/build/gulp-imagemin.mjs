import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import { paths } from '../../../gulpfile';

export const images = () =>
  gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(paths.images.dest));

// module.exports = {
//   images
// };
