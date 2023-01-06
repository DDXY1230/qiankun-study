/* 

函数的节流是指规定一定单位时间,在这个单位时间内, 只能有一次触发事件的回调函数执行,如果,同一个单位时间内某事件
被多次触发,只有一次生效,节流可以使用scroll事件监听上,通过事件节流来降低事件调用的频率
 */

function throttle(fn,delay) {
  let curTime = Date.now()
  return function() {
    let context = this, args = arguments, nowTime = Date.now()
    if(nowTime - curTime >= delay) {
      curTime = Date.now()
      return fn.apply(context, args)
    }
  }
}