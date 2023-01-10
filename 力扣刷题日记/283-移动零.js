var moveZeros = function (nums) {
  // 方法一
  // let j = nums.length
  // for(let i = 0; i < j; i++) {
  //   if(nums[i] == 0) {
  //     nums.splice(i,1)
  //     nums.push(0)
  //     i--
  //     j--
  //   }
  // }
  // return nums


  // 方法二
  let i = 0,
    j = nums.length
  while (i < j) {
    if (nums[i] == 0) {
      nums.splice(i, 1)
      nums.push(0)
      j--
    } else {
      i++
    }
  }
  return nums
}