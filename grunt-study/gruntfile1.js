// Grunt 的入口文件
// 用于定义一些需要Grunt自动执行的任务
// 需要导出一个函数
// 此函数接收到一个Grunt 的形参,内部提供一些创建任务时可以用到的api
module.exports = (grunt) => {
  grunt.initConfig({
    clean: {
      // temp: 'temp/*.txt' // 删除temp下面的文件  yarn grunt clean
      temp: "temp/**", // 删除temp下面的子目录以及子目录所有的文件
    },
  });
  grunt.loadNpmTasks("grunt-contrib-clean");
  //yarn add grunt-contrib-clean 安装这个插件之后
};
