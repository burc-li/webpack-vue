/**
 * @name 开发环境的webpack配置
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const pathConfig = require('./pathConfig')
const port = 8002
const devServer = {
  port,
  host: '127.0.0.1',
  clientLogLevel: 'none',
  overlay: {
    errors: false,
  },
  open: false,
  hot: true,
  inline: true,
  publicPath: '/',
  historyApiFallback: {
    index: '/index.html',
  },
}

const config = merge(baseConfig, {
  devServer,

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-preset-env')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-preset-env')(),
              ],
            },
          },
          'less-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://127.0.0.1:${port}/`],
      },
      clearConsole: true,
    }),

    new webpack.DllReferencePlugin({
      context: pathConfig.appDll,
      manifest: require(path.resolve(pathConfig.appDll, 'vendors.manifest.json')),
    }),
  ],

})

module.exports = config
