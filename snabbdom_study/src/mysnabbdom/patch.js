import createElement from "./createElement";
import vnode from "./vnode";

export default function(oldVnode,newVnode) {
  // 判断第一个参数是虚拟节点还是dom节点
  if(oldVnode.sel == '' || oldVnode.sel == undefined) {
    //将真实dom转换为虚拟dom
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {},[],undefined,oldVnode)
  }
  console.log(oldVnode,newVnode)
  // 判断oldVnode 和 newVnode是不是同一个节点
  if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    console.log('是同一个节点')

  }else {
    console.log('不是同一个节点')
    let newVnodeElm = createElement(newVnode)
    if(oldVnode.elm.parentNode != undefined && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
  }
}