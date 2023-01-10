/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function(nums) {
    // 时间超出限制不予通过
    // let res = [],temp = [],n = 0
    // for(let i = 0; i < nums.length; i++) {
    //     if(!temp.includes(nums[i])) {
    //         temp.push(nums[i])
    //     }else {
    //       res.push([...temp])
    //       temp = []  
    //       n++
    //       i = n - 1
    //     }
    // }
    // temp.length > 0 ? res.push(temp): ''
    // let newArr = res.map(i => arrCount(i)).sort((a,b) => a - b)
    // return newArr.pop()
    // 正解如下, 滑动窗口
    let sum = 0
    const map = new Map()
    let j = 0
    let max = 0
    for (let i = 0; i < nums.length; i++) {
        const rs = nums[i]
        map[rs] = (map[rs] || 0) + 1
        sum += rs
        while(map[rs] > 1 && j <= i) {
            const ls = nums[j]
            map[ls] = map[ls] - 1
            j++
            sum -= ls
        }
        max = Math.max(max, sum)
    }
    return max
};
function arrCount (arr) {
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}