class Stack {
  constructor() {
    // 存储栈的数据
    this.data = []
    // 记录栈的个数  相当于length
    this.count = 0
  }
  // push()入栈操作
  push(item) {
    // 方法1: 数组方法的push 添加
    // this.data.push(item)
    // 方式2: 利用数组长度
    // this.data[this.data.length] = item
    // 方式3: 计数方式
    this.data[this.count] = item
    // 入栈后 count自增
    this.count++
  }
  pop() {
    // 出栈钱先判断栈中是否还存在元素,应该先检测
    if (this.isEmpty()) {
      console.log('栈为空')
      return
    }
    // 移除栈顶数据
    // 方法1 数组pop移除
    // return this.data.pop()
    // 方法2 计数方式
    const temp = this.data[this.count - 1]
    delete this.data[this.count - 1]
    this.count--
    return temp

  }
  isEmpty() {
    return this.count === 0
  }
  // top用于获取栈顶值
  top() {
    if (this.isEmpty()) {
      console.log('栈已经是空的了')
      return
    }
    return this.data[this.count - 1]
  }
  // size()获取元素
  size() {
    return this.count
  }
  clear() {
    this.data = []
    this.count = 0
  }
}

// 测试
let s = new Stack()
s.push(1)
s.push(2)
s.push(3)
// console.log(s.pop())
// console.log(s.top())