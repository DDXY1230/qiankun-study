// 一系列的属性操作
import { patchStyle } from './modules/style';
import { patchEvent } from './modules/event';
import { patchClass } from './modules/class';
import { patchAttr } from './modules/attr';
export const patchProp = (el, key, prevValue, nextValue) => {
  switch(key) {
    case 'class':
      patchClass(el,nextValue);
      break;
    case 'style':
      patchStyle(el, prevValue, nextValue)
      break;
    // case 'attr':
    //   break;
    // case 'events':
    //   break
    default: 
    if(/^on[^a-z]/.test(key)) { // 事件
      patchEvent(el,key,nextValue)
    }else { // 属性
      patchAttr(el,key,nextValue)
    }
  }
}