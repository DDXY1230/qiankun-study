import { isObject } from '@vue/shared';

import {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers, 
  shallowReadonlyHandlers
} from './baseHandlers'

export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers, false)
}
export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, true)
}
export function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, false)

}
export function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, true)
}
// 是不是只读   是不是深度
const reactiveMap = new WeakMap() // WeakMap 会自动垃圾回收, 不会造成内存泄漏,存储的key必须是对象
const readonlyMap = new WeakMap() // 

export function createReactiveObject(target, isReadonly, baseHandlers, isShallow) {
  // 如果目标不是对象, 没法拦截了, reactive这个api只能用来拦截对象类型
  if (!isObject(target)) {
    return target;
  }
  // 如果某个对象被代理了就不需要被再次代理 可能一个对象被代理一次,又被只读代理
  const proxyMap = isReadonly ? readonlyMap : reactiveMap
  // 判断之前是否存在过代理
  const existProxy = proxyMap.get(target);
  if (existProxy) {
    return existProxy // 如果存在代理过  返回代理的对象即可
  }
  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy); // 将要代理的对象 和 对应代理结果缓存起来
  return proxy
}
