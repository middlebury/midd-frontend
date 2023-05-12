import webpack from 'webpack';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'; 

const PROD = process.env.NODE_ENV === 'production';

// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  // ignore moment imported by pikaday
  new webpack.IgnorePlugin({
    resourceRegExp: /moment$/
  })
];

const config = {
  watch: !PROD,
  mode: PROD ? 'production' : 'development',
  entry: {
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
    filename: '[name].bundle.js'
  },
  plugins: PROD ? plugins : [...plugins, new BundleAnalyzerPlugin()]
};

export default config;
