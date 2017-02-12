const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, 'src/client/app/index.jsx'),
  cssSrc: path.join(__dirname, 'src/client/styles/styles.css'),
  compiled: path.join(__dirname, 'src/public-dist')
};

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [PATHS.src, PATHS.cssSrc, 'webpack-hot-middleware/client'],
  output: { path: PATHS.compiled, filename: 'app.bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader?presets[]=es2015,presets[]=react'],
        exclude: /node_modules/
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'MAPS_KEY': JSON.stringify(process.env.MAPS_KEY)
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;