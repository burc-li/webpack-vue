/**
 * @name 开发环境的webpack配置
 */
const webpack = require('webpack')
// 合并webpack配置文件
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

// devServer配置 并不会真正的打包文件，而是生成内存中的打包，把文件写到内存中
const devServer = {
  // 端口
  port: 8002,
  // 可以通过三种方式访问: 127.0.0.1:8000  localhost:8000  192.168.43.117:8000(本机IP)
  host: '127.0.0.1',
  // 是否允许使用全屏覆盖的方式显示编译错误，默认不允许
  // webpack编译时任何错误显示在浏览器中 【包括eslint的语法错误，糟糕的编程体验，不友好】
  overlay: {
    errors: false,
  },
  // 输入 npm run dev 自动打开浏览器访问页面
  open: false,
  // 要开启 HMR 功能，需要三步，热重载模式，可以在应用运行的时候，不需要刷新页面，就可以直接替换、增删模块
  // 1、hot: true 会给 entry 添加webpack/hot/dev-serve或者webpack/hot/only-dev-serve（devServer.hotOnly=true），这个是实现 HMR 的服务端代码；
  // 2、inline=true 会给 entry 添加webpack-dev-server/client，这是通信客户端；
  // 3、在webpack.config.js中添加 plugins：new webpack.HotModuleReplacementPlugin()；
  hot: true,
  // 默认为 true 内联模式 ，使用false切换到 iframe 模式， 推荐使用inline模式
  inline: true,
  // 表示的是打包到内存中生成的静态文件所在内存中的虚拟位置（默认是output里面设置的publicPath的值)
  // 必须与output里面设置的publicPath一致
  publicPath: '/',
  // router中 history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
  historyApiFallback: {
    // 与devServer的publicPath、HtmlWebpackPlugin的filename有关
    // 例如此处填写 '/vue/index.html'，devServer=》publicPath属性应该填写 '/vue/'
    // HtmlWebpackPlugin生成的html默认名称为index.html，若修改HtmlWebpackPlugin-》filename为 main.html，则此处需填写 '/main.html'
    index: '/index.html',
  },
}

const config = merge(baseConfig, {
  devServer,

  module: {
    rules: [
      // 解析和转换.less 文件
      // Loader 解析顺序从右向左 style-loader(css-loader(less-loader(content)))
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
    // 永远不要在生产环境(production)下启用 HotModuleReplacementPlugin()
    // 开启全局的 HMR 能力，HMR 即模块热替换（Hot Module Replacement）的简称，它可以在应用运行的时候，不需要刷新页面，就可以直接替换、增删模块
    // 开启后 bundle 文件会变大一些，因为它加入了一个小型的 HMR 运行时（runtime），
    // 当你的应用在运行的时候，Webpack 监听到文件变更并重新打包模块时，HMR 会判断这些模块是否接受 update，若允许，则发信号通知应用进行热替换。
    new webpack.HotModuleReplacementPlugin(),

  ],

  // cheap：忽略打包前后的列信息，源代码中的列信息是没有任何作用，因此我们打包后的文件不希望包含列相关信息，只有行信息能建立打包前后的依赖关系
  // module：定位到bug的源代码具体的位置
  // eval：不生成 .map 文件，仅仅是在每一个模块后，增加sourceURL来关联模块处理前后对应的关系，打包速度更快，体积稍大一点
  // source-map：生成 .map 文件
  devtool: 'cheap-module-eval-source-map',
})

module.exports = config
