/**
 * @name 开发环境的webpack配置
 */

const webpack = require('webpack')
// 合并webpack配置文件
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

// devServer配置 并不会真正的打包文件，而是生成内存中的打包，把文件写到内存中
const devServer = {
  port: 8000,
  // 可以通过三种方式访问: 127.0.0.1:8000  localhost:8000  192.168.43.117:8000(本机IP)
  host: '127.0.0.1',
  // webpack编译时任何错误显示在浏览器中 【包括eslint的语法错误，糟糕的编程体验，不友好】
  overlay: {
    errors: false,
  },
  // 打包显示进度百分比
  // progress: true,
  // 输入 npm run dev 自动打开浏览器访问页面
  // open: true,
  // 热重载模式
  hot: true,
  // router中 history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
  historyApiFallback: {
    // 与output的publicPath有关(HTMLplugin生成的html默认名称为index.html)
    // 例如此处填写 '/libc/index.html'，output=》publicPath属性开发环境下应该填写 '/libc'
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
    // 永远不要在生产环境(production)下启用 HotModuleReplacementPlugin()
    new webpack.HotModuleReplacementPlugin(),
  ],
})

module.exports = config
