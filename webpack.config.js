const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    entry: path.join(__dirname, 'src/server/index.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
      publicPath: '/'
    },
    target: 'node',
    externals: nodeExternals(),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  {
    entry: path.join(__dirname, 'src/client/index.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
];