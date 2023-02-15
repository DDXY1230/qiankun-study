import { createVNode } from "./vnode"

export function createAppAPI(render) {
  return function createApp(rootComponent, rootProps) {
    const app = {
      _props: rootProps,
      _component: rootComponent,
      _container: null,
      mount(container) { // 挂载到哪里去
        // console.log('渲染的参数', container, rootComponent, rootProps, rendererOption)
        // let vnode = {}
        // render(vnode, container)

        // 1.根据组件创建虚拟节点
        // 2.将虚拟节点和容器获取到后调用render方法进行渲染

        // 虚拟节点  调render函数
        const vnode = createVNode(rootComponent, rootProps)
        console.log('vnode===》', vnode)
        render(vnode,container)
        app._container = container



      }
    }
    return app
  }
}