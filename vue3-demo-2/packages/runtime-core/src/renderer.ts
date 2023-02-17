import { createAppAPI } from "./apiCreateApp"
import { ShapeFlags, isObject } from "@vue/shared"
import { createComponentInstance, setupComponent } from './component'
import { effect } from "@vue/reactivity"
import { Text, normalizeVNode } from "./vnode"
import { queueJob } from "./scheduler"


export function createRenderer(rendererOption) {// 告诉core  怎么渲染

  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
  } = rendererOption
  const setupRenderEffect = (instance, container) => {
    effect(function componentEffect() {
      // 每个组件都有一个effect vue3是组件级别更新, 数据变化重新执行对应组件的effect
      if (!instance.isMounted) {
        let proxyToUse = instance.proxy;
        let subtree = instance.subtree = instance.render.call(proxyToUse, proxyToUse)
        patch(null, subtree, container)
        instance.isMounted = true
      } else {
        // 更新逻辑
        console.log('走到更新逻辑里面来了')
      }
    }, {
      scheduler: queueJob
    })
  }
  const mountComponent = (initialVnode, container) => {// 挂载组件
    console.log('初始化', initialVnode, container)
    // 组件的渲染流程 最核心的是调用setup 拿到返回值,获取render函数返回的结果进行渲染
    // 1.先有实例
    const instance = (initialVnode.component = createComponentInstance(initialVnode))
    // 2.需要的数据解析到实例上面去
    setupComponent(instance)
    // 3.创建一个effect让render函数执行
    setupRenderEffect(instance, container)

  }
  const processComponent = (n1, n2, container) => {
    if (n1 == null) {// 组件没有上次的虚拟节点 初始化过程
      mountComponent(n2, container)
    } else { // 组件更新

    }
  }
  const processElement = (n1, n2, container) => {
    // 
    if (n1 == null) {
      //元素初始化
      mountElement(n2, container)
    } else {
      // 元素更新
    }
  }
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      let child = normalizeVNode(children[i])
      patch(null, child, container)
    }
  }
  const mountElement = (vnode, container) => {
    // 递归渲染
    const { props, shapeFlag, type, children } = vnode;
    let el = (vnode.el = hostCreateElement(type))
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el)
    }
    hostInsert(el, container)

  }
  // 《-------------------处理文本-------------
  const processText = (n1,n2,container) => {
    if(n1 == null) {
      hostInsert(hostCreateText(n2.children), container)
    }else {
      // 元素更新
    }
  }
  
  // -------------------处理文本-------------》

  const patch = (n1, n2, container) => {
    // 针对不同类型做初始化操作
    const { shapeFlag, type } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container)
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // console.log('n2是元素')
          processElement(n1, n2, container)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // console.log('n2是一个组件')
          processComponent(n1, n2, container)
        }
        break
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