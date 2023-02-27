import React from "./react";
import ReactDOM from "./react-dom";
/**
 * 函数组件
 * React元素不但可以放dom元素,也可以是用户自定义的组件
 * 1. 自定义组件的名称必须首字母大写,为了跟原生的组件小写的区分
 * 2. 先定义,
 * 3. jsx必须只能有一个根元素
 * 4. 
 * @param {*} props 
 * @returns 
 */
function FunctionComponent(props) {
  return (
    <div className="title" style={{backgroundColor: 'green', color: 'red'}}>
      <span>{props.name}</span>
      {/* {props.children} */}
    </div>
  )
}
ReactDOM.render((<FunctionComponent name='lxm'>
<p>这个世界很残酷</p>
</FunctionComponent>), document.getElementById('root'))