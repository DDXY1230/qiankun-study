// const promise = new Promise(function(resolve, reject) {
//   resolve(100)
// })
// promise.then(function(data) {
//   console.log('成功')
// }, function(error) {
//   console.log('失败')
// })

//------------------------
// Promise.race 只要其中一个任务完成即可
const request = ajax('api/posts.json')
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error(' timeout ')), 5000)
})
Promise.race([request, timeout]).then(value => {
  console.log(value)
}).catch(error => {
  console.log(error)
})
//===============================
console.log('global start')
Promise.resolve().then(() => {
  console.log('promise')
})
console.log('global end')
// 上面这段代码的输出是 global start=》 global end =》 promise

// 如果有setTimeout ,promise的执行在setTimeout前面,因为Promise的回调会作为微任务执行