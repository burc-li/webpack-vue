

## 初始化项目

https://github.com/carrieguo/vue.js-todolist

```shell
npm init

npm i webpack webpack-cli

# vue-loader需要peer第三方依赖 css-loader vue-template-compiler
npm i vue vue-loader 

npm i css-loader vue-template-compiler

新建src文件夹、创建src/app.vue文件

创建webpack.config.js文件（打包vue文件让浏览器执行)
```

## 所需的依赖

```shell
# 解析转换样式
npm i less style-loader less-loader

# 将小图片转为base64代码 url-loader 依赖 file-loader
npm i url-loader file-loader

# 运行跨平台设置和使用环境变量的脚本， 通过 process.env.NODE_ENV 获取环境参数
npm i cross-env

# 启动了一个使用express的Http服务器（配置 端口 ip 热重载等功能）
npm i webpack-dev-server

# 1. 为html文件中引入的外部资源如script、link,动态添加每次compile后的hash，防止引用缓存的外部文件问题
# 2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
npm i html-webpack-plugin

# 实现自动根据浏览器兼容性给css加私有前缀的功能
# autoprefixer: 自动添加css前缀,例如-webkit-、-moz-
# postcss-loader: 用来优化css的，通过一系列的组件来优化，如：autoprofixer,为css加前缀
# 新建文件postcss.config.js
# 配置 package.json 文件中的 browserslist属性
npm i autoprefixer postcss-loader

# Vue支持 .jsx文件
# babel-loader: 用来处理ES6语法，将其编译为浏览器可以执行的js语法
# @babel/core: babel核心模块
# @babel/preset-env: babel转码神器
npm i babel-loader @babel/core @babel/preset-env

# Vue支持 jsx语法
# 新建文件.babelrc
npm i babel-plugin-transform-vue-jsx 
npm i babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx

# 配置CSS单独分离打包
npm i mini-css-extract-plugin

# 合并webpack配置文件
npm i webpack-merge
```







