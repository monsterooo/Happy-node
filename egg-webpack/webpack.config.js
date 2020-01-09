'use strict';
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/assets/';
module.exports = {
  mode: 'development',
  entry: [ resolve(__dirname, 'admin/app.js') ],
  output: {
    path: resolve(__dirname, 'app/public/assets/'),
    publicPath,
    filename: '[name].[hash:4].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'egg webpack html',
    }),
  ],
};
