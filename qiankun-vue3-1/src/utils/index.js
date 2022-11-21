// 判断数据类型
let class2type = {}
let toString = class2type.toString // Object.prototype.toString
let typeArr = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol']
typeArr.forEach(function (name) {
  class2type[`[object ${name}]`] = name.toLowerCase()
})

function toType(obj) {
  // undefined == null => true ,如果传来undefined或者null,直接原样返回
  if (obj == null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj == 'function' ?
    class2type[toString.call(obj)] || "object" : typeof obj
}
export default {
  toType
}