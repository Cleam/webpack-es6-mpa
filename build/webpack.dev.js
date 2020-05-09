const webpack = require('webpack');
const config = require('./config');
const notifier = require('node-notifier');
const chalk = require('chalk');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const internalIp = require('internal-ip');
const localIP = internalIp.v4.sync();
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const PORT = config.dev.port || '8888';
const devConfig = merge(commonConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: config.dev.assetsRoot,
    clientLogLevel: 'warning',
    host: '0.0.0.0',
    hot: true,
    compress: true,
    port: PORT,
    open: config.dev.autoOpenBrowser,
    publicPath: config.dev.assetsPublicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    // proxy: config.dev.proxyTable,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Local    ->  http://localhost:${PORT}/`, `Network  ->  http://${localIP}:${PORT}/`]
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        // console.log(chalk, red(error.webpackError).split('- compiler')[0]);
        console.log(chalk.red(error.webpackError));
        notifier.notify({
          title: 'Webpack error',
          message: error.webpackError,
          subtitle: error.file || '',
          icon: 'https://mini.eastday.com/toutiaoh5/img/logo.jpg'
        });
      }
    })
  ]
});
module.exports = devConfig;
