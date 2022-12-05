export default function createElement(vnode) {
  console.log("🚀 ~ file: createElement.js ~ line 2 ~ function ~ vnode", vnode)
  // 目的是将vnode插入到标杆节点pivot之前
  let domNode = document.createElement(vnode.sel)
  if(vnode.text != '' && 
  (vnode.children == undefined || vnode.children.length == 0)
  ){
    domNode.innerText = vnode.text
    vnode.elm = domNode
  }else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 有很多子节点
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i]
      console.log('ch==> ', ch)
      let chDOM = createElement(ch)
      domNode.appendChild(chDOM)
    }
  }
  vnode.elm = domNode
  // 返回elm, elm属性是一个纯dom对象
  return vnode.elm
}