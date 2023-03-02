import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Routes,Link } from "react-router-dom";
import Home from "./component/Home";
import User from "./component/User";
import Profile from "./component/Profile";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </Router>
  )
}
ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
