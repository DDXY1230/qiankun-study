import { init } from "snabbdom/build/package/init";
import { h } from "snabbdom/build/package/h";
// snabbdom/build/package这里要写全路径,因为有些webpage不支持exports简化倒入
const patch = init([]);
// 第一个参数: 标签+选择器
// 第二个参数: 如果是字符串就是标签中的文本内容
let vnode = h("div#container.cls", "Hello world");
let app = document.querySelector("#app");

// 第一个参数: 旧的Vnode , 或者dom元素
// 第二个参数: 新的Vnode
// 返回新的Vnode 作为下次的oldVnode
let oldVnode = patch(app, vnode);
vnode = h("div#container.xxx", "Hello Snabbdom");
patch(oldVnode, vnode);
