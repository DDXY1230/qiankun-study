// reduce 收敛函数
let sum = ([1, 2, 3, 4]).reduce(function (previousValue, currentValue, index, array) {
  console.log(previousValue, currentValue, )
  return previousValue + currentValue
}, 0)
console.log(sum)

// reduce方法数组不能为空,如果为空,必须在后面给初始值  这最后是0
// 原理
Array.prototype.reduce = function (callback, prev) {
  for (let i = 0; i < this.length; i++) {
    if (!prev) {
      prev = callback(this[i], this[i + 1], i + 1, this)
    } else {
      prev = callback(prev, this[i], i, this)
    }
  }
  return prev
}


// 面试题
//compose 面试会问, 会让你实现compose
function sum(a, b) {
  return a + b
}

function len(str) {
  return str.length
}

function addPrix(str) {
  return '$' + str
}
// let r = addPrix(len(sum('aaa', 'bbb')))
// console.log(r)

const compose = (...fns) => {
  return function (...args) {
    let lastFn = fns.pop();
    let r = lastFn(...args)
    return fns.reduceRight((prev, current) => {
      return current(prev)
    }, r)
  }
}
const resFn = compose(addPrix, len, sum)
const res = resFn('aaa', 'bbb')
console.log('res===>', res)

// 简化版
const compose2 = (...fns) => (...args) => {
  let lastFn = fns.pop();
  return fns.reduceRight((prev, current) => current(prev), lastFn(...args))
}


const compose3 = (...fns) => fns.reduce((a,b) => (...args) => a(b(...args)))
let final = compose3(addPrix,len,sum)
let r3 = final('a', 'b')
console.log('r3',r3)