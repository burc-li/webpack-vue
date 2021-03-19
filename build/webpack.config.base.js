/**
 * @name webpack基础配置
 */

const path = require('path')
const webpack = require('webpack')
// 请确保引入这个插件！
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 1. 为html文件中引入的外部资源如script、link,动态添加每次compile后的hash，防止引用缓存的外部文件问题
// 2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 增强控制台日志显示效果
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 可视化分析包大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 多进程Loader文件转换处理
const HappyPack = require('happypack')
// 构造出共享进程池，进程池中包含4个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 4 })
// 在打包之前使用这个插件尝试清除output.path打包目录中的所有文件,但是目录本身不会被删除
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//  引入vue-loader配置项
// const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

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
  mode: 'development',

  // 控制台不输出 构建模块信息 和 children 信息
  stats: {
    modules: false,
    children: false,
  },

  // 入口， __dirname 是当前文件所在目录
  entry: {
    main: path.join(__dirname, '../src/index.js'),
  },

  // 输出 [hash:8] 哈希算法随机生成 8位 大/小写字母和数字 例如： bundle.0f127098.js
  // hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
  output: {
    // 输出 bundle 的名称，一般是入口文件对应的bundle
    // 模块热替换 和 [chunkhash] 是冲突的，所以开发环境下 filename 无法设置[chunkhash]!!!!!!!!!!
    // 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
    filename: isDev ? 'bundle.[hash:8].js' : 'js/[name].[chunkhash:8].js',
    // 输出非入口(non-entry) chunk 文件的名称，默认'[id].js',例如 0.js 1.js
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    // 在打包发布时，需要指定项目的路径。在hash模式时，项目的根目录是不变的，而在history模式时，以/开头的嵌套路径会被当做根路径。
    // 生产环境使用'./'，相对于当前路径
    // 例如把打包文件放入服务器mobile目录下，<script>标签的src属性 和 <link>标签的href属性引用的路径是：https://xbworld.cn/mobile/bundle.0f127098.js(假设路径)
    // 开发环境使用'/'，根路径
    // <script>标签的src属性 和 <link>标签的href属性引用的路径是：http://127.0.0.1/bundle.0f127098.js(假设路径)
    // 如果使用history路由模式，服务器非根目录部署，生产环境下要改为'/mobile/',绝对路径
    publicPath: isDev ? '/' : '/vue/',
  },

  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
    },
    // 引入时省略文件扩展名
    extensions: ['.vue', '.js', '.jsx', '.json', '.scss', '.css'],
  },

  // webpack原生只支持js、json文件类型，只支持ES5语法，
  // 作用：打包、转译js或者css文件，还有其他的打包、压缩的功能，简单的说就是把你写的代码转换成浏览器能识别的
  module: {
    rules: [
      // 使用以.vue文件名结尾的文件时，需要为其指定loader（解析和转换 .vue 文件）
      {
        test: /\.vue$/, // 正则表达式 /. .需要转义
        loader: 'vue-loader',
        // options: createVueLoaderOptions(isDev),
      },

      // 解析和转换 .jsx文件
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },

      // 解析和转换 .js文件
      // exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
      // 它会应用到普通的 `.js` 文件  以及  `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=babel'],
        // Webpack 中打包的核心是 JavaScript 文件的打包，JavaScript 使用的是 babel-loader，其实打包时间长很多时候是 babel-loader 执行慢导致的。
        // 这时候我们就要使用exclude和include来尽可能准确的指定要转换内容的范畴
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        // 排除路径
        exclude: [path.resolve(__dirname, '../node_modules')],
        // 查找路径
        include: [path.resolve(__dirname, '../src')],
      },

      // 解决 vue 使用 element 时报错ERROR in ./node_modules/element-ui/lib/theme-chalk/fonts/element-icons.ttf
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

      // 将小于10KB的图片转为base64代码，减少http请求
      // 压缩优化图片
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 限制大小 10KB  1KB = 1024byte
              limit: 10 * 1024,
              name: isDev ? '[path]/[name].[ext]' : '[name].[hash:8].[ext]',
              outputPath: 'images/',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // 开发环境禁用，生产环境启用
              disable: isDev,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // 请确保引入这个插件！
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块 官方解释：https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE
    new VueLoaderPlugin(),

    // 在编译时期创建全局变量，对开发模式和发布模式的构建允许不同的行为
    // src下的全部文件都可以访问到此全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDev ? JSON.stringify('development') : '"production"',
    }),

    // 识别webpack中的某些类别的错误，并对它们进行清理、聚合和排序，以提供更好的开发体验
    new FriendlyErrorsPlugin(),

    // 根据本地自定义文件 template.html 生成html文件，并自动注入所有生成的 bundle
    // 生成的文件所在目录同 output 输出目录一致
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './template.html'),
      filename: 'index.html', // 默认名称为index.html
    }),

    // 使用 HappyPack 加速构建，多进程Loader文件转换处理
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
      // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
      loaders: ['babel-loader?cacheDirectory'],
    }),

    // 在打包之前使用这个插件尝试清除output.path打包目录中的所有文件,但是目录本身不会被删除
    // 如果使用webpack-dev-server打包到内存中【开发环境】，dist目录下的文件会被全部删除,不太友好
    // 个人更喜欢使用 rimraf插件
    // new CleanWebpackPlugin(),
  ],
}

console.log('REPORT_VIS', process.env.REPORT_VIS)
if (process.env.REPORT_VIS === 'OK') {
  config.plugins.push(BundleAnalyzerPluginInstance)
}

module.exports = config
