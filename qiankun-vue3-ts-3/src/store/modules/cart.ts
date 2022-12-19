const state = {
  count: 20000,
  products: [
    { id: 11, title: "huawei 11", price: 13000 },
    { id: 22, title: "huawei 11", price: 23000 },
  ],
};
const getters = {};
const mutations = {
  setCart(state: any, payload: object) {
    state.products.push(payload);
  },
  add(state: any, payload = 5) {
    console.log("cart=>add");
    state.count += payload;
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
