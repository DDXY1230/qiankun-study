/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
    let map = new Map(), res = 0
    for (let i = 0; i < nums.length; i++) {
        let item = nums[i]
        map.set(item, (map.get(item) || 0) + 1)
    }
    for (let [key, val] of map) {
        if (val == 1) res += key
    }
    return res
};