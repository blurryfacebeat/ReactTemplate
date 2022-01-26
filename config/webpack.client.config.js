const path = require('path');
// const HtmlWebpackPlugin  = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';

const setupDevtool = () => {
  return IS_DEV ? 'source-map' : false;
};

const clientConfig = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
  entry: [
    path.resolve(__dirname, '../src/client/index.jsx'),

  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      }
    ],
  },
  // Сейчас не нужно, так как есть SSR
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, 'index.html'),
  //   })
  // ],
  // devServer: {
  //   port: 3000,
  //   open: true,
  //   hot: IS_DEV,
  // },
  devtool: setupDevtool(),
};

module.exports = clientConfig;