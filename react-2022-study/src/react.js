import Component from "./Component";
// 实现creactElement方法
/**
 * 
 * @param {*} type 元素类型
 * @param {*} config  属性
 * @param {*} children 子元素们
 */
export function createElement(type, config, children) {
  let props = {
    ...config
  };
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 3)

  }
  props.children = children
  return {
    type,
    props
  }
}
/**
 * 
 */
const React = {
  createElement,
  Component
}
export default React