import { ShapeFlags } from '@vue/shared';
export const createComponentInstance = function (vnode) {
  const instance = {// 组件实例
    vnode,
    type: vnode.type,
    props: {},
    attrs: {},
    slots: {},
    ctx: {},
    setupState: {},
    render: null,
    isMounted: false
  }
  instance.ctx = { _: instance }
  return instance
}
export const setupComponent = function (instance) {
    const { props,children } = instance.vnode;
    // 根据props解析出props和attrs, 将其放到instance
    instance.props = props // iniProps
    instance.children = children // 插槽的解析
    // 需要先看一下,当前组件是不是有状态的组件
    console.log('instance',instance)
    let isStateful = instance.vnode.ShapeFlag & ShapeFlags.STATEFUL_COMPONENT
    console.log('isStateful', isStateful)
    if(isStateful) {
      // 一个带状态的组件
      // 调用当前实例setup的方法, 用setup的返回值填充setupState和对应的render方法
      setupStatefulComponent(instance)
    }
}
function setupStatefulComponent(instance) {
  // 1.代理 传递给render函数的参数

  // 2.获取组件的类型
  let Component = instance.type 
  let {setup} = Component 
  let setupContext = createContext(instance)
  setup(instance.props,setupContext)
}
function createContext(instance) {
  return {
    attrs: instance.attrs,
    props: instance.props,
    slots: instance.slots,
    emit: () => {},
    expose: () => {}
  }
}