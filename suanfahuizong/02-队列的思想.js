//不依赖数组的队列
class Queue {
  constructor() {
    this.queue = {}
    this.count = 0
    this.head = 0
  }
  enQueue(item) {
    this.queue[this.count++] = item
  }
  deQueue() {
    if (this.isEmpty()) {
      return
    }
    const headData = this.queue[this.head]
    delete this.queue[this.head++]
    this.count--
    return headData
  }
  isEmpty() {
    return this.count === 0
  }
  clear() {
    this.queue = {}
    this.head = 0
    this.count = 0
  }
}
const q = new Queue()