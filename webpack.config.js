const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const PROD = process.env.NODE_ENV === 'production';

const plugins = [
  // ignore moment imported by pikaday
  new webpack.IgnorePlugin({
    resourceRegExp: /moment$/
  })
];

module.exports = {
  watch: !PROD,
  mode: PROD ? 'production' : 'development',
  entry: {
    main: './src/js/index.ts',
    journey: './src/js/journey-module.ts'
  },
  devtool: 'inline-source-map',
  stats: 'normal',
  module: {
    rules: [
      {
        // here doing the swiper loader and declaring no sideEffects
        test: /swiper\.esm\.js/,
        sideEffects: false
      },
      {
        test: /\.(tsx|ts|js)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js'
  },
  plugins: PROD ? plugins : [...plugins, new BundleAnalyzerPlugin()]
};
