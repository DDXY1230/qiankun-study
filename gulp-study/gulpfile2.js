// gulp 的入口文件
// 最新的gulp要求是异步,所以每次执行完毕必须手动调用一些done()
const { series, parallel } = require("gulp");
const task1 = (done) => {
  setTimeout(() => {
    console.log("task1 working___");
    done();
  });
};
const task2 = (done) => {
  setTimeout(() => {
    console.log("task2 working~~~~");
    done();
  });
};
const task3 = (done) => {
  setTimeout(() => {
    console.log("task3 working~~~~");
    done();
  }, 1000);
};
exports.foo = series(task1, task2, task3); //串行任务
exports.para = parallel(task1, task2, task3); // 并行任务
