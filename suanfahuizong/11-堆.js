// 堆是一种特殊的完全二叉树
// 使用数组来表示堆
class Minheap {
  constructor() {
    this.heap = []
  }
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  shiftUp(index) {
    if(index == 0) return
    const parentIndex = this.getParentIndex(index)
    if(this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  getParentIndex(i) {
    // return Math.floor((i - 1) / 2)
    return (i - 1) >> 1
  }
  getLeftIndex(i) {
    return i * 2 + 1
  }
  getRightIndex(i) {
    return i * 2 + 2
  }
  swap(i1, i2) {
    const temp = this.heap[i1]
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }
  pop() {
    this.heap[0] = this.heap.pop()
    this.shiftDown(0)
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    if(this.heap[leftIndex] < this.heap[index]){
      this.swap(leftIndex,index)
      this.shiftDown(leftIndex)
    }
    if(this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index)
      this.shiftDown(rightIndex)
    }
  }
  peek() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}
const h = new Minheap()
h.insert(3)
h.insert(51)
h.insert(50)
h.insert(56)
h.insert(52)
h.insert(2)
h.insert(59)
h.pop()
console.log(h)