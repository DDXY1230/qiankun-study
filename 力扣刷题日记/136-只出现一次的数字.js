// 出现过两次的元素结果异或一定是0
var singleNumber = function(nums) {
  let result = 0
  for(let i of nums) {
    result = result ^ i
  }
  return result
}