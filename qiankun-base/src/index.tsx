import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun'
//
import {initGlobalState,MicroAppStateActions} from 'qiankun'
const state = {
  nickname: '芒果',
  name1: '苹果',
  name2: '柑橘'
}
// 初始化state
const actions: MicroAppStateActions = initGlobalState(state)
actions.onGlobalStateChange((state, prev) => {
  //state:变化后的状态,prev:变化前的状态
  console.log('=========18',state, prev)
})
setTimeout(() => {
  actions.setGlobalState({...state,person:'主应用传给子应用的数据'});
},2000)
actions.offGlobalStateChange()


registerMicroApps([
  // {
  //   name: 'qiankun-app1',
  //   entry: '//localhost:3011',
  //   container: '#root',
  //   activeRule:'micro-app1',
  //   props: {// props里面是不能写name上面出现过的关键字
  //     nickname: '最爱白菜app1'
  //   }
  // },
  {
    name:'qiankun-app2',
    entry: '//localhost:3012',
    container: '#bigBox',
    activeRule: 'micro-app2',
    props: {// props里面是不能写name上面出现过的关键字  向子应用传值
      nickname: '最爱萝卜app2'
    }
  },
  {
    name:'qiankun-app3',
    entry: '//localhost:3013',
    container: '#bigBox',
    activeRule: 'micro-app3',
    props: {// props里面是不能写name上面出现过的关键字
      nickname: '最爱萝卜app3'
    }
  },
  {
    name:'qiankun-vue3-1',
    entry: '//localhost:3014',
    container: '#root',
    activeRule: 'micro-app4',
    props: {// props里面是不能写name上面出现过的关键字
      nickname: '最爱萝卜app4'
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
