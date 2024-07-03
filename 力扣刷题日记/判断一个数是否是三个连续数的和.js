/**
 * - 5 = 2 + 3
- 12 = 3 + 4 + 5
- 思路:
    - 暴露找出规律
    - 两个for循环
    - 如果大于这个数直接跳出循环
 */
function isMSum(num) {
  for(let i = 1; i <= num; i++) {
    let sum = i
    for(let j = i + 1; j <= num - i; j++) {
      if(sum + j == num) {
        return true
      }
      if(sum + j > num) {
        break
      }else {
        sum += j
      }
    }
  }
  return false
}
// 规律写法
function isMSum2(num) {
  if(num < 3) {
    return false
  }
  return (num & (num - 1)) != 0
}
console.log(isMSum(5) == isMSum2(5))
console.log(isMSum(15) == isMSum2(15))
console.log(isMSum(25) == isMSum2(25))