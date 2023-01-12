module.exports  导出
require('xxx.js') 导入

commonjs两种导出的方法 效果是一样的
1.
```
exports.a = function () {
  console.log('abcd')
}
```
2.
```
module.exports = {
  a() {
    console.log('abcd')
  }
}
```