// 某个函数在短时间内只执行第一次, 直到指定时间段结束,周而复始
// 使用定时器, delay毫秒后第一次执行, 第二次事件停止触发后再第一次执行
// 可以结合时间戳, 实现更准确的节流
// 方法1
function throttle(fn, delay = 500) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, delay);
  };
}
// 方法2
function throttle(fn, delay) {
  let start = +Date.now();
  let timer = null;
  return function (...args) {
    const now = +Date.now();
    if (now - start >= delay) {
      clearTimeout(timer);
      timer = null;
      fn.apply(this.args);
      start = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this.args);
      }, delay);
    }
  };
}
