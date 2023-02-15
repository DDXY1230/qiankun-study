export function createRenderer (rendererOption) {// 告诉core  怎么渲染
  return {
    createApp(rootComponent, rootProps) {
      const app = {
        mount(container) { // 挂载到哪里去
          console.log('渲染的参数',container, rootComponent, rootProps,rendererOption)
        }
      }
      return app
    }
  }
}