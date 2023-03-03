import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Routes,Link } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";
import Profile from "./components/Profile";
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
