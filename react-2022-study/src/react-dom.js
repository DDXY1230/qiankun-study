/**
 * 1.把虚拟DOM变成真实dom
 * 2.把虚拟DOM上的属性更新或者说同步到dom上
 * 3.把此虚拟DOM的子元素们也挂载到自己的dom上, dom.appendChild
 * 4.把自己挂载到容器上
 *
 */

import { REACT_TEXT } from "./constants";
import { addEvent } from "./event";

/**
 *
 * @param {*} vdom 要渲染的虚拟DOM
 * @param {*} container 要把虚拟DOM转换真实DOM后插入那个容器中去
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
  dom.componentDidMount && dom.componentDidMount();
}
/**
 * 把虚拟DOM变成一个真实DOM
 * @param {*} vdom
 */
export function createDOM(vdom) {
  // 如果vdom是数字或者字符串的话, 直接返回一个真实的文本节点
  // if (typeof vdom === "string" || typeof vdom === "number") {
  //   return document.createTextNode(vdom);
  // }

  // 否则 他就是一个vdom对象, 也就是react元素
  let { type, props,ref } = vdom;
  let dom = null;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      // 自定义的类组件
      dom = mountClassComponent(vdom);
    } else {
      // 自定义的函数组件
      dom = mountFunctionComponent(vdom);
    }
  } else {
    // 原声自定义组件
    dom = document.createElement(type);
  }

  // 使用虚拟DOM的属性更新刚创建出来的真实DOM的属性
  updateProps(dom, props);
  // 在这里处理props.children属性
  if (
    typeof props.children === "string" ||
    typeof props.children === "number"
  ) {
    // 如果只有一个儿子, 并且这个儿子是文本
    dom.textContent = props.children;
  } else if (typeof props.children === "object" && props.children.type) {
    // 如果只有一个儿子,并且是vdom , 递归
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    // 兜底的
    document.textContent = props.children ? props.children.toString() : "";
  }
  // 把真实dom挂到虚拟dom上,为以后的更新做准备
  // vdom.dom = dom;
  if(ref) { // 通过虚拟dom创建真实dom之后, 虚拟dom的ref属性的current属性等于真实dom
    ref.current = dom
  }
  return dom; // 真实dom节点
}

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDOM);
  }
}
/**
 *
 * @param {*} dom 真实DOM
 * @param {*} newProps 新属性
 */
