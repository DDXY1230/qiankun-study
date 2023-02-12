import { track, trigger } from './effect';
import { isObject, extend,isArray,isIntegerKey,hasOwn,hasChange } from '@vue/shared';
import { readonly, reactive } from './reactive';
import { TrackOpTypes,TriggerOrTypes } from './operators';
// 只读的属性set会被报异常
// 是不是深度

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter(false)
const shallowSet = createSetter(true)


function createGetter(isReadonly = false, shallow = false) { // 拦截获取功能
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver) // target[key]
    if (!isReadonly) {
      // 不是只读, 收集依赖,等会数据变化后更新对应的视图
      console.log('取值, 收集依赖')
      track(target, TrackOpTypes.GET, key)
    }
    if (shallow) {
      return res;
    }
    if (isObject(res)) { // vue2是一上来就递归, vue2是当取值的时候进行代理,vue3的代理模式是懒代理
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
function createSetter(shallow = false) { // 拦截设置功能
  return function set(target, key, value, receiver) {
    console.log('设置', target, key, value, receiver)
    const oldValue = target[key]
    console.log('oldValue', oldValue)
    let hasKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target,key)


    
    const result = Reflect.set(target, key, value, receiver) // target[key] = value

    if(!hasKey) {
      // 新增
      console.log('新增')
      trigger(target, TriggerOrTypes.ADD, key, value)
    }else if(hasChange(oldValue, value) ) {
      // 修改
      console.log('修改')
      trigger(target, TriggerOrTypes.SET, key, value, oldValue)
    }

    // 当数据更新 通知对应属性的effect重新执行
    // 我们区分是新增的 还是修改的 vue2里面无法监控索引更改, 无法控制数组的长度

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