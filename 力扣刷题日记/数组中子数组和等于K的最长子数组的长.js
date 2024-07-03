// 数组中子串和等于k的最长子串的长度是多少 
// 数组中全是正数
function getMaxLength(arr, K) {
  if(arr == null || arr.length == 0 || K<=0) {
    return 0
  }
  let left = 0
  let right = 0
  let sum = arr[0]
  let len = 0
  while(right < arr.length) {
    if(sum == K) {
      let = Math.max(len, right - left + 1)
      sum -= arr[left++]
    }else if(sum < K) {
      right++
      if(right == arr.length) {
        break
      }
      sum += arr[right]
    }else {
      sum -= arr[left++]
    }
  }
  return len
}
//for test 暴力
function getMaxLength2(arr, K) {
  let max = 0
  for(let i = 0; i < arr.length; i++) {
    for(let j = i; j < arr.length; j++) {
      if(valid(arr,i,j,K)){
        max = Math.max(max, j - i + 1)
      }
    }
  }
  return max
}
function valid(arr,l,r,K){
  let sum = 0
  for(let i = l; i <= r; i++) {
    sum += arr[i]
  }
  return sum == K
}

function generatePositiveArray(size,value) {
  let ans = []
  for(let i = 0; i < size; i++) {
    ans[i] = (Math.random() * value) + 1
  }
  return ans
}
// 测试
function main() {
  let len = 50
  let value = 100
  let testTime = 1500
  let text = '成功'
  for(let i = 0; i < testTime; i++){
    let arr = generatePositiveArray(len, value)
    let K = Math.random() * value + 1
    let ans1 = getMaxLength(arr, K)
    let ans2 = getMaxLength2(arr,K)
    if(ans1 != ans2) {
      console.log('失败')
      text = '失败'
      break
    }
  }
  console.log(text)
}
main()