function updateProps(dom, newProps) {
  for (let key in newProps) {
    if (key === "children") continue; // children 单独处理,不在此处理
    if (key === "style") {
      let styleObj = newProps.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith("on")) {
      // 给真实dom加事件 原生事件是onclick 所以要小写
      // dom[key.toLocaleLowerCase()] = newProps[key]
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      // 原生dom.className=‘title’写法
      dom[key] = newProps[key];
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
  let { type: FunctionComponent, props } = vdom;
  let oldRenderVdom = FunctionComponent(props);
  vdom.renderVdom = oldRenderVdom;
  return createDOM(oldRenderVdom);
  // 返回一个真实dom
  // return dom
}
/**
 *
 * @param {*} vdom 自定义类组件
 */
function mountClassComponent(vdom) {
  // 解构类的定义和类的属性对象
  let { type, props } = vdom;
  // 创建类的实例
  let classInstance = new type(props);
  vdom.classInstance = classInstance;
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  // 调用实例的render方法返回要渲染的虚拟dom对象
  let renderVdom = classInstance.render();
  // 根据虚拟DOM对象创建真实的DOM对象
  // 把将要渲染的虚拟dom添加到类的实例上去
  classInstance.oldRenderVdom = renderVdom;
  vdom.oldRenderVdom = renderVdom;
  let dom = createDOM(renderVdom);
  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind();
  }
  // 为以后类组件的更新,把真实dom挂载到了类的实例上
  classInstance.dom = dom;
  vdom.dom = dom;
  return dom;
}
/**
 * 对当前组件进行DOM_DIFF
 * @param {*} parentDOM 当前组件挂载真实的dom节点
 * @param {*} oldVdom 上一次老的虚拟DOM
 * @param {*} newVdom 这一次新的虚拟DOM
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  // 如果老的新的都没有不需要渲染
  if (!oldVdom && !newVdom) {
    return;
  } else if (oldVdom && !newVdom) {
    // 直接干掉老的
    let currentDOM = findDOM(oldVdom); // 找到虚拟dom对应的真实dom
    if (currentDOM) {
      parentDOM.removeChild(currentDOM);
    }
    if (oldVdom.classInstance && oldVdom.classInstance.componentwillUnMount) {
      oldVdom.classInstance.componentwillUnMount();
    }
  } else if (!oldVdom && newVdom) {
    // 进行添加操作
    let newDOM = createDOM(newVdom);
    if (nextDOM) {
      parentDOM.insertBefore(newDOM, nextDOM);
    } else {
      parentDOM.appendChild(newDOM);
    }
    if (oldVdom.classInstance && oldVdom.classInstance.componentwillUnMount) {
      oldVdom.classInstance.componentwillUnMount();
    }
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    // 新老都有但是类型不一样
    let oldDOM = findDOM(oldVdom); // 拿到老的真实dom
    let newDOM = createDOM(newVdom); // 拿到新的真实dom
    parentDOM.replaceChild(newDOM, oldDOM);
    if (oldVdom.classInstance && oldVdom.classInstance.componentwillUnMount) {
      oldVdom.classInstance.componentwillUnMount();
    }
  } else if (oldVdom && newVdom && oldVdom.type === newVdom.type) {
    // 新老都有,类型也一样, 进行深度的diff
    updateElement(oldVdom, newVdom);
  }
}
/**
 * 新老都有,类型也一样, 进行深度的diff
 *
 * @param {*} oldVdom
 * @param {*} newVdom
 */
function updateElement(oldVdom, newVdom) {
  if(oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    let currentDOM = newVdom.dom = oldVdom.dom;// 直接复用旧的
    currentDOM.textContent = newVdom.props.content; // 直接修改
  }else if (typeof oldVdom.type === "string") {
    let currentDOM = (newVdom.dom = oldVdom.dom); // 复用老的dom节点
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  }else if(typeof oldVdom.type === 'function') {
    if(oldVdom.type.isReactComponent) {
      newVdom.classInstance = oldVdom.classInstance;
      newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
      updateClassComponent(oldVdom, newVdom) //老的和旧的都是类组件,进行类组件更新
    }else {
      updateFunctionComponent(oldVdom, newVdom) // 老的和新的都是函数逐渐,进行函数组件更新
    }
  }
}
function updateFunctionComponent(oldVdom, newVdom) {
  let parentDOM = findDOM(oldVdom).parentNode
  let { type, props } = newVdom
  let newRenderVdom = type(props)
}
/**
 * 如果老的虚拟dom和新的虚拟dom都是类组件的话, 走这个更新逻辑
 * @param {*} oldVdom 
 * @param {*} newVdom 
 */
function updateClassComponent(oldVdom, newVdom){
  let classInstance = newVdom.classInstance = oldVdom.classInstance; // 类的实例需要复用, 类的实例不管更新多少次只有一个
  newVdom.oldRenderVdom = oldVdom.oldRenderVdom; // 上一次的这个类组件的渲染出来的虚拟dom
  if(classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps()
  }
  classInstance.updater.emitUpdate(newVdom.props)
}
function updateChildren(parentDOM, oldVChildren, newVChildren) {
  // 因为children可能是对象, 也可能是数组, 为了方便按照索引比较, 全部格式化为数组
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i]);
  }
}
/**
 * 查找此虚拟dom对应的真实dom
 * @param {*} vdom
 */
function findDOM(vdom) {
  let { type } = vdom;
  let dom;
  if (typeof type == "function") {
    dom = findDOM(vdom.oldRenderVdom);
  } else {
    dom = vdom.dom;
  }
}
/**
 *
 */
const ReactDOM = {
  render,
};

export default ReactDOM;
