const path = require('path')
// 机械的连接
console.log(path.join('a', 'b')) // a/b
// 从当前的路径出发, 解析出一个绝对路径
console.log(path.resolve('a', 'b')) //    /Users/qiankun/a/b

console.log(path.resolve(__dirname, 'src'))// 当前文件夹下面的src