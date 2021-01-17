/**
 * @name 区分开发环境和生产环境的webpack配置
 */

// 配置CSS单独分离打包  开发环境使用 vue-style-loader   生产环境使用 MiniCssExtractPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 合并webpack配置文件
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = merge(baseConfig, {

  // 输出 [chunkhash:8] 哈希算法随机生成 8位 大/小写字母和数字 例如： main.f6788b03.js
  // 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
  // 我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。
  output: {
    filename: '[name].[chunkhash:8].js',
  },

  module: {
    rules: [
      // 解析和转换.less 文件
      // Loader 解析顺序从右向左 style-loader(css-loader(less-loader(content)))
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: './',
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          'less-loader',
        ],
      },
    ],
  },

  plugins: [
    // 配置CSS单独分离打包，将css从js中抽离出来
    // 输出 [contenthash:8] 哈希算法随机生成 8位 大/小写字母和数字 例如： main.5917e715.css
    // 只要css文件内容不变，那么不会重复构建，粒度是每个文件的内容
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
})

module.exports = config
