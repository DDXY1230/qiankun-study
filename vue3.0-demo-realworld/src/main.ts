import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App)
app.use(store)
app.use(router)
// app.provide('属性名', '属性值')
// app.component()
// app.directive()
app.mount('#app') // 注意:这句代码最好放在最后面,尤其放在挂在全局组件.指令之后
