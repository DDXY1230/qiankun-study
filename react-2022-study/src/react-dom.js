/**
 * 1.把虚拟DOM变成真实dom
 * 2.把虚拟DOM上的属性更新或者说同步到dom上
 * 3.把此虚拟DOM的子元素们也挂载到自己的dom上, dom.appendChild
 * 4.把自己挂载到容器上
 * 
 */
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
function createDOM(vdom) {
  // 如果vdom是数字或者字符串的话, 直接返回一个真实的文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  // 否则 他就是一个vdom对象, 也就是react元素
  let {
    type,
    props
  } = vdom;
  let dom = document.createElement(type)
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
  vdom.dom = dom;
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
    } else { // 原生dom.className=‘title’写法
      dom[key] = newProps[key]
    }
  }

}
/**
 * 
 */
const ReactDOM = {
  render
}

export default ReactDOM