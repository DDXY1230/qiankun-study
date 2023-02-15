import { ShapeFlags,isString,isObject,isArray } from "@vue/shared"

export function createVNode(type, props,children = null) {
  // 可以根据type来区分组件还是普通元素

  // 根据type来区分 是元素还是组件
  const ShapeFlag = isString(type) ? 
  ShapeFlags.ELEMENT : isObject(type) ? 
  ShapeFlags.STATEFUL_COMPONENT : 0
  const vnode = {
    __v_isVnode: true,
    type,
    props,
    children,
    component: null,
    el: null,
    key: props && props.key,
    ShapeFlag
  }
  normalizeChildren(vnode,children)
  return vnode
}
function normalizeChildren(vnode, children) {
  let type = 0
  if(children == null) {
    // 不对儿子进行处理
  }else if(isArray(children)){
    type = ShapeFlags.ARRAY_CHILDREN
  }else {
    type = ShapeFlags.TEXT_CHILDREN
  }
  vnode.ShapeFlags |= type // 判断自己的类型和儿子的类型
}