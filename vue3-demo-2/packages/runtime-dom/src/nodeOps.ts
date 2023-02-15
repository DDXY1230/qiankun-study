export const nodeOps = {
  // createElement, 不同的平台创建元素的方式不一样
  // 元素
  createElement: tagName => document.createElement(tagName),// 增加
  remove: child => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child)
    }
  },
  insert: (child, parent, anchor = null) => {
    parent.insertBefore(child,anchor);
  },
  querySelector: selector => document.querySelector(selector),
  setElementText: (el, text) => el.textContent = text,

  //文本操作 
  createText: text => document.createTextNode(text),
  setText: (node, text) => node.nodeValue = text
}