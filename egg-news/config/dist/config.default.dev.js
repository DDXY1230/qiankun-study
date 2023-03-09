"use strict";

// cookie session 加密cookie发送给客户端之后, 为了防止
// exports.keys = 'lxm'
module.exports = function (app) {
  var config = {}; // 配置加密的key, 用来加密cookie

  config.keys = app.name + Date.now(); // 配置视图 view

  config.view = {
    defaultExtension: '.html',
    // 默认的扩展名, 当你渲染一个文件, 
    //但是没有指定的扩展名,而且又找不到指定的文件,就会尝试添加这个扩展名去再查找一次
    mapping: {
      '.html': 'nunjucks' // 如果要渲染的模版是以.html结尾的文件,
      //就用nunjucks模版引擎进行渲染

    }
  };
  return config;
};