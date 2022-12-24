import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <fc-bubbles click>
      {/* //fc-bubbles 不能驼峰命名,不需要驼峰命名 */}
        <img src={logo} className="App-logo" alt="logo" />
      </fc-bubbles>
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
    </div>
  );
}

export default App;
