/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function(nums, k) {
    let dp = []
    let i=0, max = nums[0]
    dp[0] = nums[0]
    for(let i = 1; i < nums.length; i++) {
        if(i >=k ) {
            max = -Infinity
            for(let j = i - 1; j >= i - k && i >= k;j--) {
                max = Math.max(max, dp[j])
            }
        }else {
            for(let j = 0; j < i; j++) {
                max = Math.max(max, dp[j])
            }
        }
        dp[i] = nums[i] + max
        console.log(max, '==', dp[i])
    }
    console.log(dp)
    return dp[dp.length - 1]
};