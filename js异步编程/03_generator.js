// //es2015提供的生成器函数
// function * foo() {
//   console.log('start')
//   let a = yield 2 + 2
//   console.log(a)
//   console.log('112233')
// }
// const generator = foo()
// const result = generator.next()
// // console.log(result)
// const result1 = generator.next(666)
// // console.log(result1)
// // const result2 = generator.next()
// // console.log(result2)
//-------------
//生成器函数
function co(generator) {
  const g = generator()
  function handleResult (result) {
    if(result.done) return
    result.value.then(data => {
      handleResult(g.next(data))
    }, error => {
      g.throw(error)
    })
  }
  handleResult(g.next())
}