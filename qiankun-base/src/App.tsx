import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" id="root">
      <header className="App-header">
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
      </header>
      <a href="/micro-app1">#micro-app1</a>
      <a href="/micro-app2">#micro-app2</a>
      <a href="/micro-app3">#micro-app3</a>
      <a href="/micro-app4">#micro-app4</a>
     <div id="bigBox"></div>
    </div>
  );
}

export default App;
