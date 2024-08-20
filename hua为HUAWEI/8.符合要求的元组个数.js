/**
 * 题目描述
给定一个整数数组 nums、一个数字k，一个整数目标值 target，请问nums中是否存在k个元素使得其相加结果为target，请输出所有符合条件且不重复的k元组的个数

数据范围

2 ≤ nums.length ≤ 200
-10^9 ≤ nums[i] ≤ 10^9
-10^9 ≤ target ≤ 10^9
2 ≤ k ≤ 100
输入描述
第一行是nums取值：2 7 11 15

第二行是k的取值：2

第三行是target取值：9

输出描述
输出第一行是符合要求的元组个数：1

补充说明：[2,7]满足，输出个数是1


 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const lines = []
rl.on('line', (line) => {
  lines.push(line);
  if(lines.length == 3) {
    const nums = lines[0].split('').map(Number);
    console.log('nums===>',nums)
    const k = parseInt(lines[1]);
    const target = parseInt(lines[2]);
    console.log(getResult(nums,k,target))
    lines.length = 0;
  }
})

function getResult(nums,k,target) {
  if(k > nums.length) return 0;
  nums.sort((a,b) => a - b)
  return kSum(nums, k, target, 0,0,0)
}
// k数之和
function kSum(nums, k , target, start,count, sum) {
  if(k < 2) return count
  if(k == 2) {
    return twoSum(nums, target, start, count, sum)
  }
  for(let i = start; i<=nums.length - k; i++) {
    if(nums[i] > 0&&sum + nums[i] > target) break
    if(i > start && nums[i] == nums[i - 1]) continue
    count = kSum(nums, k - 1, target, i + 1, count, sum + nums[i])
  }
  return count
}
// 两数之和
function twoSum(nums, target, start,count,preSum) {
  let l = start;
  let r = nums.length - 1;
  while(l < r) {
    const sum = preSum + nums[l] + nums[r]
    if(sum > target) {
      r--
    }else if(sum < target) {
      l++
    }else {
      count++
      while(l + 1 < r && nums[l] == nums[l + 1]) l++;
      while(r - 1 > l && nums[r] == nums[r - 1]) r--;
      l++;
      r--
    }
  }
  return count
}
