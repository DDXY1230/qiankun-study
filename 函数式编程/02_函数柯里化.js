const _ = require('lodash')
const array = ['jack', 'tom', 'alice', 'lucy']
// console.log(_.first(array))
// console.log(_.last(array))
// console.log(_.toUpper(_.first(array)))
const r = _.each(array, (item, index) => {
  console.log(item, index)
  return item + '在读小学'
})
// console.log(r)
// 原生的forEach没有返回值
const a = array.forEach(i => {
  console.log(i + '111')
})
// console.log(a)
//lodash有一个记忆函数
function getArea(r) {
  console.log('打印一次')
  return Math.PI*r*r
}
// 模拟memoize方法的实现
function memoize(fn) {
  let cache = {}
  return function () {
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || fn.apply(fn,arguments)
    return cache[key]
  }
}
// let getAreaWithMemory = _.memoize(getArea) // lodash里面的
let getAreaWithMemory = memoize(getArea) // 自己模拟出来的
// console.log(getAreaWithMemory(3))
// console.log(getAreaWithMemory(3))
// console.log(getAreaWithMemory(3))
//------------------------------------
function checkAge(min) {
  return function(age) {
    return age > min
  }
}
const checkAge18 = checkAge(18)
const checkAge28 = checkAge(28)
// console.log(checkAge18(20))
// console.log(checkAge28(20))
//------------------------------------
// lodash 中curry方法的基本使用
function getSum (a,b,c) {
  return a+b+c
}
const curried = curry(getSum)
console.log(curried(1,2,3))
// 可以先传一个参数,返回一个函数,等待其余参数的传入
let curried1 = curried(1)
console.log(curried1(2,3))
//--------------------------------------
const match = curry(function(reg, str) {
  return str.match(reg)
})
const haveSpace = match(/\s+/g)
const havaNumber = match(/\d+/g)

// console.log(haveSpace('helloworld'))
// console.log(havaNumber('123sssdd'))
const filter = curry(function(func, array) {
  return array.filter(func)
})
// console.log(filter(haveSpace, ['John connor', 'John_connor']))
const findSpace = filter(haveSpace)
// console.log(findSpace(['John connor', 'John_connor']))
// 模拟lodash 中 curry函数  lodash的是  _.curry(...) 上面加上下划线就行了
function curry(func) {
  return function curriedFn(...args) {
    // 判断实参和形参的个数
    if(args.length < func.length) {
      return function() {
        return curriedFn(...args.concat(...arguments))
      }
    }
    return func(...args)
  }
}

/* 
1.柯里化函数可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
2.这是一种对函数参数的缓存
3.让函数变得更灵活,让函数的颗粒度更小
4.可以把多元函数转换成一元函数,可以组合使用函数产生强大的功能
 */
