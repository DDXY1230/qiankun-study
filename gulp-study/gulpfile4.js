// gulp 的入口文件
// 最新的gulp要求是异步,所以每次执行完毕必须手动调用一些done()

// 压缩文件的方式
const fs = require("fs");
const { Transform } = require("stream");
exports.default = (done) => {
  // 文件读取流
  const read = fs.createReadStream("src/css/normalize.css");
  // 文件转化流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // 核心转换过程
      // chunk =》 读取流中读取到的内容(Buffer)
      const input = chunk.toString();
      const output = input.replace(/\s+/g, "").replace(/\/\/*.+?\*\//g, "");
      callback(null, output);
    },
  });
  // 文件写入流
  const write = fs.createWriteStream("normalize.min.css");
  read.pipe(transform).pipe(write);
  return read;
};
