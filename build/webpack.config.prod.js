/**
 * @name 区分开发环境和生产环境的webpack配置
 */
const path = require('path')
// 合并webpack配置文件
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 配置CSS单独分离打包  开发环境使用 vue-style-loader   生产环境使用 MiniCssExtractPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// JavaScript 压缩工具，单线程压缩代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// JavaScript 压缩工具，多个子进程并行压缩代码
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 打包进度条显示
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
// 多进程Loader文件转换处理
const HappyPack = require('happypack')
// 构造出共享进程池，进程池中包含4个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 4 })

const config = merge(baseConfig, {
  // 不生成 source map，sourceMap 生成耗时严重
  devtool: 'none',

  // 性能优化
  optimization: {
    // 开启Scope Hoisting,打包出来的代码文件更小、运行的更快
    concatenateModules: true,
  },

  module: {
    rules: [
      // 解析和转换 css代码 或 .css 文件
      // css-loader: 对 @import 和 url() 进行处理，但此时页面样式并不生效
      // style-loader: 将 css-loader 打包好的 CSS 代码以<style>标签的形式插入到 HTML 文件中。页面样式生效
      // 它会应用到普通的 `.css` 文件 以及  `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
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
          'css-loader',
          {
            // 只要使用 postcss-loader，必须配置 postcss-preset-env 插件
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                // 智能合并压缩css代码
                require('cssnano')(),
                // 跟 babel 的 preset-env 类似的功能，通过它可以安心的使用最新的 CSS 语法来写样式，不用关心浏览器兼容性，给 css 补齐各种浏览器私有的前缀，处理浏览器兼容问题
                require('postcss-preset-env')(),
              ],
            },
          },
        ],
      },
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
              plugins: () => [
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

    // 打包进度条显示
    new SimpleProgressWebpackPlugin(),

    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      cache: false, // 开启缓存
      parallel: true, // 开启多个进程并行处理
      uglifyJS: {
        // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
        warnings: true,
        output: {
          // 最紧凑的输出,是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果
          beautify: false,
          // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          comments: false,
        },
        compress: {
          // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          drop_console: true,
          // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为不转换，为了达到更好的压缩效果，可以设置为false
          collapse_vars: true,
          // 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成var a = 'xxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          reduce_vars: true,
        },
      },
    }),
    // new UglifyJsPlugin({
    //   cache: false, // 开启缓存
    //   parallel: true, // 开启多个进程并行处理
    //   uglifyOptions: {
    //     // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
    //     warnings: false,
    //     output: {
    //       // 最紧凑的输出,是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果
    //       beautify: false,
    //       // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
    //       comments: false,
    //     },
    //     compress: {
    //       // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
    //       drop_console: true,
    //       // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为不转换，为了达到更好的压缩效果，可以设置为false
    //       collapse_vars: true,
    //       // 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成var a = 'xxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
    //       reduce_vars: true,
    //     },
    //   },
    // }),
  ],
})

module.exports = config
