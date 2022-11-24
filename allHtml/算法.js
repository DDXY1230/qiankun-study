// 数组去重
let arr = [1,2,2,3,4,5,6,6,6,6,7]
// 方法一
let arr1 = [...new Set(arr)]
// console.log(arr1)
let arr2 = Array.from(new Set(arr))
// console.log(arr2)
//方法二 splice会改变原来数组
// for(let i = 0; i< arr.length - 1; i++) {
//   for(let j = i + 1; j < arr.length; j ++) {
//     if(arr[i] == arr[j]) {
//       arr.splice(j,1)
//       j--
//     }
//   }
// }
for(let i = 0; i< arr.length - 1;i++) {
  let item = arr[i], args = arr.slice(i+1)
  if(args.indexOf(item) > -1) {
    arr.splice(i,1)
    i-- // 性能不好,当前项删除,后面所有的数据都要变化
  }
}
// console.log('33',arr)
let _arr = []
for(let i = 0; i< arr.length; i++) {
  if(_arr.indexOf(arr[i]) < 0) {
    _arr.push(arr[i])
  } 
}
// console.log('31', _arr)


// 数组扁平化
let arr3 = [1,[2,[3,[4,[5]]]]]
let _arr3 = arr3.flat(Infinity) // 不知道几级的时候用Infinity
// console.log(_arr3)
let arr4 = arr3.toString().split(',').map(i => parseFloat(i))
// console.log(arr4)
let arr5 = JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(i => parseFloat(i))
// console.log(arr5)
while(arr3.some(item => Array.isArray(item))) {
  console.log(arr3)
  arr3 = [].concat(...arr3,'ll')
}
console.log('22',arr3)
console.log([1,2].concat(3,[4,[999]]))
// contact会默认去除一层的数组括号


//斐波那契数列
function fibonacci(n) {
  if(n<= 1) return 1
  let arr = [1,1]
  let i = n+1-2
  while(i > 0) {
    let a = arr[arr.length - 2]
    let b = arr[arr.length - 1]
    arr.push(a + b)
    i--
  }
  return arr[arr.length - 1]
}
console.log(fibonacci(0))
console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))
console.log(fibonacci(6))