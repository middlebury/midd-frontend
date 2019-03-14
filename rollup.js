const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonJS = require('rollup-plugin-commonjs');
const { uglify } = require('rollup-plugin-uglify');
const ignore = require('rollup-plugin-ignore');
const sizes = require('rollup-plugin-sizes');
const filesize = require('rollup-plugin-filesize');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  input: './src/js/index.js',
  plugins: [
    ignore(['moment']),
    babel({
      exclude: /node_modules\/(?!(dom7|ssr-window|swiper|micromodal|lozad)\/).*/,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ],
      plugins: [
        ['@babel/transform-react-jsx', { pragma: 'h' }],
        '@babel/plugin-proposal-class-properties'
      ]
    }),
    resolve(),
    commonJS(),
    production && uglify(),
    sizes(),
    filesize()
  ]
};
