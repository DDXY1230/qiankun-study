import { createStore } from 'vuex'

export default createStore({
  state: {//如果有子模块,这里获取需要点出模块名 $store.state.模块名.xxx
  },
  getters: {// 如果有子模块,这里会把子模块合并过来,所以获取的时候不用点出模块名 $store.getters 可以直接获取 除非加了命名空间$store.getters[‘a/age']
  },
  mutations: {// 如果有子模块,这里会把子模块合并过来,所以获取的时候不用点出模块名 $store.commit 可以直接获取 除非加了命名空间
  
  },
  actions: {// 如果有子模块,这里会把子模块合并过来,所以获取的时候不用点出模块名 $store.dispatch 可以直接获取 除非加了命名空间
  
  },
  modules: {
  }
})
