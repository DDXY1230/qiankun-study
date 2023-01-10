/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSumAbsoluteDifferences = function(nums) {
    // 暴力无法通过测试
    // let res = []
    // for(let i = 0; i < nums.length; i++) {
    //     let cur = nums[i], sum = 0
    //     for(let j = 0; j < nums.length; j++) {
    //         sum += Math.abs(cur - nums[j])
    //     }
    //     res.push(sum)
    // }
    // return res
    // 动态规划
    let sum = 0, result = []
    for(let i = 0; i < nums.length; i++) {
        sum += nums[i]
    }
    result[0] = sum - nums[0] * nums.length
    console.log(result[0])
    for(let i = 1; i < nums.length; i++) {
        result[i] = result[i - 1] - (nums.length - 2*i)*(nums[i] - nums[i - 1])
    }
    return result
};