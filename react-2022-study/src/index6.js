import React from "react";
import ReactDOM from "react-dom";
let ColorContext = React.createContext();
let BodyContext = React.createContext();
//{Provider,Consumer}
function changeStyle(color) {
  return { border: `5px solid ${color}`, padding: "5px" };
}
class Person extends React.Component {
  state = { color: "red" };
  chageColor = (color) => {
    this.setState({ color });
  };
  render() {
    let contextValue = {
      color: this.state.color,
      changeColor: this.chageColor,
    };
    let bodyValue = {
      color: 'yellow',
      changeColor: this.chageColor,
    };
    return (
      <ColorContext.Provider value={contextValue}>
        <div style={changeStyle(this.context.color)}>
          Person
          <Head> </Head>
          <BodyContext.Provider value={bodyValue}>
            <Body> </Body>
          </BodyContext.Provider>
        </div>
      </ColorContext.Provider>
    );
  }
}
class Head extends React.Component {
  static contextType = ColorContext;
  render() {
    return (
      <div style={changeStyle(this.context.color)}>
        HEAD <Eye> </Eye>
      </div>
    );
  }
}
class Eye extends React.Component {
  static contextType = ColorContext;

  render() {
    return <div style={changeStyle(this.context.color)}> EYE </div>;
  }
}
class Body extends React.Component {
  static contextType = BodyContext;

  render() {
    return (
      <div style={changeStyle(this.context.color)}>
        BODY <Arm> </Arm>
      </div>
    );
  }
}
class Arm extends React.Component {
  static contextType = ColorContext;

  render() {
    return (
      <div style={changeStyle(this.context.color)}>
        ARM
        <button onClick={() => this.context.changeColor("red")}>变红</button>
        <button onClick={() => this.context.changeColor("green")}>变绿</button>
      </div>
    );
  }
}
ReactDOM.render(<Person />, document.getElementById("root"));
