export const patchEvent = (el, key, value) => {
  // 对函数的缓存
  const invokers = el.vei || (el._vei = {});
  const exists = invokers[key]
  if (value && exists) { // 需要绑定事件并且 新的事件value有值的情况下
    exists.value = value
  } else { // 
    const eventName = key.slice(2).toLowerCase();
    if (value) {
      // 以前没有绑定过 要绑定事件
      let invoker = invokers[key] = createInvoker(value)
      el.addEventListener(eventName, invoker)
    } else { // 以前绑定了, 但是没有绑定值
      el.removeEventListener(eventName, exists);
      invokers[key] = undefined;

    }
  }
}
function createInvoker(value) {
  const invoker = e => {
    invoker.value(e)
  }
  invoker.value = value; // 为了能随时更改value属性
  return invoker
}