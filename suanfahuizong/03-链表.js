class LinkedNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
class LinkedList {
  constructor() {
    this.count = 0
    this.head = null
  }
  addAtTail(value) {
    const node = new LinkedNode(value)
    if (this.count === 0) {
      this.head = node
    } else {
      let cur = this.head
      while (cur.next != null) {
        cur = cur.next
      }
      cur.next = node
    }
    this.count++
  }
  addAtHead(value) {
    const node = new LinkedNode(value)
    if (this.count === 0) {
      this.head = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.count++
  }
  get(index) {
    if (this.count === 0 || index < 0 || index >= this.count) {
      return
    }
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next
    }
    return current
  }
  addAtIndex(value, index) {
    if (this.count == 0 || index >= this.count) {
      return
    }
    if (index <= 0) {
      this.addAtHead(value)
    }
    const prev = this.get(index - 1)
    const next = prev.next
    const node = new LinkedNode(value)
    prev.next = node
    node.next = next
    this.count++
  }
  removeAtIndex(index) {
    if (this.count == 0 || index < 0 || index >= this.count) {
      return
    }
    if (index === 0) {
      this.head = this.head.next
    } else {
      const prev = this.get(index - 1)
      prev.next = prev.next.next
    }
    this.count--
  }
}
const l = new LinkedList()
l.addAtTail('a')
l.addAtTail('b')
l.addAtTail('c')
console.log(l)
l.addAtIndex('x', 1)
console.log(l)
l.removeAtIndex(1)
console.log(l)
l.removeAtIndex(1)
console.log(l)