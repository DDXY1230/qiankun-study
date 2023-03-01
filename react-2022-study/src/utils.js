import { REACT_TEXT } from "./constants.js";
/**
 * 为了后面的DOM_DIFF,我把文本节点进行单独的分装活着说是标识
 * 不管原来是什么形式,全部包装为react形式
 * @param {*} element 
 * @returns 
 */
export function wrapToVdom(element) {
  return typeof element === "string" || typeof element === "number"
    ? {
        type: REACT_TEXT,
        props: {content: element}
      }
    : element;
}
