require('dotenv').config();
const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');

const HMR_PORT = process.env.HMR_PORT || 3001;

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(
  webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
    stats: 'errors-only',
  })
);

hmrServer.use(
  webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
  })
);

hmrServer.listen(HMR_PORT, () => {
  console.log(`HMRServer started on ${HMR_PORT} PORT`);
});

const serverCompiler = webpack(webpackServerConfig);

serverCompiler.run((error) => {
  if (error) {
    console.log('Compilation failed: ', error);
  }

  serverCompiler.watch({}, (error) => {
    if (error) {
      console.log('Compilation failed: ', error);
    }

    console.log('Compilation was successfully');
  });

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ],
  });
});
