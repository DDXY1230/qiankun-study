/* 
函数的防抖是指在事件被触发n秒后再执行回调,如果在这n秒内事件又被触发,则重新计时,
这可以使用在一些点击请求的事件上,避免因为用户的多次点击向后端发送多次请求
 */
function debouce(fn, wait) {
  let timer = null
  return function () {
    let context = this,
      args = arguments
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}