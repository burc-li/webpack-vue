
# webpack-vue

## 启动命令简介

 **eslint检测** 
```
npm run lint-ext
```

 **修复eslint检测** 
```
npm run lint-fix
```

**启动项目** 
```
npm run dev
```

 **打包** 
```
npm run build:prod
```

**分析 Webpack 开发环境打包后的模块依赖关系** 
```
npm run analyz:dev
```

**分析 Webpack 生产环境打包后的模块依赖关系** 
```
npm run analyz:prod
```
## 柏成使用了以下方案【包括不限于】对本项目进行优化

### 缓存 `babel` 编译结果加快重新编译速度
### `Eslint + husky`： 保证代码风格和质量 
### `webpack-parallel-uglify-plugin`： 并行压缩js代码来提升压缩速度
### `作用域提升 (Scope Hoisting)`： 打包出来的代码文件更小、运行的更快
### `摇树优化 (Tree Shaking）`： 将代码中永远不会走到的片段删除掉
### `happypack`： 多进程Loader文件转换处理
### `image-webpack-loader`： 压缩图片
### `url-loader`： 小体积字体图片base64引入项目，减少HTTP请求
### `cssnano`： 智能合并压缩css代码
### `postcss-preset-env`： 补齐各种浏览器私有的前缀，处理浏览器兼容问题




