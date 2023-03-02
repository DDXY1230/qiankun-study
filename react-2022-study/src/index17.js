import React from "react";
import ReactDOM from "react-dom";
/**
 * useEffect
 * 默认情况下可以写副作用代码定时器,延时器等
 * 默认情况下,每次渲染完成后都会执行
 * 副作用有哪些: 比如修改全局变量 开启定时器等  调用接口 调数据库
 * 第二个参数是依赖数组,
 * 如果依赖数组是空的话,只会执行一次
 * 
 * 
 * 副作用相对于纯函数来说的
 * 纯函数: 相同的输入永远的到相同的输出,  不能修改本函数作用域之外的变量
 * 
 * 
 * 
 * userLayoutEffect + useRef
 * 其函数签名与useEffect相同, 但它会在所有的dom变更之后同步调用effect
 * useEffect不会阻塞浏览器渲染, 而useLaoutEffect会阻塞浏览器渲染
 * useEffect会在浏览器渲染结束后执行, useLayoutEffect则是在dom更新完成后,浏览器绘制之前执行
 */
function Counter() {
  const [number, setNumber] = React.useState(0);
  // 方法一就是在后面加空数组
  React.useEffect(() => {
    console.log('开启一个定时器')
    const $timer = setInterval(() => {
      setNumber(number => number+1)
    }, 1000)
  },[])// 依赖没有发生变化只执行一次
  // 方法二就是userEffect执行完后可以返回一个销毁函数 在销毁函数中将定时器清除
  // React.useEffect(() => {
  //   console.log('开启定时器')
  //   const $timer = setInterval(() => {
  //     setNumber(number => number + 1)
  //   },1000)
  //   return () => {
  //     console.log('关闭定时器') // 卸载的时候走这个函数逻辑,相当于componentWillUnmount
  //     clearInterval($timer)
  //   }
  // })
  console.log('Counter')
  return (
    <div>
      <p>Counter: {number}</p>
    </div>
  )
}
ReactDOM.render(<Counter/>, document.getElementById('root'))