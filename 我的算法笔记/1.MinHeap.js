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
    if(this.heap[leftIndex] < this.heap[index]){
      this.swap(leftIndex,index)
      this.shiftDown(leftIndex)
    }
    if(this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex,index) 
      this.shiftDown(rightIndex)
    }
  }
  shiftUp(index) {
    if (index == 0) return
    const parentIndex = this.getParentIndex(index)
    if (this.heap[parentIndex] > this.heap[index]) {
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
    const t = this.heap[0]
    if(this.size() == 1) {
      this.heap = []
      return t
    }
    this.heap[0] = this.heap.pop()
    this.shiftDown(0)
    return t
  }
  // 获取堆顶
  peek() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}


// test
const h = new MinHeap()
h.insert(3)
h.insert(2)
h.insert(10)
h.insert(1)
h.insert(12)
h.insert(19)
h.pop()
h.pop()
h.pop()
console.log(h.peek())
console.log(h.size())
console.log(h.heap)