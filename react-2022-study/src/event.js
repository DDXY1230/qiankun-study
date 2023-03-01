import { updateQueue  } from "./Component";
/**
 * 为什么要单独处理event
 * 1. 为了做兼容性处理
 * 2. 可以在你写的事件处理函数之前和之后做一些事情,比如修改
    updateQueue.isBatchingUpdate = true
    updateQueue.isBatchingUpdate = false
 * @param {*} dom 
 * @param {*} eventType 
 * @param {*} listener 
 */
export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {})
  store[eventType] = listener
  if(!document[eventType]) {
    // 事件委托, 不管你给那个dom元素上绑定事件,最后都同意代理到document上去了
    document[eventType] = dispatchEvent
  }
}
let syntheticEvent = {}
function dispatchEvent(event) {
  // console.log('合成对象')
  let {target, type} = event
  let eventType = `on${type}` // onclick
  updateQueue.isBatchingUpdate = true// 设置为批量更新模式
  syntheticEvent = createSyntheticEvent(event)
  let { store } = target
  let listener = store && store[eventType];
  listener && listener.call(target,syntheticEvent)
  for(let key in syntheticEvent) {
    syntheticEvent[key] = null
  }
  updateQueue.isBatchingUpdate = false// 设置为批量更新模式
  updateQueue.batchUpdate()
}
function createSyntheticEvent(nativeEvent) {
  for(let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]
  }
  return syntheticEvent
}