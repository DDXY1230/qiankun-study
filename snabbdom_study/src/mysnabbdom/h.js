import vnode from "./vnode";
/* 
1 .  h('div',{},'文字')
2 .  h('div',{},[h('p',{},'中国')])
3 .  h('div',{},h())
 */
export default function h(sel,data,c) {
  if(arguments.length != 3){
    throw Error('对不起,这个是低配版,只接受3个参数')
  }
  if(typeof c == 'string' || typeof c == 'number') {
    // 说明现在调用h函数的形态 1
    return vnode(sel,data,undefined,c,undefined)
  }else if(Array.isArray(c)) {
    // 说明现在调用h函数的形态 2
    let children = []
    for(let i = 0; i < c.length; i++) {
      if(!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))
      throw new Error('传入的数组参数重有项不是h函数')
      children.push(c[i])
    }
    // children收集完毕,此时就可以返回虚拟节点了
    return vnode(sel,data,children,undefined,undefined)
  }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
    // 说明现在调用h函数的形态 3
    let children = [c]
    return vnode(sel,data,children,undefined,undefined)
  }else {
    throw new Error('对不起,第三个参数不对')
  }
}