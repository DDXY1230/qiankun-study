import React from "react";
import ReactDOM from "react-dom";
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  };
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        <h1>移动鼠标</h1>
        <p>
          当前的鼠标位置: x: {this.state.x} ; y: {this.state.y}
        </p>
        {this.props.render(this.state)}
      </div>
    );
  }
}

ReactDOM.render(
  <MouseTracker
    name="lxm"
    render={(props) => (
      <div>
        <h1>移动鼠标</h1>
        <p>
          当前的鼠标位置: x: {props.x} ; y: {props.y}
        </p>
      </div>
    )}
  >
    <p>这个世界很残酷</p>
  </MouseTracker>,
  document.getElementById("root")
);
