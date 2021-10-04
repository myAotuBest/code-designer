const { join, resolve } = require('path');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');

// http://182.92.168.192:8081
// 获取命令执行中的参数
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _modeFlag = _mode === 'production';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const getConfigPath = (mode) => {
  return resolve(__dirname, `.env.${mode}`);
};

const webpackBaseConfig = {
  entry: {
    app: resolve('./src/index.tsx'),
  },
  output: {
    path: join(__dirname, './dist/assets'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              sourceMap: !_modeFlag === 'development',
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeFlag
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      chunkFilename: _modeFlag
        ? 'styles/[id].[contenthash:5].css'
        : 'styles/[id].css',
      ignoreOrder: true,
    }),
    new WebpackBar(),
    new Dotenv({
      path: getConfigPath(_mode),
    }),
  ],
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
