import { createStore } from "vuex";
import products from "./modules/products";
import cart from "./modules/cart";
console.log("products", products);
export default createStore({
  strict: process.env.NODE_ENV !== "production", // 严格模式开启,禁止在组件中直接$store.state.xxx修改state, 一般只在开发环境使用true
  // 在生产上线阶段关闭严格模式,因为开启会消耗很多性能
  state: {
    count: 0,
    msg: "这是vuex传过来的",
  },
  getters: {
    reverseMsg: (state) => {
      return state.msg.split("").reverse().join("-");
    },
  },
  mutations: {
    // state 不需要传
    add(state, payload = 5) {
      console.log("index=>add");
      state.count += payload;
    },
  },
  actions: {
    // 这里写异步代码
    addAsync(context, payload) {
      setTimeout(() => {
        context.commit("add", payload);
      }, 2000);
    },
  },
  modules: {
    products,
    cart,
  },
});
