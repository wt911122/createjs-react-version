'use strict';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const openBrowser = require('react-dev-utils/openBrowser');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
  openBrowser("localhost:5000");
});
