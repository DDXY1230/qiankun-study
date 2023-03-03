// import { Route, Link } from "react-router-dom";

// import Home from "./components/Home";
// import Counter from "./components/Counter";
// import { ConnectedRouter } from "connected-react-router";
// import history from "./history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from './store'
import App from './App'
ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>,
  document.getElementById("root")
);
