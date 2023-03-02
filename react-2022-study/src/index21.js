import React from "react";
import ReactDOM from "react-dom";
/**
 * 父组件使用子组件的ref
 * @param {*} props
 * @param {*} ref
 * @returns
 * 子元素只想让父元素能有获得焦点的能力, 不能干别的
 */
function Child(props, ref) {
  // let inputRef = React.createRef(); //  这样外界访问不到全部的input功能了,隐私性更好,选择性暴露
  // React.useImperativeHandle(ref, () => ({
  //   focus() {
  //     inputRef.current.focus();
  //   },
  // }));
  return <input ref={props.inputRef} />; // 自定义ref也是可以的 但是用的少
}
// const ForwardChild = React.forwardRef(Child);
function Parent(props) {
  let [count, setCount] = React.useState(0);
  let childRef = React.createRef();
  let getFocus = () => {
    childRef.current.focus();
  };
  return (
    <div>
    {/* 自定义ref */}
      <Child inputRef={childRef} /> 
      <button onClick={getFocus}>获得焦点</button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
ReactDOM.render(<Parent />, document.getElementById("root"));



/**
 * hook解决了函数组件没有状态的问题
 */