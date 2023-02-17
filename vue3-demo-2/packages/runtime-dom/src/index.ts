import { extend } from '@vue/shared';
import { nodeOps } from './nodeOps' // 对象
import { patchProp } from './patchProp' // 方法
import {createRenderer} from '@vue/runtime-core'

const rendererOption = extend({ patchProp }, nodeOps)

export function createApp(rootComponent, rootProps = null) {
  const app = createRenderer(rendererOption).createApp(rootComponent, rootProps)
  let {mount} = app
  app.mount = function (container) { // 重写mount
    // 清空容器的操作
    container = nodeOps.querySelector(container)
    container.innerHTML = ''
    // 将组建渲染成dom元素 进行挂载
    mount(container)
  }
  return app;
}
export * from '@vue/runtime-core'
// export {
//   rendererOption
// }