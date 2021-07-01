
# webpack-vue

## 分支说明

- master：纯净版分支
- dev-annotation：详细注释版分支

## 安装依赖
**部分依赖包需要从GitHub上下载，首先要确保你能访问 https://github.com/**
```
npm i
```
## 命令简介

 **eslint检测** 
```
npm run lint-ext
```

 **修复eslint检测** 
```
npm run lint-fix
```

**启动项目** 
```shell
npm run dev:dll # 只有第一次启动项目或公共依赖库发生变更才会启用此命令生成动态链接库
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

- 缓存 `babel` 编译结果加快重新编译速度
- 使用 `Eslint + husky` 保证代码风格和提交质量 
- 使用 `web-webpack-plugin` 代替 `html-webpack-plugin`,可根据不同环境引入不同的 <script> 和 <link>
- 使用 `image-webpack-loader` 对大图片进行压缩优化
- 使用 `url-loader` 对小体积字体图片base64直接引入项目，减少HTTP请求
- 使用 `webpack-parallel-uglify-plugin` 并行压缩js代码来提升压缩速度
- 使用 `DllPlugin + DllReferencePlugin` 接入动态链接库，提升构建速度
- 使用 `happypack` 对js、css、less文件多进程转换处理
- 使用 `cssnano` 智能合并压缩css代码
- 使用 `postcss-preset-env` 自动补齐各种浏览器私有的前缀，处理浏览器兼容问题




