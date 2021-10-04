const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const logo = join(__dirname, 'coderX.png');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
    assetModuleFilename: 'images/[name][ext]',
    filename: 'scripts/[name].bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, '../dist'),
    hot: true,
    hotOnly: true,
    port: 8082,
    open: true,
    quiet: true,
    watchContentBase: true,
    inline: true,
  },
  devtool: 'source-map',
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'CoderX 😊',
      logo: logo,
      suppressSuccess: true, // don't spam success notifications
    }),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '低代码生成器CoderX',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index-dev.html'),
    }),
  ],
};
