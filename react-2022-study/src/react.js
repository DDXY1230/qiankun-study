import Component from "./Component";
import { wrapToVdom } from "./utils";
// 实现creactElement方法
/**
 *
 * @param {*} type 元素类型
 * @param {*} config  属性
 * @param {*} children 子元素们
 */
export function createElement(type, config, children) {
  let ref, key; // ref 按道理属于react属性不属于props.所以要从prop里面拎出来 key也一样
  if(config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref
    key = config.key;
    delete config.key
  }
  let props = {
    ...config,
  };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 3).map(wrapToVdom);
  } else {
    if (children) {
      props.children = wrapToVdom(children);
    }
  }
  return {
    type,
    props,
    ref,
    key
  };
}
function createRef() {
  return {current: null}
}
function createContext() {
  function Provider (props){
    Provider._value = props.value;
    return props.children;
  }
  function Consumer () {

  }
  return {Provider, Consumer}
}
/**
 *
 */
const React = {
  createElement,
  Component,
  createRef,
  createContext
};
export default React;
