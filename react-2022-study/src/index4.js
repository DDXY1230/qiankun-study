import React from "react";
import ReactDOM from "react-dom";
class Counter extends React.Component {
  static defaultProps = {
    name: "计数器",
  };
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
    console.log("counter1 constructor 初始化属性和状态对象");
  }
  componentWillMount() {
    console.log("counter2 componentWillMount 组件将要挂载");
  }
  componentDidMount() {
    console.log("counter4 componentDidMount 组件挂载完毕");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    console.log("counter5 shouldComponentUpdate 决定组件是否需要更新");
    // return nextState.number % 2 === 0;   //shouldComponent  如果写了,返回true更新组件,返回false不更新组件
  }
  componentWillUpdate() {
    console.log("counter6 componentWillUpdate 组件将要更新");
  }
  componentDidUpdate() {
    console.log("counter7 componentDidUpdate 组件更新完毕");
  }
  handleClick = (event) => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    console.log("counter 3.render");
    return (
      <div id="counter">
        <p> {this.state.number} </p>
        {this.state.number === 4 ? null : (
          <ChildCounter1 count={this.state.number} />
        )}
        <button onClick={this.handleClick}> + </button>
      </div>
    );
  }
}
class ChildCounter extends React.Component {
  componentWillMount() {
    console.log("子组件2 componentWillMount 组件将要挂载");
  }
  componentDidMount() {
    console.log("子组件4 componentDidMount 组件挂载完毕");
  }
  componentWillReceiveProps(newProps) {
    console.log("子组件5-1 componentWillReceiveProps 组件将要收到最新的属性");
  }
  componentWillUpdate() {
    console.log("子组件6 componentWillUpdate 组件将要更新");
  }
  componentDidUpdate() {
    console.log("子组件7 componentDidUpdate 组件更新完毕");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    console.log("子组件5-2 shouldComponentUpdate 决定组件是否需要更新");
    return nextProps.count % 3 === 0;
  }
  componentWillUnmount() {
    console.log("子组件8 componentWillUnmount 组件将要卸载");
  }
  render() {
    console.log("子组件3 render");
    return (
      <div id="child-counter">
        <h5> 子组件 </h5> <div> {this.props.count} </div>
      </div>
    );
  }
}
class ChildCounter1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  /**
   * componentWillReceiveProps
   * 从组件的新属性中映射出一个状态
   * @param {*} nextProps
   * @param {*} prevState
   * @returns
   * getDerivedStateFromProps为什么要是静态的呢?
   * 应用场景: 收到父组件传来的状态是需要子组件做出什么状态变化的时候
   * 旧版本中在开发过程中很多时候程序员会在componentWillReceiveProps里面调用setState,很可能会让父组件刷新, 父组件一刷新,
   * 就会重新执行,很可能陷入死循环
   * static .不能掉this this.setState()就可以避免出现死循环
   * 单例模式肯定比实例模式节约资源
   * 单例所有的实例只有一份
   * 
   *getDerivedStateFromProps 返回的分状态对象会更自己的state进行合并
   如果返回null表示不修改状态
   不会幼年期组件的刷新
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps')
    const { count } = nextProps;
    console.log(this)
    if (count % 3 === 0) {
      return { number: 9999 };
    } else {
      return { number: 1111 };// getDerivedStateFromProps 返回的分状态对象会更自己的state进行合并
    }
  }
  render() {
    return <div>{this.state.number}</div>;
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
