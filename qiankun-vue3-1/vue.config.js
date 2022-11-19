const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package');
module.exports = defineConfig({
  devServer: {
    port: 3014,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // devServer: {
    //   proxy: ''// 后端代理地址
    // }
  },
  // configureWebpack: {
  //   output: {
  //     library: `${name}-[name]`,
  //     libraryTarget: 'umd', // 把微应用打包成 umd 库格式
  //     jsonpFunction: `webpackJsonp_${name}`,
  //   },
  // },
  transpileDependencies: true
})
