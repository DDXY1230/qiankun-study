/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function (nums) {
    let i = 1, n = nums.length
    while (i < n && nums[i - 1] <= nums[i]) i++
    while (i < n) {
        if (nums[i] > nums[0]) return false
        if (i + 1 < n && nums[i] > nums[i + 1]) return false
        i++
    }
    return true
};