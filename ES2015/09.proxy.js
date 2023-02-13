let obj = {name: '张三', age:18}
Object.defineProperty(obj, 'a', {
  //
  enumerable: true,
  configurable: false, // 是否可以被删除
  // writable: true, // 加了set get 这个不写
  get() {
    return 'ok'
  },
  set(value) {
    obj['name'] = 'lisi'+value
  }
})
// delete obj.a
obj.a = 'hhhh'

console.log(obj)

