import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <a href="/micro-app1">#micro-app1</a> */}
      <Link to={"/"}>主应用</Link><span style={{'padding':'10px'}}></span>
      <a href="/micro-app2">#micro-app2</a><span style={{'padding':'10px'}}></span>
      <Link to="/micro-app2/cat">app2的小猫</Link><span style={{'padding':'10px'}}></span>
      <Link to="/micro-app2/dog">app2的小狗</Link><span style={{'padding':'10px'}}></span>
      <a href="/micro-app3">#micro-app3</a><span style={{'padding':'10px'}}></span>
      <a href="/micro-app4">#micro-app4</a><span style={{'padding':'10px'}}></span>
      <Link to="/micro-app4">app4的home</Link><span style={{'padding':'10px'}}></span>
      <Link to="/micro-app4/about">app2的about</Link><span style={{'padding':'10px'}}></span>

     <div id="bigBox"></div>
    </div>
  );
}

export default App;
