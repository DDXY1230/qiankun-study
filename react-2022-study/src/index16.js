import React from "react";
import ReactDOM from "react-dom";
const CounterContext = React.createContext();
/**
 * useReducer
 * useState的替代方案
 */
/**
 * reducer 处理器 可以接受一个老状态 返回一个新状态
 * @param {*} state
 * @param {*} action  对象 肯定有type属性 {type: 'xx'}
 */
const ADD = "ADD";
const MINUS = "MINUS";
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 };
      break;
    case MINUS:
      return { number: state.number - 1 };
      break;
    default:
      return state;
  }
}
function Counter(props) {
  let {state,dispatch} = React.useContext(CounterContext)
  return (
    <div>
      <p>Counter: {state.number}</p>
      <button onClick={() => dispatch({ type: ADD })}>+</button>
      <button onClick={() => dispatch({ type: MINUS })}>-</button>
    </div>
  );
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, { number: 0 });
  return (
    <CounterContext.Provider value={{state,dispatch}}>
      <Counter></Counter>
    </CounterContext.Provider>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
