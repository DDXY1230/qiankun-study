function Promise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callbacks = []
  let self = this

  function resolve(data) {
    if (self.PromiseState !== 'pending') return
    // 修改对象的状态,
    self.PromiseState = 'fulfilled'
    // 设置对象结果值
    self.PromiseResult = data
    self.callbacks.forEach(item => {
      item.onResolved(data)
    })
  }

  function reject(data) {
    if (self.PromiseState !== 'pending') return
    self.PromiseState = 'rejected'
    self.PromiseResult = data

    self.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }


  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
// then方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = [type](self.PromiseResult)
        if (result instanceof Promise) {
          result.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved)
    }
    if (this.PromiseState === 'rejected') {
      console.log('rejected')
      callback(onRejected)
    }
    // 
    if (this.PromiseState === 'pending') {
      this.callback.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}
Promise.prototype.catch = function(onRejected) {
  console.log('catch')
  return this.then(undefined, onRejected)
}