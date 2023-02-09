var maxSumArray = function (nums) {
  let dp = 0
  let maxSum = nums[0]
  for (let i = 0; i < nums.length; i++) {
    dp = Math.max(dp + nums[i], nums[i])
    maxSum = Math.max(maxSum, dp)
  }
  return maxSum
} 