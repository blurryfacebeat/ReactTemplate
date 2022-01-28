const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const generateFileName = (type, extension) => {
  return IS_DEV
    ? `[${type}].${extension}`
    : `[${type}].[hash:base64:10].${extension}`;
};

const setupDevtool = () => {
  return IS_DEV ? 'source-map' : false;
};

const clientConfig = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/client/index.tsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/static/',
    chunkFilename: IS_DEV
      ? 'js/[name].chunk.js'
      : 'js/[name].[hash:base64:10].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.module\.s[ac]ss$/,
        use: [
          {
            loader: IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module.(s[ac]ss)$/,
        use: [
          {
            loader: IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader, // Если режим dev, то работает css in js, чтобы был Hot Reload. Если prod, то собирается один css файл (это работает быстрее).
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devtool: setupDevtool(),
  // Для SSR, чтобы чистить чанки и подключать HMR
  plugins: IS_DEV
    ? [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()]
    : [],
  // Берется отсюда для webpackDevMiddleware
  watchOptions: {
    ignored: /dist/,
  },
};

module.exports = clientConfig;
