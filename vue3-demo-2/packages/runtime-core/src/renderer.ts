import { createAppAPI } from "./apiCreateApp"
import { ShapeFlags } from "@vue/shared"
import {createComponentInstance,setupComponent } from './component'


export function createRenderer(rendererOption) {// 告诉core  怎么渲染
  const setupRenderEffect = () => {

  }
  const mountComponent = (initialVnode, container) => {// 挂载组件
    console.log('初始化', initialVnode, container)
    // 组件的渲染流程 最核心的是调用setup 拿到返回值,获取render函数返回的结果进行渲染
    // 1.先有实例
    const instance = initialVnode.component = createComponentInstance(initialVnode)
    // 2.需要的数据解析到实例上面去
    setupComponent(instance)
    // 3.创建一个effect让render函数执行
    setupRenderEffect()

  }
  const processComponent = (n1, n2, container) => {
    if (n1 == null) {// 组件没有上次的虚拟节点 初始化过程
      mountComponent(n2, container)
    } else { // 组件更新

    }
  }
  const patch = (n1, n2, container) => {
    // 针对不同类型做初始化操作
    const { ShapeFlag } = n2;
    if (ShapeFlag & ShapeFlags.ELEMENT) {
      console.log('n2是元素')
    } else if (ShapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      console.log('n2是一个组件')
      processComponent(n1, n2, container)
    }
  }
  const render = (vnode, container) => {
    // 核心 core  根据不同的虚拟节点创建对应的真实元素

    patch(null, vnode, container)
  }
  return {
    createApp: createAppAPI(render)
  }
}