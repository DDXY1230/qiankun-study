// gulp 的入口文件
// 最新的gulp要求是异步,所以每次执行完毕必须手动调用一些done()

const GulpClient = require("gulp");

// npx gulp foo
exports.foo = (done) => {
  console.log(" foo task working ");
  done();
};

// yarn gulp   默认
exports.default = (done) => {
  console.log("default is working");
  done();
};

// 这种方式是旧版本的,已经不被推荐了
const gulp = require("gulp");
gulp.task("bar", (done) => {
  console.log("bar working~");
  done();
});
