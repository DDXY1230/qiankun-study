import React from "react";
import ReactDOM from "react-dom";
function Animation() {
  const ref = React.useRef();
  // 因为useEffect是在浏览器绘制之后执行的, 所以绘制的时候,没有移动, 内部用的是setTimeout
  //然后绘制后再修改translate修改位置, 所以就有动画效果了

  // useLayoutEffect是在浏览器绘制之前执行的, 所以绘制的时候DOM已经更新了内部用的是queueMicrotask微任务队列
  // React.useLayoutEffect(() => {
    
  React.useEffect(() => {
    ref.current.style.WebkitTransform = 'translate(500px)'
    ref.current.style.transition = 'all 1000ms'
  })
  let style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  }
  return <div ref={ref} style={style}>内容</div>
}
ReactDOM.render(<Animation/>, document.getElementById('root'))