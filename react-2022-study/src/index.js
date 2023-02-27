/*
 * @Author: DDXY1230 2502752288@qq.com
 * @Date: 2023-02-27 14:15:41
 * @LastEditors: DDXY1230 2502752288@qq.com
 * @LastEditTime: 2023-02-27 17:44:08
 * @FilePath: /qiankun/react-2022-study/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import React from 'react';
// import ReactDom from 'react-dom';
import React from './react';
import ReactDOM from './react-dom';
let element1 = <h1 
id="title-1"
htmlFor="inputTitle"
className='title'
style={{color: 'red'}}>这个是标题</h1>
let element2 = React.createElement('h1', {
  id: 'title',
}, 'hello', 'world')
let element5 = (
  <div className='title' style={{color: 'red'}}><span>hello</span>world</div>
)
ReactDOM.render(element2, document.getElementById('root'))

// jsx 编译成creact Element是在webpack编译的时候, 也就是打包的时候执行的
// ReactDom.render(<h1>hello</h1>, document.getElementById('root'))
// render 方法会把虚拟dom变成真实dom插入到容器中去
/* 
jsx的属性和表达式
1.backgroundColor 驼峰命名
2.class => className
3.for => htmlFor
4. style => 对象
5.jsx其实也是一个对象
6. jsx 赋值给变量 可以作为方法的返回值 可以作为一个参数
7. react只会更新变化的部分,如果没有变就不会更新
 */
//-----------------------
//5.jsx其实也是一个对象
function greeting(name) {
  if(name) {
    return <h2>hello,{name}</h2>
  }else {
    return <h2>hello,Strainger</h2>
  }
}
let element3 = greeting('李四')
//------------------------
let names = ['张三', '李四', '王五']
let element4 = names.map((name, index) => (<li key={index}>{name}</li>))
//------------------------

// function tick() {
//   const element = (
//     <div>
//       {new Date().toLocaleDateString()}
//     </div>
//   )
//   ReactDom.render(element, document.getElementById('root'))
// }
// setInterval(tick, 1000);
//---------------------------

