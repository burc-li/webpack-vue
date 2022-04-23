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
  devtool: false,

  // 准确地控制终端展示的信息 控制台不输出 构建模块信息 和 children 信息
  stats: {
    modules: false,
    children: false,
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
          // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例，注意 MiniCssExtractPlugin不能添加到 happypack 实例中
          'happypack/loader?id=css',
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
          // 把对 .less 文件的处理转交给 id 为 less 的 HappyPack 实例 ，注意 MiniCssExtractPlugin不能添加到 happypack 实例中
          'happypack/loader?id=less',
        ],
      },
    ],
  },

  plugins: [
    // 配置CSS单独分离打包，将CSS从JS中抽离出来，为每个包含CSS的JS文件创建一个CSS文件
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

    // 使用 HappyPack 加速构建，多进程Loader文件转换处理
    new HappyPack({
      id: 'css',
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: ['css-loader', 'postcss-loader'],
    }),

    // 使用 HappyPack 加速构建，多进程Loader文件转换处理
    new HappyPack({
      id: 'less',
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
      // 如何处理 .less 文件，用法和 Loader 配置中一样
      loaders: [
        {
          loader: 'css-loader',
          // 配置 css-loader 作用于 @import 引入的css文件之前，要使用几个其它的loader进行处理
          // 此处有两个loader  postcss-loader、less-loader
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
        'less-loader',
      ],
    }),

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

  optimization: {
    // 开启 作用域提升 Scope Hoisting,打包出来的代码文件更小、运行的更快
    concatenateModules: true,
    // 代码拆分
    // Vue Cli3源码中这样配置
    splitChunks: {
      cacheGroups: {
        // 新分离出来的chunk块，需要在html-webpack-plugin 或者 web-webpack-plugin 指定所需要的chunk块，否则页面空白！！！
        vendor: {
          name: 'chunk-vendor',
          test: /[\\/]node_modules[\\/]/, // 匹配模块的路径 test属性用于进一步控制缓存组选择的模块 使用[\\/]来表示路径分隔符，为了兼容Unix系统和Windows
          chunks: 'initial', // 仅提取同步加载，从入口文件开始向下递归遍历，提取依赖包【页面文件是异步引入,各页面的依赖包不提取】
          // chunks: 'all', // 不管异步加载还是同步加载的依赖包都提取出来，打包到一个文件中【各页面的依赖也进行提取】
          priority: -10, // 规则优先级，当缓存组中设置有多个拆分规则，而某个模块同时符合好几个规则的时候，则需要通过优先级属性priority来决定使用哪个拆分规则。优先级高者执行
        },
        commons: {
          name: 'chunk-common',
          chunks: 'initial', // 仅提取同步加载，从入口文件开始向下递归遍历，提取公共代码【页面文件是异步引入,各页面的公共代码不提取】
          // chunks: 'all', // 不管异步加载还是同步加载的模块都提取出来，打包到一个文件中【各页面的公共代码也进行提取】
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    // 添加默认配置之后如下所示：
    //     splitChunks: {
    //       chunks: 'async',
    //       minSize: 30000, // 规定被提取的模块在压缩前的大小最小值，单位为字节?Byte，默认为30000，只有超过了30000字节才会被提取，如果一个模块符合之前所说的拆分规则，但是如果提取出来最后生成文件大小比minSize要小，那它仍然不会被提取出来。这个属性可以在每个缓存组属性中设置，也可以在splitChunks属性中设置，这样在每个缓存组都会继承这个配置
    //       maxSize: 0, // 把提取出来的模块打包生成的文件大小不能超过maxSize值，如果超过了，要对其进行分割并打包生成新的文件。单位为字节，默认为0，表示不限制大小
    //       minChunks: 1, // 表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取。
    //       maxAsyncRequests: 6, // 最大的按需(异步)加载次数，默认为 6
    //       maxInitialRequests: 4, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为4
    //       automaticNameDelimiter: '~', // 打包生成的js文件名的分割符，默认为~
    //       cacheGroups: {
    //         vendors: {
    //           name: 'chunk-vendors',
    //           test: /[\\/]node_modules[\\/]/, // 用来匹配要提取的模块的资源路径或名称。值是正则或函数
    //           priority: -10, // 方案的优先级，值越大表示提取模块时优先采用此方案。默认值为0；当缓存组中设置有多个拆分规则，而某个模块同时符合好几个规则的时候，则需要通过优先级属性priority来决定使用哪个拆分规则。优先级高者执行
    //           chunks: 'initial',
    //         },
    //         common: {
    //           name: 'chunk-common',
    //           minChunks: 2,
    //           priority: -20,
    //           chunks: 'initial',
    //           reuseExistingChunk: true, // 如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的js文件。
    //         },
    //       },
    //     },
  },
})

module.exports = config
