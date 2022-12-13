import Link from "./components/link";
import View from "./components/view";
export let _Vue = null;
export default function install(Vue) {
  // 判断该插件是否注册过
  _Vue = Vue;
  _Vue.mixin({
    beforeCreate() {
      // 给所有vue实例,增加router属性
      if (this.$options.router) {
        this._router = this.$options.router;
        this._routerRoot = this;
        // 初始化router对象
        this._router.init(this);
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });
  _Vue.component(Link.name, Link);
  _Vue.component(View.name, View);
}
