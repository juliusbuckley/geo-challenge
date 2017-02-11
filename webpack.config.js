const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, 'src/client/app/index.jsx'),
  cssSrc: path.join(__dirname, 'src/client/styles/styles.css'),
  compiled: path.join(__dirname, 'src/public-dist')
};

const config = {
  entry: [PATHS.src, PATHS.cssSrc],
  output: { path: PATHS.compiled, filename: 'app.bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
};

module.exports = config;