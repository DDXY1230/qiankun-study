import React from "react";
import ReactDOM from "react-dom";
let ColorContext = React.createContext();
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
    return (
      <ColorContext.Provider value={contextValue}>
        <div style={changeStyle(this.context.color)}>
          Person
          <Head> </Head>
          <Body> </Body>
        </div>
      </ColorContext.Provider>
    );
  }
}
class Head extends React.Component {
  static contextType = ColorContext;
  // contextType 和 this.context属性是内部定死的
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
  static contextType = ColorContext;

  render() {
    return (
      <div style={changeStyle(this.context.color)}>
        BODY <Arm> </Arm>
      </div>
    );
  }
}
function Arm(props) {
  return (
    <ColorContext.Consumer >
      {(contextValue) => (
        <div style={changeStyle(contextValue.color)}>
          ARM
          <button onClick={() => contextValue.changeColor("red")}>变红</button>
          <button onClick={() => contextValue.changeColor("green")}>变绿</button>
        </div>
      )}
    </ColorContext.Consumer>
  );
}
// class Arm extends React.Component {
//   static contextType = ColorContext;

//   render() {
//     return (
//       <div style={changeStyle(this.context.color)}>
//         ARM
//         <button onClick={() => this.context.changeColor("red")}>变红</button>
//         <button onClick={() => this.context.changeColor("green")}>变绿</button>
//       </div>
//     );
//   }
// }
ReactDOM.render(<Person />, document.getElementById("root"));
