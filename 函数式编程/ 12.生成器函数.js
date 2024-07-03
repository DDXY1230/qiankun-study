
const delay = function(interval) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`@@${interval}`)
    },interval)
  })
}
console.log(delay(1000))
const handle = function *() {
  console.log('1')
  let x = yield delay(1000)
  console.log(x)
  console.log('2')
  let y = yield delay(2000)
  console.log(y)
  console.log('3')
  return '4'
}
const AsyncFunction = function AsyncFunction(...params) {
  let itor = handle(...params)
  const next = x => {
    let {done,value} = itor.next(x)
    if(done) return
    if(!(value instanceof Promise)) value = Promise.resolve(value)
    value.then(x => next(x))
  }
  next()
}
AsyncFunction()