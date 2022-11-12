// import logo from './logo.svg';
import './App.css';
import {Routes, Route,Link} from "react-router-dom"
import Cat from './pages/Cat.jsx'
import Dog from './pages/Dog.js'
function App() {
  return (
    <div className="App">
      <header className="App-header">
          这是qiankun-micro-app2
          <Link to={"/"}>app2主页</Link>
          <Link to={"/cat"}>小猫</Link>
          <Link to={"/dog"}>小狗</Link>
          <Routes>
            <Route path="/cat" element={<Cat/>}></Route>
            <Route path="/dog" element={<Dog/>}></Route>
          </Routes>
      </header>
    </div>
  );
}

export default App;
