class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 1. 判断data是否是对象
    if (!data || typeof data != 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    let self = this
    // 负责收集依赖
    let dep = new Dep()
    // 如果val也是一个对象,那么继续walk成为响应式数据
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // console.log('通过get获取到' + val)
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newValue) {
        if (newValue === val) return
        val = newValue
        self.walk(val)
        // 发送通知
        dep.notify()
      }
    })
  }
}