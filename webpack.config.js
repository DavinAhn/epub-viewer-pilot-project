const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: `${__dirname}`,
    filename: './public/js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: [
            '@babel/preset-env',
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
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api/**': 'http://localhost:8080',
      changeOrigin: true,
    },
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
