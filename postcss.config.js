/* eslint-env node */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');
const cmq = require('postcss-combine-media-query');

const PROD = process.env.NODE_ENV === 'production';

module.exports = () => {
  const plugins = [autoprefixer()];

  if (PROD) {
    plugins.push(
      cssnano(),
      cmq(),
      purgecss({
        content: ['./src/templates/**/*.twig', './src/js/**/*.js']
      })
    );
  }

  return { plugins };
};
