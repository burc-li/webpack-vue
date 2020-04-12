/**
 * @name vue-loader配置项
 * 配置完成后，在 webpack.config.base.js 文件中引入 vue-loader配置项， 并添加到 vue-loader 的 options 中
 * @description preserveWhitepace: 处理.vue文件中的误打空格
 * @description extractCSS: 是将.vue文件中的css一起打包到一个css文件中，但是对于异步加载模块的话，vue更希望每个模块都有自己的css样式进行异步加载，这样提首屏加载速度，所以默认不提取到单独css文件中
 */

module.exports = (isDev) => {
  return {
    // 清除.vue文件文本换行等情况空格
    preserveWhitepace: true,
    // 把vue的css提取到单独的文件  CSS提取应该只用于生产环境
    extractCSS: !isDev,
    // cssModules: {
    //   localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
    //   camelCase: true //将burc-libc 转换成 burcLibc
    // },
    // hotReload: false,  // 根据环境变量自动生成
  }
}