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
console.log(jishu(arr1))
console.log(jishu(arr2))