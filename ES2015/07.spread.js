// ... 都是浅拷贝
console.log(JSON.stringify({
  a: /\d+/,
  b: null,
  d: undefined,
  fn: function () {}
})) //{"a":{},"b":null}
// undefined 和函数都丢失了

// 递归对象拷贝
function deepClone(obj, hash = new WeakMap()) {
  if (obj == undefined) return obj;
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (typeof obj !== 'object') {
    return obj
  }
  if (hash.has(obj)) return hash.get(obj)
  //上面判断完毕后,下面认为都是对象 数组
  const copy = new obj.constructor
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key])
    }
  }
  hash.set(obj, copy)
  return copy
}
let obj = {
  a: undefined,
  b: /\d+/
}
console.log(deepClone(obj))