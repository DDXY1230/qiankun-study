import React from "react";
import ReactDOM from "react-dom";

/* 
反向继承
 */
class Button extends React.Component {
  state = { name: "张三" };
  componentWillMount() {
    console.log("Button-1 componentWillMount");
  }
  componentDidMount() {
    console.log("Button-1 componentDidMount");
  }
  render(h) {
    console.log("Button-1 render");
    console.log('这里的this', this) // 如果被继承了,this就是子类的实例
    return <button name={this.state.name} title={this.props.title}>这是一个按钮</button>;
  }
}
const wrap = (Button) => {
  return class WrapButton extends Button {
  state = {number: 100}
    componentWillMount() {
      console.log("WrapButton-2 componentWillMount");
      super.componentWillMount()
    }
    componentDidMount() {
      console.log("WrapButton-2 componentDidMount");
      super.componentDidMount()
    }
    add = () =>{
      this.setState({number: this.state.number+1})
    }
    render() {
      console.log("NewComponent-2");
      let superRenderElement = super.render();
      let renderElement = React.cloneElement(superRenderElement, 
      {onClick: this.add}, this.state.number) // 第三个参数是子元素内容
      return renderElement;
      // return superRenderElement
    }
  };
};
let WrapButton = wrap(Button)
ReactDOM.render(<WrapButton title="标题" />, document.getElementById("root"));
