// 我们希望重写数组的部分方法
let oldArrayProto = Array.prototype // 获取数组的原型
 export let newArrayProto = Object.create(oldArrayProto)

let methods = [
  // 找到所有的变异方法(就是会修改原数组的方法)
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
// concat slice 不会改变原数组
methods.forEach(method => {
  newArrayProto[method] = function(...args) {//这里重写了数组的方法
    const result = oldArrayProto[method].call(this,...args)//内部调用原来的方法,函数的劫持
    // 我们需要对新增的数据再次进行劫持
    let inserted // 新增的内容 是一个数组
    let ob = this.__ob__
    switch(method) {
      case 'push': 
      case 'unshift': 
      inserted = args
      break
      case 'splice': 
      inserted = args.slice(2)
      default: break
    }
    if(inserted) {
      // 对新增的内容再次进行观测
      ob.observeArray(inserted)
    }
    
    
    
    
    return result
  }
})
