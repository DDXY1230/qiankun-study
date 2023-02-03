/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    //方法1
    // for(let i = 0; i < nums.length;i++) {
    //     for(let j = i + 1; j < nums.length ; j++) {
    //         if(nums[i] + nums[j] == target) {
    //             return [i, j]
    //         }
    //     }
    // }
    // 方法2
    let map = new Map()
    for(let i = 0; i<nums.length;i++) {
        num = target - nums[i]
        if(map.has(num)){
            return [map.get(num), i]
        }
        map.set(nums[i],i)
    }
};