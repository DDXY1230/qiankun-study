const state = {
  count: 10,
  products: [
    { id: 1, title: "iPhone 11", price: 3000 },
    { id: 2, title: "iPhone 11", price: 3000 },
  ],
};
const getters = {};
const mutations = {
  setProducts(state: any, payload: object) {
    console.log("product=>setProducts");
    state.products.push(payload);
  },
  add(state: any, payload = 5) {
    console.log("product=>add");
    state.count += payload;
  },
};
const actions = {};
export default {
  namespaced: true, // 开启命名空间
  state,
  getters,
  mutations,
  actions,
};
