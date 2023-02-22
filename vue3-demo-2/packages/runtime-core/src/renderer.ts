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
    nextSibling: hostNextSibling
  } = rendererOption
  const setupRenderEffect = (instance, container) => {
    effect(function componentEffect() {
      // 每个组件都有一个effect vue3是组件级别更新, 数据变化重新执行对应组件的effect
      if (!instance.isMounted) {
        let proxyToUse = instance.proxy;
        let subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse)
        patch(null, subTree, container)
        instance.isMounted = true
      } else {
        // 更新逻辑  
        console.log('走到更新逻辑里面来了')
        // diff 算法
        // 组件库
        // 更新逻辑
        const prevTree = instance.subTree
        let proxyToUse = instance.proxy;

        const nextTree = instance.render.call(proxyToUse, proxyToUse)
        // console.log('两棵树', prevTree,nextTree)
        patch(prevTree, nextTree, container)

      }
    }, {
      scheduler: queueJob
    })
  }
  const mountComponent = (initialVnode, container) => {// 挂载组件
    // console.log('初始化', initialVnode, container)
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
  const processElement = (n1, n2, container, anchor) => {
    // 
    if (n1 == null) {
      //元素初始化
      mountElement(n2, container, anchor)
    } else {
      // 元素更新
      patchElement(n1, n2, container)
    }
  }
  const patchProp = (oldProps, newProps, el) => {
    if (oldProps !== newProps) {
      for (let key in newProps) {
        const prev = oldProps[key]
        const next = newProps[key]
        if (prev !== next) {
          hostPatchProp(el, key, prev, next)
        }
      }
      for (let key in oldProps) {
        if (!(key in newProps)) {
          hostPatchProp(el, key, oldProps[key], null)
        }
      }
    }

  }
  const unmountChildren = (children) => {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i])
    }
  }
  const patchKeyedChildren = (c1, c2, el) => {
    let i = 0; // 默认从头开始比较
    let e1 = c1.length - 1;
    let e2 = c2.length - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i];
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      i++
    }
    while (i <= el && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      e1--;
      e2--;
    }
    if (i > e1) {// 老得少, 新的多
      if (i <= e2) {
        // 表示有新增的部分
        while (i <= e2) {
          const nextPos = e2 + 1
          const anchor = nextPos < c2.length ? c2[nextPos].el : null
          // 想知道是向前插入还是向后插入
          patch(null, c2[i], el, anchor) // 向后添加
          i++
        }
      }

    } else if (i > e2) {
      // 老得多新的少
      while (i <= e1) {
        unmount(c1[i])
        i++
      }
    } else {
      // 乱序 尽可能的复用
      let s1 = i;
      let s2 = i;
      const keyToNewIndexMap = new Map()
      for (let i = s2; i <= e2; i++) {
        const childVnode = c2[i];
        keyToNewIndexMap.set(childVnode.key, i)
      }

      const toBePatched = e2 - s2 + 1
      const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
      //去老的里面找, 看用没有服用的
      for (let i = s1; i <= e1; i++) {
        const oldVnode = c1[i];
        let newIndex = keyToNewIndexMap.get(oldVnode.key)
        if (newIndex === undefined) {
          unmount(oldVnode)
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1
          patch(oldVnode, c2[newIndex], el)
        }
      }
      // 移动节点,并且将新增的节点插入
      for (let i = toBePatched - 1; i >= 0; i--) {
        let currentIndex = i + s2;
        let child = c2[currentIndex]
        let anchor = currentIndex + 1 < c2.length ? c2[currentIndex].el : null
        if(newIndexToOldIndexMap[i] == 0) {
          patch(null, child, el,anchor)
        }else {
          hostInsert(child.el,el,anchor)
        }
      }
    }
  }
  const patchChildren = (n1, n2, el) => {
    const c1 = n1.children
    const c2 = n2.children
    // 老得有儿子  新的没儿子 新老都有儿子 新老都是文本
    // 开始比较儿子
    const prevShapeFlag = n1.shapeFlag;
    const shapeFlag = n2.shapeFlag;
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1)
        console.log(111)
      }
      if (c1 != c2) {
        console.log(222)
        hostSetElementText(el, c2)
      }
    } else {
      // 现在是元素 上一次有可能是文本 或者是数组
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 当前是数组 之前是数组
        // 两个数组的比对
        // 核心的diff算法
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          patchKeyedChildren(c1, c2, el)
        } else {
          // 没有孩子
          unmountChildren(c1)

        }

      } else {
        // 上一次是文本
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          hostSetElementText(el, '')
        }
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(c2, el)
        }
      }
    }
  }

  const patchElement = (n1, n2, container) => {
    // 元素是相同节点 更新属性 更新儿子
    let el = (n2.el = n1.el)
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    patchProp(oldProps, newProps, el)
    patchChildren(n1, n2, container)

  }
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      let child = normalizeVNode(children[i])
      patch(null, child, container)
    }
  }
  const mountElement = (vnode, container, anchor) => {
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
    hostInsert(el, container, anchor)

  }
  // 《-------------------处理文本-------------
  const processText = (n1, n2, container) => {
    if (n1 == null) {
      hostInsert(hostCreateText(n2.children), container)
    } else {
      // 元素更新
    }
  }

  // -------------------处理文本-------------》
  const isSameVNodeType = (n1, n2) => {
    return n1.type === n2.type && n1.key === n2.key
  }
  const unmount = (n1) => {
    console.log(n1)
    hostRemove(n1.el)
  }
  const patch = (n1, n2, container, anchor = null) => {
    console.log("====>", n1, n2)
    // 针对不同类型做初始化操作
    const { shapeFlag, type } = n2;
    // 判断有必要比较吗
    if (n1 && !isSameVNodeType(n1, n2)) {
      // 把以前的删除 换成n2
      console.log('===n1', n1)
      anchor = hostNextSibling(n1)
      unmount(n1)
      n1 = null
    }
    switch (type) {
      case Text:
        processText(n1, n2, container)
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // console.log('n2是元素')
          processElement(n1, n2, container, anchor)
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