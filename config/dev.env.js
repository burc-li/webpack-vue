const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('dev'),
  basePath: JSON.stringify('/'),
  baseUrl: JSON.stringify('https://www.fastmock.site/mock/f560f02cf57e1480a19c20e98cc77898'),
})
