import { init } from "snabbdom/build/package/init";
import { h } from "snabbdom/build/package/h";
// snabbdom/build/package这里要写全路径,因为有些webpage不支持exports简化倒入
const patch = init([]);
// 第一个参数: 标签+选择器
// 第二个参数: 如果是字符串就是标签中的文本内容
let vnode = h("div#container", [
  h("h1", "this is good study"),
  h("h2", "hhhhhhh今天天气好"),
]);
let app = document.querySelector("#app");
let oldVnode = patch(app, vnode);
setTimeout(() => {
  vnode = h("div#container", [h("h1", "Hello world"), h("h2", "今天下雨啦")]);
  oldVnode = patch(oldVnode, vnode);
}, 2000);
setTimeout(() => {
  patch(oldVnode, h("!")); // 清空 没有任何内容的注释节点
}, 4000);
