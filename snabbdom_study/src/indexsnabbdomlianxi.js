console.log('11299233')

import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
// 创建patch函数
const patch = init([classModule,propsModule,styleModule,eventListenersModule])
// 创建虚拟节点
let myVnode1 = h('a', {props: {href: 'http://www.atguigu.com', target: '_blank'}}, '尚贵谷')
let myVnode2 = h('h2', {}, '我是一个标题')
console.log(myVnode1)
const container = document.getElementById('container')
// patch(container,myVnode1)
patch(container,myVnode2)