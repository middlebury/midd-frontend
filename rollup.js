/* eslint-env node */
/* eslint-disable no-console */
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonJS = require('rollup-plugin-commonjs');
const { uglify } = require('rollup-plugin-uglify');
const sizes = require('rollup-plugin-sizes');
const filesize = require('rollup-plugin-filesize');

const production = process.env.NODE_ENV === 'production';

module.exports = modules => {
  return Promise.all(
    modules.map(module => {
      return rollup({
        input: module.input,
        plugins: [
          babel({
            exclude: /node_modules\/(?!(dom7|ssr-window|swiper|micromodal|lozad|focus-within)\/).*/,
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
          commonJS({
            // ignore importing optional momentjs, which comes with pikaday
            ignore: ['moment']
          }),
          production && uglify(),
          production && sizes(),
          production && filesize()
        ]
      })
        .then(bundle =>
          bundle.write({
            file: module.file,
            format: 'iife',
            sourcemap: !production
          })
        )
        .catch(err => {
          console.error(err);
          throw err;
        });
    })
  );
};
