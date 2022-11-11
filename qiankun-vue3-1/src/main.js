import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./public-path"


let instance =null
function render(props = {}) {
  console.log("🚀 ~ file: main.js ~ line 10 ~ render ~ props", props)
  const { container } = props
  instance = createApp(App)
  instance.mount(container ? container.querySelector("#app") : "#app")
}
//独立运行时 判断是否在qiankun中运行,不是的话也可以单独运行
if(!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap() {
  console.log("vue3-1 app bootstrap")
}
export async function mount(props) {
  console.log('23=======',props)
  render(props)
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}
export async function unmount() {
  instance.unmount()
  instance._container.innerHTML = ""
  instance = null
}


createApp(App).use(store).use(router).mount('#app')
