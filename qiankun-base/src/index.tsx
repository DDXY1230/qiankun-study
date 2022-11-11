import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun'
registerMicroApps([
  {
    name: 'qiankun-app1',
    entry: '//localhost:3011',
    container: '#micro-app1',
    activeRule:'micro-app1',
    props: {// props里面是不能写name上面出现过的关键字
      nickname: '最爱白菜app1'
    }
  },
  {
    name:'qiankun-app2',
    entry: '//localhost:3012',
    container: '#micro-app2',
    activeRule: 'micro-app2',
    props: {// props里面是不能写name上面出现过的关键字  向子应用传值
      nickname: '最爱萝卜app2'
    }
  },
  {
    name:'qiankun-app3',
    entry: '//localhost:3013',
    container: '#micro-app3',
    activeRule: 'micro-app3',
    props: {// props里面是不能写name上面出现过的关键字
      nickname: '最爱萝卜app3'
    }
  }
])
start()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
