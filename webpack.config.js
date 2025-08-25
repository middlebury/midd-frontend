import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

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
  entry: {
    main: './src/js/index.ts',
    journey: './src/js/journey-module.ts',
    calculator: './src/js/cost-calculator.ts' // for the sfs cost calculator
  },
  devtool: PROD ? false : 'inline-source-map',
  stats: 'normal',
  module: {
    rules: [
      {
        // enable tree shaking of js files
        test: /\.js$/,
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
    filename: '[name].bundle.js'
  },
  plugins: PROD ? plugins : [...plugins, new BundleAnalyzerPlugin()]
};

export default config;
