'use strict';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const openBrowser = require('react-dev-utils/openBrowser');

const config = require('./webpack.config.prod.js');

const compiler = webpack(config);
compiler.run((err, stat) => {
  if(err) {
    console.log(err);
  }
})
