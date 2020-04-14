/**
 * 实现自动根据浏览器兼容性给css加私有前缀的功能
 * npm i autoprefixer postcss-loader
 *  @description autoprefixer: 自动添加css前缀,例如-webkit-、-moz-
 *  @description postcss-loader: 用来优化css的，通过一系列的组件来优化，如：autoprofixer,为css加前缀
 * 设置完postcss.config.js后，添加postcss-loader到您的中webpack.config.js。
 * 您可以将其单独使用或与css-loader（推荐）结合使用。在style-loader和 css-loader之后，
 * 但要在其他预处理程序加载程序（例如sass|less|stylus-loader，如果使用）之前使用它。
 */

const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'ie >= 9'
      ]
    })
  ]
}

/**
 * > 1%	:全球超过1%人使用的浏览器
 * > 5% in US	:指定国家使用率覆盖
 * last 2 versions	:所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本,CanIUse.com追踪的IE最新版本为11,向后兼容两个版本即为10、11
 * Firefox ESR	:火狐最新版本
 * Firefox > 20	:指定浏览器的版本范围
 * not ie <=8	:方向排除部分版本
 * Firefox 12.1	:指定浏览器的兼容到指定版本
 * unreleased versions	:所有浏览器的beta测试版本
 * unreleased Chrome versions	:指定浏览器的测试版本
 * since 2013	:2013年之后发布的所有版本
 */
