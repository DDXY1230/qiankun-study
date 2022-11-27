export class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // 数组的逻辑
    } else {
      // 对象的方法
      this.walk(value)
    }
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
  defineReactive(obj, key, val) {
    if (arguments.length === 2) {
      val = obj[key]
    }
    defineProperty(obj, key, {
      set(value) {
        if (value === obj[key]) return
        obj[key] = value
      },
      get() {
        return obj[key]
      }
    })
  }
}