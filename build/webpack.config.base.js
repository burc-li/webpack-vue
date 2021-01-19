/**
 * @name webpack基础配置
 */

const path = require('path')
// 请确保引入这个插件！
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 1. 为html文件中引入的外部资源如script、link,动态添加每次compile后的hash，防止引用缓存的外部文件问题
// 2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//  引入vue-loader配置项
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('process.env.GLOBAL_CONFIG', process.env.GLOBAL_CONFIG)

const GLOBAL_CONFIG = {
  name: JSON.stringify('libc'),
  sex: JSON.stringify('man'),
}

const config = {
  mode: 'development',
  // 入口， __dirname 是当前文件所在目录
  entry: path.join(__dirname, '../src/index.js'),

  // 输出 [hash:8] 哈希算法随机生成 8位 大/小写字母和数字 例如： bundle.0f127098.js
  // hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
  output: {
    // 输出 bundle 的名称，一般是入口文件对应的bundle
    filename: 'bundle.[hash:8].js',
    // 输出非入口(non-entry) chunk 文件的名称，默认'[id].js',例如 0.js 1.js
    chunkFilename: '[id].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    // 在打包发布时，需要指定项目的路径。在hash模式时，项目的根目录是不变的，而在history模式时，以/开头的嵌套路径会被当做根路径。
    // 生产环境使用'./'，相对于当前路径
    // 例如把打包文件放入服务器mobile目录下，<script>标签的src属性 和 <link>标签的href属性引用的路径是：https://xbworld.cn/mobile/bundle.0f127098.js(假设路径)
    // 开发环境使用'/'，根路径
    // <script>标签的src属性 和 <link>标签的href属性引用的路径是：http://127.0.0.1/bundle.0f127098.js(假设路径)
    // 如果使用history路由模式，服务器非根目录部署，生产环境下要改为'/mobile/',绝对路径
    publicPath: isDev ? '/' : './',
  },

  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
    },
    // 引入时省略文件扩展名
    extensions: ['.js', '.jsx', '.json', '.vue', '.scss', '.css'],
  },

  // webpack原生只支持js、json文件类型，只支持ES5语法，
  // 作用：打包、转译js或者css文件，还有其他的打包、压缩的功能，简单的说就是把你写的代码转换成浏览器能识别的
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: path.resolve(__dirname, '../node_modules'),
        enforce: 'pre', // 优先处理 保证先检测代码风格，之后再做 Babel 转换等工作
      },
      // 使用以.vue文件名结尾的文件时，需要为其指定loader（解析和转换 .vue 文件）
      {
        test: /\.vue$/, // 正则表达式 /. .需要转义
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev),
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
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      // 解决 vue 使用 element 时报错ERROR in ./node_modules/element-ui/lib/theme-chalk/fonts/element-icons.ttf
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },

      // 解析和转换 css代码 或 .css 文件
      // css-loader: 对 @import 和 url() 进行处理，但此时页面样式并不生效
      // style-loader: 将 css-loader 打包好的 CSS 代码以<style>标签的形式插入到 HTML 文件中。页面样式生效
      // 它会应用到普通的 `.css` 文件 以及  `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },

      // 将小于1024byte的图片转为base64代码，减少http请求
      // url-loader 依赖 file-loader
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 限制大小 1024byte
              limit: 1024,
              // 输出路径/文件名 burc-文件名.扩展名   dist/resources/src/assets/imgages/bg.5fe5ab56.jpg
              name: 'resources/[path]/[name].[hash:8].[ext]',
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
      'process.env.GLOBAL_CONFIG': GLOBAL_CONFIG,
    }),

    // 根据本地自定义文件 template.html 生成html文件，并自动注入所有生成的 bundle
    // 生成的文件所在目录同 output 输出目录一致
    new HTMLPlugin({
      template: path.join(__dirname, './template.html'),
      filename: 'index.html',
    }),
  ],
}

module.exports = config
