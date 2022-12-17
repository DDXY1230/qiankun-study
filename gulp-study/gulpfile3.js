// gulp 的入口文件
// 最新的gulp要求是异步,所以每次执行完毕必须手动调用一些done()
const fs = require("fs");
exports.callback = (done) => {
  console.log("这是一个回调函数");
  done();
};
exports.callback_error = (done) => {
  console.log("这里很多代码");
  done();
};
exports.promise = () => {
  console.log(" 这是一个承诺");
  return Promise.resolve();
};
exports.promise_error = () => {
  console.log("这是一个失败的承诺");
  return Promise.reject(new Error("出错了"));
};
const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
exports.async = async () => {
  await timeout(1000);
  console.log("async ok~~");
};

exports.stream = (done) => {
  const readStream = fs.createReadStream("package.json");
  const writeStream = fs.createWriteStream("temp.txt");
  readStream.pipe(writeStream);
  // return readStream
  readStream.on("end", () => {
    done();
  });
};
