/**
 * @name webpack基础配置
 */

const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebPlugin, AutoWebPlugin } = require('web-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 4 })

const pathConfig = require('./pathConfig')
const devConfig = require('../config/dev.env')
const prodConfig = require('../config/prod.env')

const isDev = process.env.NODE_ENV === 'development'

// 可视化分析包大小配置
const BundleAnalyzerPluginInstance = new BundleAnalyzerPlugin({
  analyzerMode: 'server',
  analyzerHost: '127.0.0.1',
  analyzerPort: 8001,
  reportFilename: 'report.html',
  defaultSizes: 'parsed',
  openAnalyzer: true,
  generateStatsFile: false,
  statsFilename: 'stats.json',
  statsOptions: null,
  logLevel: 'info',
})

const config = {
  mode: isDev ? 'development' : 'production',

  stats: 'minimal',

  performance: {
    maxEntrypointSize: 1024 * 1024 * 3,
    maxAssetSize: 1024 * 1024 * 3,
  },

  entry: {
    main: pathConfig.appEntry,
  },

  output: {
    filename: isDev ? 'bundle.[hash:8].js' : 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    path: pathConfig.appDist,
    publicPath: isDev ? '/' : '/h5/',
  },

  resolve: {
    alias: {
      '@': pathConfig.appSrc,
      '@assets': pathConfig.appAssets,
      '@components': pathConfig.appComponents,
    },
    extensions: ['.vue', '.js', '.jsx', '.json', '.scss', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },

      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        exclude: [pathConfig.appNodeModules],
        include: [pathConfig.appSrc],
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isDev ? '[path]/[name].[ext]' : '[name].[hash:8].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },

      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: isDev ? '[path]/[name].[ext]' : '[name].[hash:8].[ext]',
              outputPath: 'images/',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: isDev,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new webpack.DefinePlugin({
      'process.env': isDev ? devConfig : prodConfig,
    }),

    new WebPlugin({
      template: pathConfig.appTemplate,
      filename: 'index.html',
      requires: ['main', 'vendor', 'commons'],
    }),

    // new HtmlWebpackPlugin({
    //   template: pathConfig.appTemplate,
    //   filename: 'index.html', // 默认名称为index.html
    // }),

    new HappyPack({
      id: 'babel',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory'],
    }),

    new CopyPlugin([{ from: pathConfig.appStatics, to: pathConfig.appDistStatics }]),
  ],
}

if (process.env.REPORT_VIS === 'yes') {
  config.plugins.push(BundleAnalyzerPluginInstance)
}

module.exports = config
