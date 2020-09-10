const path = require('path');
const webpack = require('webpack');

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  watch: !PROD,
  mode: PROD ? 'production' : 'development',
  entry: './src/js/index.ts',
  devtool: PROD ? false : 'inline-source-map',
  module: {
    rules: [
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
    filename: 'bundle.js'
  },
  plugins: [
    // ignore moment imported by pikaday
    new webpack.IgnorePlugin({
      resourceRegExp: /moment$/
    })
  ]
};
