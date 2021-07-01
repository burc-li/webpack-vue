/**
 * @name 区分开发环境和生产环境的webpack配置
 */
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 4 })

const config = merge(baseConfig, {
  devtool: 'none',

  stats: {
    modules: false,
    children: false,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'happypack/loader?id=css',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'happypack/loader?id=less',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css',
      ignoreOrder: true,
    }),

    new SimpleProgressWebpackPlugin(),

    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [
        'css-loader',
        'postcss-loader',
      ],
    }),

    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
        'less-loader',
      ],
    }),

    new ParallelUglifyPlugin({
      cache: false,
      parallel: true,
      uglifyJS: {
        warnings: true,
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
  ],

  optimization: {
    concatenateModules: true,
    splitChunks: {
      minSize: 30000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minChunks: 1,
          priority: -10,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
})

module.exports = config
