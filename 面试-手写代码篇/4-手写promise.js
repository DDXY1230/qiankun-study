const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function MyPromise(fn) {
  // 保存初始化状态
  let self = this
  // 初始化状态
  this.state = PENDING
  // 用于保存resolve或者rejected传入的值
  this.value = null
  // 用于保存resolve的回调函数
  this.resolvedCallbacks = []
  // 用于保存reject的回调函数
  this.rejectedCallbacks = []
  // 状态转变resolved方法
  function resolve(value) {
    //判断传入元素是否为Promise,如果是,则状态改变必须等待前一个状态改变后再进行改变
    if(value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为pending时候才能转变
      if(self.state == PENDING) {
        // 修改状态
        self.state = RESOLVED
        // 设置传入的值
        self.value = value
        // 执行回调函数
        self.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    },0)
  }
  // 状态转变为reject方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为pending时才能转变
      if(self.state === PENDING) {
        // 修改状态
        self.state = REJECTED
        // 设置传入的值
        self.value = value
        // 执行回调函数
        self.rejectedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }
  try{
    fn(resolve, reject)
  }catch(e) {
    reject(e)
  }
}
MyPromise.prototype.then = function(onResolved, onRejected) {
  // 首先判断这两个参数是否是函数类型, 因为这两个参数是可选参数
  onResolved = typeof onResolved === "function" ? onResolved : function(value) { return value}
  onRejected = typeof onRejected === 'function' ? onRejected : function(error) {throw error}
  if(this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved)
    this.rejectedCallbacks.push(onRejected)
  }
  // 如果状态已经凝固,则直接执行对应状态的函数
  if(this.state === RESOLVED) {
    onResolved(this.value)
  }
  if(this.state === REJECTED) {
    onRejected(this.value)
  }
}
MyPromise.prototype.all = function(promises) {
  return new MyPromise(function(resolve, reject) {
    if(!Array.isArray(promises)) {
      throw new TypeError('argument must be a array')
    }
    let resolvedCounter = 0
    let promisesNum = promises.length
    let resolvedResult = []
    for(let i = 0; i < promisesNum; i++) {
      MyPromise.resolve(promisesp[i]).then(value => {
        resolvedCounter++
        resolvedResult[i] = value
        if(resolvedCounter == promisesNum) {
          return resolve(resolvedResult)
        }
      },error => {
        return reject(error)
      })
    }
  })
}