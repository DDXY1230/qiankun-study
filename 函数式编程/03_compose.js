// 函数组合 从右到左执行
function compose(f,g) {
  return function(value) {
    return f(g(value))
  }
}


function reverse(array) {
  return array.reverse()
}
function first(array) {
  return array[0]
}
const last = compose(first, reverse)
// console.log(last(['abcd',3,'rrr']))
// ----------------------------------



