// once 只执行一次的函数
function once(fn) {
  let done = false //此函数是否被调用过,默认没有被调用
  return function() {
    if(!done) {
      done = true // 进入此处说明函数被调用了
      return fn.apply(this,arguments)
    }
  }
}
// 比如支付操作
let pay = once(function (money) {
  console.log(`支付了${money} RMB`)
})
// 支付,  这里只会执行一次
// pay(5)
// pay(5)
// pay(5)
//-----------------------
// 模拟map
const map = function(array, fn) {
  let results = []
  for(let i of array) {
    results.push(fn(i))
  }
  return results
}
let arr = [1,2,3,4,5]
arr = map(arr, v => v*v)
// console.log(arr)
//-----------------------
//every
const every = (array, fn) => {
  let result = true
  for(let value of array) {
    result = fn(value)
    if(!result) {
      break
    }
  }
  return result
}
let arr1 = [1,2,2,3,4]
let r = every(arr1, v => v < 10)
// console.log(r)
//-----------------------
// some
const some = (array,fn) => {
  let result = false
  for(let value of array) {
    result = fn(value)
    if(result) {
      break
    }
  }
  return result
}
let arr2 = [3,5,7,3]
let r1 = some(arr2, i => i % 2 == 0)
// console.log(r1)

function makePower(power) {
  return function (number) {
    return Math.pow(number,power)
  }
}
const po2 = makePower(2)
const po3 = makePower(3)
// console.log(po2(2))
// console.log(po3(2))
//-----------------------
function makeSalary(base) {
  return function(performance) {
    return base + performance
  }
}
let salaryLevel1 = makeSalary(2000) 
let salaryLevel2 = makeSalary(4000)
// console.log(salaryLevel1(10000))
// console.log(salaryLevel2(20000))
//-----------------------

