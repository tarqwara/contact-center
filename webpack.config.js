const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist'
  },
  resolve: {
    alias: {
      Api: path.resolve(__dirname, 'src/server/api'),
      Component: path.resolve(__dirname, 'src/app/component'),
      Db: path.resolve(__dirname, 'src/app/db'),
      Route: path.resolve(__dirname, 'src/server/routes'),
      Service: path.resolve(__dirname, 'src/server/service'),
      Util: path.resolve(__dirname, 'src/app/util')
    },
    extensions: ['.js', '.jsx']
  },
  devtool: "source-map"
};

const serverConfig = {
  entry: {
    server: path.join(__dirname, 'src/server/index.js')
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  ...commonConfig
};

const clientConfig = {
  entry: {
    app: path.join(__dirname, 'src/app/index.js')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new HtmlWebpackPlugin({
      title: 'Contact center',
      template: path.join(__dirname, 'src/server/index.html')
    }),
    new ExtractTextPlugin('styles.css')
  ],
  ...commonConfig
};

module.exports = [serverConfig, clientConfig];