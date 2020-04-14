
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devServer = {
  port: 8080,
  host: '127.0.0.1',
  overlay: {
    errors: true
  },
  hot: true,
  open: true
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),

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
            options: { sourceMap: true }
          },
          'less-loader'
        ]
      }
    ]
  },

  devServer,

  // import Vue from 'vue'
  // 简化相对路径，'vue' 指向文件 /node_modules/vue/dist/vue.esm.js
  // 默认是 vue.runtime.XXX.js
  // vue.esm.js: 可以写Vue对象里面写template
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // 根据本地自定义文件 template.html 生成html文件
    new HTMLPlugin({
      template: path.join(__dirname, './template.html')
    })
  ]
})

module.exports = config
