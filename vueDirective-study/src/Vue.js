import Compile from "./Compile";

export default class Vue {
  constructor(options) {
    console.log("🚀 ~ file: Vue.js:5 ~ Vue ~ constructor ~ options", options);
    this.$options = options || {};
    this._data = options.data || undefined;
    // 模版编译
    new Compile(options.el, this);
  }
}
