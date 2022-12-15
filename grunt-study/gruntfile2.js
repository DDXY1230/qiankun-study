// Grunt 的入口文件
// 用于定义一些需要Grunt自动执行的任务
// 需要导出一个函数
// 此函数接收到一个Grunt 的形参,内部提供一些创建任务时可以用到的api
module.exports = (grunt) => {
  // 配置参数
  grunt.initConfig({
    mytask: "task1",
    class1: {
      aa: "aa",
    },
    build: {
      options: {
        class2: "calss2",
      },
      css: "111",
      js: "jssjs",
    },
  });
  grunt.registerTask("mytask-1", function () {
    console.log(grunt.config("mytask"));
    console.log(grunt.config("class1.aa"));
  });
  // 多任务模式yarn grunt build:css 只运行css
  grunt.registerMultiTask("build", function () {
    console.log("build task");
    console.log(this.target, this.data);
    console.log(this.options()); // 这里需要注意  是一个函数
  });

  grunt.registerTask("foo", () => {
    console.log("hello grunt");
  });

  grunt.registerTask("bar", "任务描述", () => {
    console.log("hhhhh呵呵呵呵呵");
  });

  // grunt.registerTask('default', () => {
  //   console.log('这是默认调用的方法')
  // })

  grunt.registerTask("default", ["foo", "bar"]);
  // 异步任务的执行方式
  grunt.registerTask("async-task", function () {
    const done = this.async();
    setTimeout(() => {
      console.log("如果是异步函数,必须有this.async()函数,执行完之后要调用");
      done();
    }, 1000);
  });
  // 如果存在失败的 就返回false, 后续任务不会再执行, 除非--force强制执行,后续的任务也可以执行
  grunt.registerTask("task-1", () => {
    console.log("这事任务一");
    return false; //这失败,后面的不再执行
  });
  grunt.registerTask("task-2", () => {
    console.log("这事任务二");
  });
  grunt.registerTask("task-3", () => {
    console.log("这事任务三");
  });
  grunt.registerTask("alltask", ["task-1", "task-2", "task-3"]);

  // 如果是异步任务,失败标记done(false) 异步任务只能用普通函数function,不要用箭头函数
  grunt.registerTask("bad-async1", function () {
    const done = this.async();
    setTimeout(() => {
      console.log("这是一个失败的异步任务");
      done(false);
    }, 1000);
  });
};
