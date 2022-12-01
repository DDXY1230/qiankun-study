1. 手写一个模版引擎
2. npm init
3. npm i -D webpack@4 webpack-dev-server@3 webpack-cli@3

这个文件手写了一个模版引擎的解析,为了学习vue源码的模版引擎做铺垫
方法全部在src中模块化函数管理, 调用测试在www/index.html里面
主要思路来源于文件‘vue源码学习/utils/mustache.js’.有空可以对mustache源码进行学习