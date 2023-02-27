import React from "./react";
import ReactDOM from "./react-dom";
// import React from "react";
// import ReactDOM from "react-dom";
import {updateQueue} from './Component'
/* 
 合成事件和批量更新
 1.在react里面, 事件的更新可能是异步的,是批量的,不是同步的
 调用state之后状态并没有立刻更新,而是先缓存起来
 等事件函数处理完, 再进行批量更新, 一次更新并重新渲染
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0,name: this.props.name };
  }
  handleClick = () => {
    updateQueue.isBatchingUpdate = true
    this.setState({ number: this.state.number + 1 });
    this.setState({ number: this.state.number + 1 });
    this.setState({ number: this.state.number + 1 });
    this.setState({ number: this.state.number + 1 });
    // this.setState((lastState) => ({number: lastState.number + 1}),() => {
    //   console.log('全部状态更新完会执行这个会掉函数')
    // })
    updateQueue.batchUpdate()
    // updateQueue.isBatchingUpdate = false
  };
  render() {
    return (
      <div>
        <h4>{this.state.name}</h4>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
ReactDOM.render(<Counter name="计数器" />, document.getElementById("root"));
