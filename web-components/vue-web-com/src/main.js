import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FcBubbles } from 'fancy-components'

/* eslint-disable no-new */
new FcBubbles()
createApp(App).use(store).use(router).mount('#app')
