// 初始状态
const PENDING = 'pending'
// 完成状态
const FULFILLED = 'fulfilled'
// 失败状态
const REJECTED = 'rejected'

//异步执行方法封装
function asyncExecFun(fn) {
  setTimeout(() => fn(), 0)
}
// 执行promise resolve功能
function resolvePromise(promise, res, resolve, reject) {
  // 返回同一个promise
  if (promise === res) {
    reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
    return
  }
  // promise 结果
  if (res instanceof MyPromise) {
    res.then(resolve, reject)
  } else {
    // 非promise结果
    resolve(res)
  }
}
class MyPromise {
  status = PENDING
  value = undefined
  reason = undefined
  successCallbacks = []
  failCallbacks = []
  constructor(exector) {
    try {
      exector(
        (value) => asyncExecFun(() => this.resolve(value)),
        (reason) => asyncExecFun(() => this.reject(reason))
      )
    } catch (e) {
      this.reject(e)
    }
  }
  resolve(value) {
    if (this.status !== PENDING) return
    this.value = value
    this.status = FULFILLED
    // 执行所有的成功回调
    while(this.successCallbacks.length) this.successCallbacks.shift()()
  }
  reject(reason) {
    // 如果状态已经变更,直接返回
    if(this.status !== PENDING) return
    this.reason = reason
    this.status = REJECTED
    if(!this.failCallbacks.length) {
      throw '(in MyPromise)'
    }
    // 执行所有失败的回调函数
    while(this.failCallbacks.length) this.failCallbacks.shift()()
  }
  then(successCallback, failCallback) {
    successCallback = typeof successCallback == 'function' ? successCallback : (v) => v
    failCallback = typeof failCallback == 'function' ? failCallback : (reason) => {
      throw reason
    }
    let promise = new MyPromise((resolve, reject) => {
      const execFun = (fn,val) => {
        try{
          let res = fn(val)
          resolvePromise(promise, res, resolve,reject)
        }catch(e) {
          reject(e)
        }
      }
      // 执行成功回调
      const execSuccessCallback = () => execFun(successCallback, this.value)
      // 执行失败的回调
      const execFailCallback = () => execFun(failCallback, this.reason)
      // 同步将对应成功或者失败回调事件加入对应回调队列
      if(this.status === PENDING) {
        // 将成功回调加入队列
        this.successCallbacks.push(execSuccessCallback)
        // 将失败回调加入队列
        this.failCallbacks.push(execFailCallback)
        return
      }
      asyncExecFun(() => {
        if(this.status === FULFILLED) {
          execFailCallback()

        }else if(this.status === REJECTED) {
          execFailCallback()
        }
      })
    })
    return promise
  }
  catch(failCallback) {
    return this.then(undefined, failCallback)
  }
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value)
      (reason) => MyPromise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
  static resolve(value) {
    if(value instanceof MyPromise) return value
    return new MyPromise((resolve => resolve(value)))
  }
  static reject(reason) {
    if(reason instanceof MyPromise) return reason
    return new MyPromise((resolve, reject) => reject(reason))
  }
  static all(array) {
    let result = []
    let len = array.length
    let promise = new MyPromise((resolve, reject) => {
      let index = 0
      function addData(key, data) {
        result[key] = data
        index++
        if(index === len) {
          resolve(result)
        }
      }
      for(let i = 0; i< len; i++) {
        let curr = array[i]
        if(curr instanceof MyPromise) {
          curr.then((value) => addData(i,value), reject)
        }else {
          addData(i, curr)
        }
      }
    })
    return promise
  }
  static race(array) {
    let promise = new MyPromise((resolve,reject) => {
      for(let i = 0; i < array.length; i++) {
        let curr = array[i]
        if(curr instanceof MyPromise) {
          curr.then(resolve,reject)
        }else {
          resolve(curr)
        }
      }
    })
    return promise
  }
}
module.exports = MyPromise