const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.config.js');

const compiler = webpack({ ...webpackDevConfig, mode: 'development' });
const server = new WebpackDevServer(compiler, {
  hot: true,
  filename: 'index.js',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
});

const port = 8000;
server.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));
