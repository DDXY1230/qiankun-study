import React from "react";
import ReactDOM from "react-dom";
/**
 * 默认Component情况下不管子组件是否发生变化,只要父组件的state发生变化都会重新渲染
 * 但是PureComponent 是在组件状态发生变化的时候才触发
 * PureComponent原理是重写了shoudeComponentUpdate方法
 * 只有状态和属性发生变化了才会更新
 * 内部又个shallowEaual方法比较属性和状态 内部是浅比较
 * 返回true 更新 返回false 不更新
 * 内部源码是浅比较,只有内存地址发生变化才会更新
 * 如果是深比较,消耗性能
 * immuer 即可以做到深度比较发生变化,又可以节约性能资源
 */
class Parent extends React.Component {
  state = {number1: 0, number2: 0,}
  addNumber = () => {
    this.setState({number1: this.state.number1 +1})
  }
  addCounter = () => {
    this.setState({number2: this.state.number2 +1})
  }
  render() {
    return (
      <div>
        <ChildCounter1 number={this.state.number1}></ChildCounter1>
        <ChildCounter2 number={this.state.number2}></ChildCounter2>
        <button onClick={this.addNumber}>11---+</button>
        <button onClick={this.addCounter}>22---+</button>
      </div>
    )
  }
}
class ChildCounter1 extends React.PureComponent {
  
  render() {
    console.log('ChildCounter1')
    return (
      <div>
        ChildCounter1-{this.props.number}
      </div>
    )
  }
}
class ChildCounter2 extends React.PureComponent {
  
  render() {
    console.log('ChildCounter2')
    return (
      <div>
        ChildCounter2-{this.props.number}
      </div>
    )
  }
}
ReactDOM.render(<Parent/>, document.getElementById('root'))
