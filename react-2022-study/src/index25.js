import { createStore } from 'redux'
const ADD = 'ADD'
const MINUS = 'MINUS'
const reducer = (oldState, action) => {
  switch(action.type) {
    case ADD:
      return {number: oldState.number + 1}
    case MINUS:
      return {number: oldState.number - 1}
    default:
      return oldState

  }
}
// 再redux中只能有一个reducer 一个store 单例模式
let store = createStore(reducer, {number: 0}) // 初始值是第二份参数,如果不写,也可以给oldState赋默认值
console.log(store.getState())
store.dispatch({type: ADD})
console.log(store.getState())

