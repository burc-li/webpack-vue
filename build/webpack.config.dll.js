/**
 * @name 打包动态链接库的webpack配置
 * @description 用于开发环境，可大大加快构建速度，不建议用于生产环境，其并不会缩小打包体积
 */
const path = require('path')
const webpack = require('webpack')
const pathConfig = require('./pathConfig')

module.exports = {
  mode: 'development',

  entry: {
    vendors: [pathConfig.appVendorConfigs],
  },

  output: {
    filename: '[name].dll.js',
    path: pathConfig.appDll,
    library: '_dll_[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      context: pathConfig.appDll,
      path: path.resolve(pathConfig.appDll, '[name].manifest.json'),
    }),
  ],
}
