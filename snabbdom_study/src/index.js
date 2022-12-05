import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'
// let myvnode_1 = h('div', {key: 1}, [h('p', {}, [h('span', {}, '哈哈哈'), h('span', {}, 'hhhhh哈哈哈哈哈坎坎坷坷')])])
let myvnode_1 = h('div',{key: 1}, '你好')
let myvnode_2 = h('div', {key: 2}, [h('p', {}, [h('span', {}, '哈哈哈'), h('span', {}, 'hhhhh哈哈哈哈哈坎坎坷坷'), h('span', {}, '新增的span')])])

let container = document.getElementById('container')
let btn = document.getElementById('btn')
patch(container, myvnode_1)
btn.onclick = function () {
  patch(myvnode_1, myvnode_2)
}