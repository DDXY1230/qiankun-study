/**
 * hooks 可以让您在不变写class的情况下使用state 以及其他的React特性
 * useState 有全局变量,但是在调函数的时候内部使用了闭包保留值
 * hooks让状态在多次渲染的时候的到保留
 * hooks不能用在if和for循环中红, 因为放着里面,每次渲染他的索引会发生变化
 * 
 * 其实在原本代码里每个组件有自己的hookState, 所以有自己的index和数组,放到了fiber里面
 * 所以有时候隐藏真个组件不会影响useState错位,但是在同一个组件中放在if里面就会错位
 * 
 * react每次更新都是从根节点开始,这也是react性能低的一个原因,所以搞出了一个fiber的原因
 * fiber的核心是要diff工作可以暂停,
 * react每次都要从根节点把整个应用比较一遍
 * 

   同步才是hooks的思维方式
   每次渲染都是一个独立的闭包
 */
import React from "react";
import ReactDOM from "react-dom";
function App() {
  // let [number, setNumber] = React.useState(0) // 括号里的是默认值
  let [number, setNumber] = React.useState(()=>0) // 括号里的是默认值 也可以放一个有返回值的函数
  // useState里面放函数主要是可以实现惰性初始化

  const delayAddNumber = () => {
    console.log(number)
    setTimeout(() => {
      setNumber(number + 1)
      setNumber(number=>number+1)// 老版本这里要写函数成同步更新,否则取的是0开始更新
    }, 1000)
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+1</button>
      <button onClick={delayAddNumber}>setTimeout+1</button>
    </div>
  )
}
ReactDOM.render(<App/>, document.getElementById('root'))