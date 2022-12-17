# webpack 学习笔记

1. `yarn add webpack webpack-cli --dev`
2. `yarn webpack --version` 查看安装的版本
3. `yarn webpack` 零配置,默认打包`src/index.js` 到 `dist/main.js`
4. `npm i browser-sync -D` 用于启动一个测试服务器
5. `yarn browser-sync .` 启动服务器

## webpack 默认只能打包解析 js 文件,如果需要处理 css 或者其他文件,需要额外装 loader 才可以

6. yarn add css-loader --dev
7. yarn add style-loader --dev

## webpack 打包图片

8. yarn add file-loader --dev
9. yarn add url-loader --dev // 会导出一个 base64 的文件,用这个 loader 必须也要下载 file-loader,因为对于超过大小限制的文件他还是会调用 file-loader 进行处理

## 转换最新 js 语法的 babel 模块

10. yarn add babel-loader @babel/core @babel/preset-env --dev

## html 文件处理

11. yarn add html-loader --dev

## 处理 markdown 文件

12. yarn add marked --dev

## 插件学习

13. yarn add clean-webpack-plugin --dev 清理 dist 之前打包的文件
14. yarn add html-webpack-plugin --dev

## 静态文件复制

15. yarn add copy-webpack-plugin --dev

16. yarn add webpack-dev-server --dev

## 合并 webpack

17. yarn add webpack-merge --dev
18. 如果没有默认的额配置文件, 就用 yarn webpack --config webpack.prod.js 指定专门的配置文件, 也可以定义到 script 中“build": 'webpack --config webpack.xxxxx.js'
