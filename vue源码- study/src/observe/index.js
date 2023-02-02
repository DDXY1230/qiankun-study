import {newArrayProto} from "./array"

class Observe(data) {
  constructor(data) {
    // object.defineProperty只能劫持已经存在的属性,后增的或者删除的不能劫持到
    // 所以vue2就为此单独写了一些方法 例如  $set $delete
    Object.defineProperty(data,'__ob__', {
      value: this,
      enumerable: false // 变成不可枚举,不然走walk会陷入死循环
    })
    data.__ob__ = this // 给数据加了一个标识
    if (Array.isArray(data)) {
      // 重写数组的方法  需要保留数组原🈶️的方法,并且重写部分方法
      data.__proto__ = newArrayProto
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  walk(data) {// 观测对象
    // 循环对象  对属性依次劫持
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  observeArray(data) {// 观测数组
    data.forEach(item => observe(item))
  }
}
export function defineReactive(target, key, value) {
  observe(value) //对所有的对象都进行属性劫持
  Object.defineProperty(target, key, {
    get() {
      console.log('用户取值了')
      return value
    },
    set(newValue) {
      console.log('用户设置值了')
      if (value == newValue) return
      value = newValue
    }
  })
}

export function observe(data) {
  // 对这个对象进行劫持  只对对象进行劫持
  if (typeof data !== 'object' || data == null) {
    return
  }
  if(data.__ob__ instanceof Observe) {
    // 说明这个对象被代理过了
    return data.__ob__
  }
  // 如果一个对象已经被劫持过了,那就不需要在被劫持了,要判断一个对象是否被劫持过
  // 可以增添一个实例, 用实例来判断是否被劫持过
  return new Observe(data)
}