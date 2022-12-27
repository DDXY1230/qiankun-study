// 顺序搜索非常低效 时间复杂度O(n)
Array.prototype.sequentialSearch = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      return i
    }
  }
  return -1
}

let arr = [3, 4, 2, 5, 6, 1, 9]
let index = arr.sequentialSearch(1)
console.log(index)