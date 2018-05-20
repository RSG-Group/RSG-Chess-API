// webpack.config.js
/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var libraryName = 'rsg-chess-graphics';

var config = {
  entry:{
    scripts: __dirname + '/js/scripts.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/js',
    filename: '[name].min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};

module.exports = config;