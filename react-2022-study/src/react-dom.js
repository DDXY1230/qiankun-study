/**
 * 1.把虚拟DOM变成真实dom
 * 2.把虚拟DOM上的属性更新或者说同步到dom上
 * 3.把此虚拟DOM的子元素们也挂载到自己的dom上, dom.appendChild
 * 4.把自己挂载到容器上
 * 
 */

import { addEvent } from "./event";

/**
 * 
 * @param {*} vdom 要渲染的虚拟DOM
 * @param {*} container 要把虚拟DOM转换真实DOM后插入那个容器中去
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom)
}
/**
 * 把虚拟DOM变成一个真实DOM
 * @param {*} vdom 
 */
export function createDOM(vdom) {
  // 如果vdom是数字或者字符串的话, 直接返回一个真实的文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  // 否则 他就是一个vdom对象, 也就是react元素
  let {
    type,
    props
  } = vdom;
  let dom = null

  if (typeof type === 'function') {
    if(type.isReactComponent) {
    // 自定义的类组件
      dom =  mountClassComponent(vdom)
    }else {
    // 自定义的函数组件
      dom = mountFunctionComponent(vdom)
    }
  } else {
    // 原声自定义组件
    dom = document.createElement(type)
  }

  // 使用虚拟DOM的属性更新刚创建出来的真实DOM的属性
  updateProps(dom, props)
  // 在这里处理props.children属性
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    // 如果只有一个儿子, 并且这个儿子是文本
    dom.textContent = props.children
  } else if (typeof props.children === 'object' && props.children.type) {
    // 如果只有一个儿子,并且是vdom , 递归
    render(props.children, dom)
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom)
  } else {
    // 兜底的
    document.textContent = props.children ? props.children.toString() : ''
  }
  // 把真实dom挂到虚拟dom上,为以后的更新做准备
  console.log(vdom)
  // vdom.dom = dom;
  return dom // 真实dom节点
}

function reconcileChildren(childrenVdom, parentDom) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDom)
  }
}
/**
 * 
 * @param {*} dom 真实DOM
 * @param {*} newProps 新属性 
 */
function updateProps(dom, newProps) {
  for (let key in newProps) {
    if (key === 'children') continue // children 单独处理,不在此处理
    if (key === 'style') {
      let styleObj = newProps.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr]
      }
    }else if(key.startsWith('on')){
      // 给真实dom加事件 原生事件是onclick 所以要小写
      // dom[key.toLocaleLowerCase()] = newProps[key]
      addEvent(dom, key.toLocaleLowerCase(),newProps[key])
    }
    else { // 原生dom.className=‘title’写法
      dom[key] = newProps[key]
    }
  }

}
/**
 * 
 * @param {*} vdom 自定义函数组件
 * @returns 
 */
function mountFunctionComponent(vdom) {
  // 挂载函数组件
  let {type: FunctionComponent, props} = vdom
  let renderVdom = FunctionComponent(props)
  return createDOM(renderVdom)
  // 返回一个真实dom
  // return dom 
}
/**
 * 
 * @param {*} vdom 自定义类组件
 */
function mountClassComponent(vdom) {
  // 解构类的定义和类的属性对象
  let {type, props} = vdom
  // 创建类的实例
  let classInstance = new type(props);
  // 调用实例的render方法返回要渲染的虚拟dom对象
  let renderVdom = classInstance.render();
  // 根据虚拟DOM对象创建真实的DOM对象
  let dom = createDOM(renderVdom);
  // 为以后类组件的更新,把真实dom挂载到了类的实例上
  classInstance.dom = dom
  return dom
}
/**
 * 
 */
const ReactDOM = {
  render
}

export default ReactDOM