import React from "react";
import ReactDOM from "react-dom";
function Counter () {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => {
      console.log('===>',count)
    },3000)
    //   console.log('挂载')
    // return () => {
    //   console.log('卸载')
    // }
  })
  return (
    <div>
      <p>
        {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
ReactDOM.render(<Counter/>, document.getElementById('root'))
