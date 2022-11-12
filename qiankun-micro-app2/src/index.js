import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom'

// import "./public-path";
const root = !window.__POWERED_BY_QIANKUN__ ? ReactDOM.createRoot(document.getElementById("root")) : ReactDOM.createRoot(document.getElementById("bigBox"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

function render(props) {
  console.log('15======', props)
  const { container } = props;
  root.render(
    <React.StrictMode>
      <BrowserRouter
      basename={window.__POWERED_BY_QIANKUN__ ? "/micro-app2" : '/'}
      >
      <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  // ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}

export async function mount(props) {
  console.log('=================34', props)
  // 更新数据
  props.onGlobalStateChange((state, prev) => {
    console.log('============37',state, prev)
    if(state.name2 !== 'app2传过来的'){
      props.setGlobalState({...state,name2: 'app2传过来的'})
    }
  })

  console.log("[react16] props from main framework", props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
