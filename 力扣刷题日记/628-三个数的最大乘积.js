var maximumProduct = function (nums) {
  let n = nums.length
  nums.sort((a, b) => a - b) // 一定要先排序
  return Math.max(nums[0] * nums[1] * nums[n - 1], nums[n - 1] * nums[n - 2] * nums[n - 3])
}