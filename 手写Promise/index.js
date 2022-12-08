const MyPromise = require('./myPromise')
let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
    // reject('失败')
  }, 2000)
  // resolve('成功')
  // throw new Error('执行器错误')
  // reject('失败')
})
promise.then(value => {
  console.log(value)
  // throw new Error('then error')
}, reason => {
  console.log('reason1',reason)
})
promise.then(value => {
  console.log(value)
  return 100
}, reason => {
  console.log('reason2',reason)
  return 11111
})
let p1 = promise.then(value => {
  console.log(value)
  return p1
}, reason => {
  console.log('reason3',reason)
})
p1.then(value => {
  console.log(value)
}, reason => {
  console.log(reason.message)
})