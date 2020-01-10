const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = '/public/assets/';

console.log('env >>> ', process.env.NODE_ENV);

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: [ resolve(__dirname, 'admin/src/app.js') ],
  output: {
    path: resolve(__dirname, 'app/public/assets/'),
    publicPath,
    filename: '[name].[hash:4].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: isProduction,
            compact: isProduction,
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
            ],
            plugins: [
              require.resolve('@babel/plugin-proposal-class-properties'),
              require.resolve('@babel/plugin-syntax-dynamic-import'),
              require.resolve(
                '@babel/plugin-proposal-async-generator-functions'
              ),
              [
                require.resolve('@babel/plugin-transform-runtime'),
                {
                  helpers: true,
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
      // Copied from react-boilerplate https://github.com/react-boilerplate/react-boilerplate
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        loaders: [
          require.resolve('file-loader'),
          // Copied from react-boilerplate https://github.com/react-boilerplate/react-boilerplate
          {
            loader: require.resolve('image-webpack-loader'),
            query: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'egg webpack html',
    }),
  ],
};
