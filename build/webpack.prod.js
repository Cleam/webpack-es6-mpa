const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const hasAnalyzer = process.env.WEBPACK_ANALYZER === '1';
const IS_PRE = process.env.NODE_ENV === 'preproduction';
const cfg = IS_PRE ? config.pre : config.build;

const proConfig = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:6].js',
    chunkFilename: 'js/[name].[contenthash:6].js',
    path: cfg.assetsRoot,
    publicPath: cfg.assetsPublicPath
  },
  devtool: 'source-map',
  optimization: {},
  plugins: [
    new CleanWebpackPlugin([cfg.assetsRoot], {
      root: path.join(__dirname, '..')
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
});

if (hasAnalyzer) {
  proConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = proConfig;
