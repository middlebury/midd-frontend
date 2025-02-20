import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'; 
import path from 'node:path';

const PROD = process.env.NODE_ENV === 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/js/';

const plugins = [
  // ignore moment imported by pikaday
  new webpack.IgnorePlugin({
    resourceRegExp: /moment$/
  })
];

const config = {
  watch: !PROD,
  mode: PROD ? 'production' : 'development',
  optimization: {
    usedExports: true
  },
  entry: {
    main: './src/js/index.ts',
    journey: './src/js/journey-module.ts'
  },
  devtool: PROD ? false : 'inline-source-map',
  stats: 'normal',
  module: {
    rules: [
      {
        // declaring no sideEffects for files with .mjs extension which is mainly swiper
        test: /\.mjs$/,
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
    publicPath: ASSET_PATH,
    filename: '[name].bundle.js',
    path: path.join(process.cwd(), 'dist/js')
  },
  plugins: PROD ? plugins : [...plugins, new BundleAnalyzerPlugin()]
};

export default config;
