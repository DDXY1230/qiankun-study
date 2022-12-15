// Grunt 的入口文件
// 用于定义一些需要Grunt自动执行的任务
// 需要导出一个函数
// 此函数接收到一个Grunt 的形参,内部提供一些创建任务时可以用到的api

// yarn add grunt-sass sass -D
// 相关配置如下
// yarn grunt sass
// yarn grunt babel
const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");
module.exports = (grunt) => {
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      main: {
        files: {
          "dist/css/main.css": "src/scss/main.scss",
        },
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      main: {
        files: {
          "dist/js/app.js": "src/js/app.js",
        },
      },
    },
    // yarn grunt watch 只有在文件发生变化的时候才会去执行
    watch: {
      js: {
        files: ["src/js/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/scss/*.scss"],
        tasks: ["sass"],
      },
    },
  });
  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt); // 安装了load-grunt-tasks 就不需要像上面那样一句一句写了,可以这一句就可以
  //加载所有的grunt插件
};
