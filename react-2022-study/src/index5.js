import React from "react";
import ReactDOM from "react-dom";
//getSnapshotBeforeUpdate会在dom更新前执行, 可以用来获取
//更新前的一些dom信息,这个钩子函数在写动画过渡特性的时候用的很方便
let number = 0;
class Counter extends React.Component {
  ulRef = React.createRef()
  state = { number: 0, list: [] };
  getSnapshotBeforeUpdate() {
    //getSnapshotBeforeUpdate会在dom更新前执行, 可以用来获取更新前的一些dom信息
    let scrollH = this.ulRef.current.scrollHeight;
    console.log(scrollH)
    // return number++;
    return scrollH
  }
  componentDidUpdate(prevProps, prevState, number) {
    console.log(prevProps, prevState, number);
    let currentH = this.ulRef.current.scrollHeight - number
    console.log('本次增加的高度', currentH)
  }
  handleClick = () => {
    let list = this.state.list
    list.push(list.length)
    this.setState({ number: this.state.number + 1, list});
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <ul ref={this.ulRef}>

        {this.state.list.map((item, index) => (
          <li key={index}>
            {index}-{item}
          </li>
        ))}
        </ul>

      </div>
    );
  }
}
let element = <Counter />;
ReactDOM.render(element, document.getElementById("root"));
