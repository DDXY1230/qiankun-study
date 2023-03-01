import React from "react";
import ReactDOM from "react-dom";
/**
 * useCallback
 * useMemo  只能用在函数组件
 * React 优化的最重要的策略是减少组件的刷新,希望组件的属性不变的话就不必要刷新
 * 类组件的话用PureComponent
 * 函数组件的话就用memo
 */

function Child({ data, handleClick }) {
  console.log("Child render");
  return <button onClick={handleClick}>{data.number}</button>;
}
// 返回的组件 要有一个功能:属性变化,重新渲染,属性不变,不更新
let MemoChild = React.memo(Child)
function App() {
  console.log("APP render");
  const [name, setName] = React.useState("lxxxmmm");
  const [number, setNumber] = React.useState(0);
  // 缓存对象 第二个参数告诉依赖项 依赖项目不发生变化,不会渲染子组件
  const data = React.useMemo(() => ({number}),[number]);
  // 缓存函数 第二个参数告诉依赖项 依赖项目不发生变化,不会渲染子组件
  const handleClick = React.useCallback(() => setNumber(number + 1),[number]);
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></input>
      <MemoChild data={data} handleClick={handleClick}></MemoChild>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
