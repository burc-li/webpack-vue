/**
 * @name webpack基础配置 
 */

const path = require('path');
// 请确保引入这个插件！
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 1. 为html文件中引入的外部资源如script、link,动态添加每次compile后的hash，防止引用缓存的外部文件问题
// 2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
//  引入vue-loader配置项
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development';

const config = {
  //入口， __dirname 是当前文件所在目录
  entry: path.join(__dirname, '../src/index.js'),

  // 输出 [hash:8] 哈希算法随机生成 8位 大/小写字母和数字 例如： bundle.0f127098.js
  // hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },

  // webpack原生只支持js、json文件类型，只支持ES5语法，
  // 作用：打包、转译js或者css文件，还有其他的打包、压缩的功能，简单的说就是把你写的代码转换成浏览器能识别的
  module: {
    rules: [
      // 使用以.vue文件名结尾的文件时，需要为其指定loader（解析和转换 .vue 文件）
      {
        test: /\.vue$/, //正则表达式 /. .需要转义
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },

      // 解析和转换 .jsx文件
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },

      // 解析和转换 .js文件
      // exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      // 解析和转换 css代码 或 .css 文件
      // css-loader: 把css代码写入 js。发现 css 的代码确实是写进了 bundle.js 文件中，但此时页面样式并不生效
      // style-loader: 能够在需要载入的html中创建一个<style></style>标签，标签里的内容就是CSS内容。页面样式生效
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
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
              name: 'resources/[path]/[name].[hash:8].[ext]'
            }
          }
        ]
      }

    ]
  },

  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),

    // 在编译时期创建全局变量，对开发模式和发布模式的构建允许不同的行为
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDev ? JSON.stringify('development') : '"production"'
    }),

    // 生成一个HTML文件
    new HTMLPlugin(),
  ],
}

module.exports = config;