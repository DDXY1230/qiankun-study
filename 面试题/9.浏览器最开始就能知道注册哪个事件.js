function addEvent(ele, eventName, handler) {
  if(ele.addEventListener) {
    ele.addEventListener(eventName, handler)
  }else if(ele.attachEvent) {
    ele.attachEvent('on' + eventName, handler)
  }else {
    ele['on' + eventName] = handler
  }
}
// 进入浏览器之后,不肯总是切换浏览器,所以其实可以进入之后确定了就缓存起来
var addEvent = (function () {
  if(window.addEventListener) {
    return function(ele, eventName, handler) {
      ele.addEventListener(eventName, handler)
    }
  }else if(window.attachEvent) {
    return function(ele, eventName, handler) {
      ele.attachEvent('on' + eventName, handler)
    }
  }else {
    return function(ele, eventName, handler) {
      ele['on' + eventName] = handler
    }
  }
})()