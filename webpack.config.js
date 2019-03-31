const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    index: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: `${__dirname}`,
    filename: 'lib/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: [
            ['@babel/preset-env', { useBuiltIns: 'entry' }],
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: false }],
            ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
            ['@babel/plugin-transform-classes', { loose: true }],
            ['@babel/plugin-transform-proto-to-assign'],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  mode: 'production',
};
