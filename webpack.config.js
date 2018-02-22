// webpack.config.js

var webpack = require('webpack');
var path = require('path');
var libraryName = 'rsg-chess';

var config = {
  entry:{
    index: __dirname + '/src/index.js',
    test: __dirname + '/test/index.js',
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: '[name].js',
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