import React from "react";
import ReactDOM from "react-dom";
/**
 * 父组件使用子组件的ref
 * @param {*} props 
 * @param {*} ref 
 * @returns 
 */
function Child(props, ref) {
  return <input ref={ref}/>
}
const ForwardChild = React.forwardRef(Child)
function Parent(props) {
  let [count, setCount] = React.useState(0)
  let childRef = React.createRef()
  let getFocus = () => {
    childRef.current.focus()
  }
  return (
    <div>
      <ForwardChild ref={childRef}/>
      <button onClick={getFocus}>获得焦点</button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
ReactDOM.render(<Parent/>, document.getElementById('root'))