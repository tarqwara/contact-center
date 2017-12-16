const path = require('path');
const nodeExternals = require('webpack-node-externals');

const commonConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
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
  },
  devtool: "source-map"
};

module.exports = [
  {
    entry: {
      server: path.join(__dirname, 'src/server/index.js')
    },
    target: 'node',
    externals: nodeExternals(),
    ...commonConfig
  },
  {
    entry: {
      bundle: path.join(__dirname, 'src/client/index.js')
    },
    ...commonConfig
  }
];