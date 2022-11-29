let arr1 = ['2', '2', '2', '5', '5'] // 
let arr2 = ['a', 'b', 'b', 'a', 'a']
// 求数组中哪些数字出现了奇数次
function jishu(arr) {
  let r = 0
  for (let i = 0; i < arr.length; i++) {
    r ^= arr[i]
  }
  return r
}
// console.log(jishu(arr1))
// console.log(jishu(arr2))
// 1-n求和
function count100(n1, n2, n) {
  let num = n1 + n2
  if (n2 + 1 > n) {
    return num
  } else {
    return count100(num, n2 + 1, n)
  }
}
console.log(count100(1, 2, 3))

// 求中点
let a = 2
let b = 10
let c = a + ((b - a) >> 1) // 求a-b的中点
console.log(c)
// 递归求数组中的最大值
let arr3 = [1,9,5,3,6,7,8,4,2,9] //8
function getMax(arr,l = 0, r = arr.length - 1){
  if(l == r) {
    return arr[l]
  }
  let mid = l + ((r - l) >> 1) // 中点
  let lMax = getMax(arr,l,mid)
  let rMax = getMax(arr,mid+1,r)
  return Math.max(lMax,rMax)
}
console.log('getMax',getMax(arr3,0,arr3.length - 1))
function shunxu(arr,l=0,m,r=arr.length - 1) {
   m = l + ((r - l) >> 1) // 中点
   console.log("🚀 ~ file: suanfa.js ~ line 43 ~ shunxu ~ m", m)
   let p1 = 0
   let p2 = m + 1
   let help = []
   let i = 0
   while(p1 <= m && p2 <= r) {
    console.log('p1==>',arr[p1])
    console.log('p2==>',arr[p2])
    help[i++] = (arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++])
   }
   while(p1 <= m) {
    help[i++] = arr[p1++]
   }
   while(p2 <= r) {
    help[i++] = arr[p2++]
   }
   for(let i = 0; i < help.length; i++) {
    arr[l+i] = help[i]
   }
   return arr
}
console.log(shunxu(arr3,0,arr3.length - 1))