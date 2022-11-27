let arr1 = ['2','2','2','5','5'] // 
let arr2 = ['a','b','b','a','a']
// 求数组中哪些数字出现了奇数次
function jishu(arr) {
  let r = 0
  for(let i = 0; i<arr.length; i++){
    r ^= arr[i]
  }
  return r
}
// console.log(jishu(arr1))
// console.log(jishu(arr2))
// 1-n求和
function count100(n1,n2,n) {
  let num = n1 + n2
  if(n2 + 1 > n) {
    return num
  }else {
    return count100(num, n2 + 1,n)
  }
}
console.log(count100(1,2,3))