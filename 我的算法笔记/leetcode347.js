/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

 class MinHeap {
  constructor() {
    this.heap = []
  }
  getParentIndex(i) {
    // return Math.floor((i - 1) / 2)
    return (i - 1) >> 1
  }
  getLeftIndex(i) {
    return (i * 2) + 1
  }
  getRightIndex(i) {
    return (i * 2) + 2
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    if(this.heap[leftIndex] && this.heap[leftIndex].value < this.heap[index].value){
      this.swap(leftIndex,index)
      this.shiftDown(leftIndex)
    }
    if(this.heap[rightIndex] && this.heap[rightIndex].value < this.heap[index].value) {
      this.swap(rightIndex,index) 
      this.shiftDown(rightIndex)
    }
  }
  shiftUp(index) {
    if (index == 0) return
    const parentIndex = this.getParentIndex(index)
    if (this.heap[parentIndex].value > this.heap[index].value) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  swap(i1, i2) {
    const temp = this.heap[i1]
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  // 删除
  pop() {
    this.heap[0] = this.heap.pop()
    this.shiftDown(0)
  }
  // 获取堆顶
  peek() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}
var topKFrequent = function(nums, k) {
    const map = new Map()
    nums.forEach(n => {
        map.set(n,map.has(n) ? map.get(n) + 1 : 1)
    })
    // console.log(map)
    // const list = Array.from(map).sort((a,b) => b[1] - a[1])
    // console.log(list)
    // return list.slice(0,k).map(n => n[0])
    const h = new MinHeap()
    map.forEach((value,key) => {
        console.log(value,key)
        h.insert({value,key})
        if(h.size() > k) {
            h.pop()
        }
    })
    return h.heap.map(a => a.key)
};