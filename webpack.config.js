const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'electron-renderer',  // Add this line to target the Electron renderer process
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/preload.js', to: './preload.js' },
      ],
    }),
  ],
  node: {
    __dirname: false,  // Add this line to prevent the "__dirname is not defined" error
  },
  resolve: {
    fallback: {
      fs: false,  // Add this line to exclude the fs module from being bundled
    },
  },
};
