import React from "react";
import ReactDOM from "react-dom";
// 高阶组件 不安装插件不能用装饰器必须要提前安装好, 安装教程在notebook里面的第3点
let widthLoading = (loadingMessage) => (OldComponent) => {
  console.log("loadingMessage", loadingMessage);
  return class extends React.Component {
    show = () => {
      let div = document.createElement("div");
      div.innerHTML = `<p id="loading" 
    style="position:absolute;top:100px;z-index:10;background-color:pink">
    这是message
    </p>`;
      document.body.appendChild(div);
    };
    hide = () => {
      document.getElementById("loading").remove();
    };
    render() {
      let extraProps = { show: this.show, hide: this.hide };
      return <OldComponent {...this.props} {...extraProps}></OldComponent>;
    }
  };
};
@widthLoading("加载中....")
class Hello extends React.Component {
  render() {
    return (
      <div>
        <p>hello</p>
        <button onClick={this.props.show}>显示</button>
        <button onClick={this.props.hide}>隐藏</button>
      </div>
    );
  }
}
ReactDOM.render(<Hello></Hello>, document.getElementById("root"));
