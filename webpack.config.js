const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const PROD = process.env.NODE_ENV === 'production';
const CAMP_PROJ = process.env.PROJ === 'campaign';

const plugins = [
  // ignore moment imported by pikaday
  new webpack.IgnorePlugin({
    resourceRegExp: /moment$/
  })
];

module.exports = {
  watch: !PROD,
  mode: PROD ? 'production' : 'development',
  entry: CAMP_PROJ ? './src/campaign/js/index.ts' : {
    main: './src/js/index.ts',
    journey: './src/js/journey-module.ts'
  },
  devtool: PROD ? false : 'inline-source-map',
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
    filename: CAMP_PROJ ? 'bundle.js' : '[name].bundle.js'
  },
  // plugins: PROD ? plugins : [...plugins, new BundleAnalyzerPlugin()]
  plugins: PROD ? plugins : [...plugins]
};
