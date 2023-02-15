import { extend } from '@vue/shared';
import {
  nodeOps
} from './nodeOps' // 对象
import {
  patchProp
} from './patchProp' // 方法

const renderOption = extend({ patchProp }, nodeOps)
export {
  renderOption
}