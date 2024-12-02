// const path = require('path');

// module.exports = {
//   entry: './src/assets/main.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'src', 'assets'),
//   },
//   target: 'web',
//   mode: 'development',
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'src/assets'),
//     },
//     proxy: [{
//       context: ['/balance', '/api'],
//       target: 'http://localhost:4943',
//     }],
//     hot: true,
//     open: true
//   },
//   resolve: {
//     alias: {
//       '@dfinity/agent': path.resolve(__dirname, 'node_modules/@dfinity/agent'),
//     },
//   },
// };

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/assets/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src', 'assets'),
  },
  target: 'web',
  mode: 'development',
  plugins: [
    new Dotenv()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/assets'),
    },
    proxy: [{
      context: ['/balance', '/api'],
      target: 'http://localhost:4943',
    }],
    hot: true,
    open: true
  },
  resolve: {
    alias: {
      '@dfinity/agent': path.resolve(__dirname, 'node_modules/@dfinity/agent'),
    },
  },
};