/**
 * @name 区分开发环境和生产环境的webpack配置
 */

// 配置CSS单独分离打包  开发环境使用 vue-style-loader   生产环境使用 MiniCssExtractPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// JavaScript 压缩工具，只在mode=production中会被使用
const TerserPlugin = require('terser-webpack-plugin')
// JavaScript 压缩工具，只在mode=production中会被使用
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 合并webpack配置文件
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = merge(baseConfig, {
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
              // 为CSS中的图像、文件等外部资源指定自定义公共路径，将CSS文件抽离出来后，css文件和资源文件可能不在同一级目录，需要添加'./' '../' '../../'，此时会在url()等引用外部资源的地方自动添加相对路径'./' '../' '../../'
              // 和MiniCssExtractPlugin-》filename有关，
              // 若filename 为 '[name].[contenthash:8].css',则 publicPath 为 './'
              // 若filename 为 'css/[name].[contenthash:8].css',则 publicPath 为 '../'
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            // 配置 css-loader 作用于 @import 引入的css文件之前，要使用几个其它的loader进行处理
            // 此处有两个loader  postcss-loader、less-loader
            options: {
              importLoaders: 2,
            },
          },
          {
            // 只要使用 postcss-loader，必须配置 postcss-preset-env 插件
            loader: 'postcss-loader',
            options: {
              plugins: [
                // 智能合并压缩css代码
                require('cssnano')(),
                // 跟 babel 的 preset-env 类似的功能，通过它可以安心的使用最新的 CSS 语法来写样式，不用关心浏览器兼容性，给 css 补齐各种浏览器私有的前缀，处理浏览器兼容问题
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
    //  配置CSS单独分离打包，将CSS从JS中抽离出来，为每个包含CSS的JS文件创建一个CSS文件
    // 输出 [contenthash:8] 哈希算法随机生成 8位 大/小写字母和数字 例如： main.5917e715.css
    // 只要css文件内容不变，那么不会重复构建，粒度是每个文件的内容
    new MiniCssExtractPlugin({
      // 输出路径是output->path指定的路径
      // 输出 css 的名称，一般是入口文件对应的css文件
      filename: 'css/[name].[contenthash:8].css',
      // 输出非入口(non-entry) chunk 文件的名称，默认'[id].js'
      chunkFilename: 'css/[id].[contenthash:8].css',
      // 删除有关css冲突顺序的警告，例如在a.js 里，引入的顺序是1.css、2.css; 在b.js里，引入顺序是1.css、2.css,
      ignoreOrder: true,
    }),
  ],

  // 不生成 source map，sourceMap 生成耗时严重
  devtool: 'none',

  // 压缩优化代码
  optimization: {
    // 作用域提升（Scope Hoisting）: 通过 ES6 语法的静态分析，分析出模块之间的依赖关系，尽可能地把模块放到同一个函数中
    // 通过 Scope Hoisting 的功能可以让 Webpack 打包出来的代码文件更小、运行的更快
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: true, // 多线程
      }),
    ],
  },
})

module.exports = config
