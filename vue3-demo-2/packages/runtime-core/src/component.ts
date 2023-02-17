import { ShapeFlags, isFunction, isObject } from '@vue/shared';
import { PublicInstanceProxyHandlers } from './componentPublicInstance'
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
  const { props, children } = instance.vnode;
  // 根据props解析出props和attrs, 将其放到instance
  instance.props = props // iniProps
  instance.children = children // 插槽的解析
  // 需要先看一下,当前组件是不是有状态的组件
  console.log('instance', instance)
  let isStateful = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
  console.log('isStateful', isStateful)
  if (isStateful) {
    // 一个带状态的组件
    // 调用当前实例setup的方法, 用setup的返回值填充setupState和对应的render方法
    setupStatefulComponent(instance)
  }
}
function setupStatefulComponent(instance) {
  // 1.代理 传递给render函数的参数
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers as any)
  // 2.获取组件的类型
  let Component = instance.type
  let { setup } = Component
  if (setup) {
    let setupContext = createContext(instance)
    const setupResult = setup(instance.props, setupContext)// instance中props attrs slots emit
    handleSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance);// 完成组件的启动
  }
  // expose会被提取出来 因为在开发中会使用
  Component.render(instance.proxy)
}
function handleSetupResult(instance, setupResult) {
  console.log('handleSetupResult', instance)
  // 处理setup返回值
  if (isFunction(setupResult)) {
    instance.render = setupResult
  } else if (isObject(setupResult)) {
    instance.setupState = setupResult
  }
    finishComponentSetup(instance);// 完成组件的启动
}
function finishComponentSetup(instance) {
  console.log('finishComponentSetup', instance)
  const Component = instance.type
  if (!instance.render) {
    // 对template模版进行编译, 产生render函数 需要将生成render函数放在实例上
    if(!Component.render && Component.template) {
      // 编译将结果赋予给Component.render
    }
    instance.render = Component.render
  }

}
function createContext(instance) {
  return {
    attrs: instance.attrs,
    props: instance.props,
    slots: instance.slots,
    emit: () => { },
    expose: () => { }
  }
}