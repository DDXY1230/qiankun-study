// 执行  n - 1 轮就可以把序列排好 事件复杂的是 O(n^2)
Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        const temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
    }
  }
}


let arr = [3, 4, 2, 5, 6, 1, 9]
arr.bubbleSort()
console.log(arr)