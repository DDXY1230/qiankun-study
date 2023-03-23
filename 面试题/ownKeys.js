// 一个获取对象私有属性的方法each封装
const each = function each(obj, callback) {
  if(obj === null || typeof obj !== 'object') throw new TypeError('obj is not a object')
  if(typeof callback !== 'function') throw new TypeError('callback is not a function')
  let keys = Reflect.ownKeys(obj)
  keys.forEach(key => {
    let value = obj[key]
    //每一次迭代都把回到函数执行
    callback(value, key)
  })
}
let arr = [10,20]
each(arr, (value, key) => {
  console.log(value, key)
})