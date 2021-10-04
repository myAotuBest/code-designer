const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');

module.exports = {
  mode: 'production',
  output: {
    assetModuleFilename: 'images/[name].[contenthash:5].bundle.[ext]',
    filename: 'scripts/[name].[contenthash:5].bundle.js',
    publicPath: '/assets',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    // https://segmentfault.com/a/1190000039730567
    splitChunks: {
      chunks: 'async', // initial all  函数
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          name: 'commons',
        },
      },
      minSize: {
        javascript: 100000,
        style: 100000,
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '低代码生成器CoderX',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index-prod.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
    }),
  ],
};
