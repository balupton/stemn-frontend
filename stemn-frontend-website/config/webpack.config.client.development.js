const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('./webpack.config.base')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const getGlobalEnv = require('./getGlobalEnv')

const GLOBALS = getGlobalEnv('development')

module.exports = merge(config, {
  debug: true,
  devtool: 'eval-source-map',
  entry: {
    application: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      'client/app/index.js',
    ],
    vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/images'),
        to: 'images',
      }, {
        from: path.join(__dirname, '../src/static'),
        to: 'static',
      },
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
    }),
  ],
  module: {
    loaders: [
      // Globals
      {
        test: /\.(css|scss)$/,
        include: [
          path.resolve(__dirname, '../src/client/styles/global'),
        ],
        loaders: [
          'style',
          'css',
          'postcss',
          { loader: 'sass', query: { outputStyle: 'expanded' } },
        ],
      },
      // CSS Modules
      {
        test: /\.(css|scss)$/,
        include: [
          path.resolve(__dirname, '../src/client'),
          path.resolve(__dirname, '../node_modules/stemn-frontend-shared'),
        ],
        loaders: [
          'style',
          {
            loader: 'css',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            },
          },
          'postcss',
          {
            loader: 'sass',
            query: {
              outputStyle: 'expanded',
            },
          },
        ],
      },
    ],
  },
})