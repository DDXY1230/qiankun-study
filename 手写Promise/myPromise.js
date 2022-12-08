const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败之后的原因
  reason = undefined
  // 成功的回调
  successCallback = []
  // 失败的回调
  failCallback = []
  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status != PENDING) return
    this.status = FULFILLED
    this.value = value
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) this.successCallback.shift()()
  }
  reject = reason => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status != PENDING) return
    this.status = REJECTED
    this.reason = reason
    // this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) this.failCallback.shift()()
  }
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => {
      throw reason
    }
    let promise = new Promise((resolve, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            //判断x是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象,查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            // resolve(x)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            //判断x是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象,查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            // resolve(x)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // 可能存在异步代码,先收集起来
        this.successCallback.push(setTimeout(() => {
          try {
            let x = successCallback(this.reason)
            //判断x是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象,查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            // resolve(x)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0))
        this.failCallback.push(setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            //判断x是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象,查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            // resolve(x)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0))
      }
    })
    return promise
  }
  finally(callback) {
    return this.then(value => {
      callback()
      return value
    }, reason => {
      callback()
      throw reason
    })
  }
  static all(array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, array[i])
        }
      }
      return result
    })
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    } else {
      new MyPromise(resolve => resolve(value))
    }
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise == x) {
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // x是一个Promise对象
    // x.then(value => resolve(value), reason => reject(reason))
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}
module.exports = MyPromise