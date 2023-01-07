/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    if(!nums.length) return []
    let res = []
    for(let i = 0; i < nums.length; i++) {
        let idxOf = res.indexOf(nums[i])
        if(idxOf > -1) {
            res.splice(idxOf, 1)
        }else {
            res.push(nums[i])
        }
    }
    return res
};