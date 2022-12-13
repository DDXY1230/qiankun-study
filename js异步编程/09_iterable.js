// 对象手动添加迭代器才可以用for  of
const obj = {
  store: ['foo','bar','baa'],
  [Symbol.iterator]: function() {
    let index = 0
    let self = this
    return {
      next: function() {
        const result =  {
          value: self.store[index],
          done: index >= self.store.length
        }
        index++
        return result
      }
    }
  }
}
for(const item of obj) {
  console.log(item)
  console.log('循环听')
}

const todos = {
  life: ['吃饭','喝水', '睡觉'],
  learn: ['语文', '数学', '英语'],
  work: ['coding'],
  [Symbol.iterator]: function *() {
    const all = [...this.life, ...this.learn, ...this.work]
    for(const item of all) {
      yield item
    }
  }
}
for(const i of todos) {
  console.log('==>', i)
}