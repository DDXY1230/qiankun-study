// 选择排序性能也不是很好 时间复杂度O(n^2)
Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let indexMin = i
    for (let j = i; j < this.length; j++) {
      if (this[j] < this[indexMin]) {
        // 经过一轮循环可以找到最小值的下标
        indexMin = j
      }
    }
    if (indexMin !== i) {
      const temp = this[i]
      this[i] = this[indexMin]
      this[indexMin] = temp
    }
  }
}
let arr = [3, 4, 2, 5, 6, 1, 9]
arr.selectionSort()
console.log(arr)