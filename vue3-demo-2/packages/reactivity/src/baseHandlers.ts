import { isObject,extend } from '@vue/shared';
import { readonly,reactive } from './reactive';
// 只读的属性set会被报异常
// 是不是深度

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter(false)
const shallowSet = createSetter(true)


function createGetter(isReadonly = false, shallow = false) { // 拦截获取功能
  return function get(target,key, receiver) {
    const res = Reflect.get(target,key,receiver) // target[key]
    if(!isReadonly) {
      // 不是只读, 收集依赖,等会数据变化后更新对应的视图
    }
    if(shallow) {
      return res;
    }
    if(isObject(res)) { // vue2是一上来就递归, vue2是当取值的时候进行代理,vue3的代理模式是懒代理
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
function createSetter(shallow = false) { // 拦截设置功能
  return function set(target,key,value,receiver) {
    const result = Reflect.set(target,key,value,receiver) // target[key] = value
    return result
  }
}

let readonlyObj = {
  set: (target, key) => {
    console.error(`set on key ${key} falied, beacause key is readonly attr`)
  }
}

export const mutableHandlers = {
  get,
  set
}
export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet
}
export const readonlyHandlers = extend({
  get: readonlyGet,
}, readonlyObj)
export const shallowReadonlyHandlers = extend({
  get: shallowReadonlyGet,
}, readonlyObj)