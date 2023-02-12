import { isObject, hasChange, isArray } from '@vue/shared';
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOrTypes } from "./operators";
import { reactive } from './reactive'

export function ref(value) {
  // value是一个普通类型
  return createRef(value)
}
export function shallowRef(value) {
  return createRef(value, true)
}
function createRef(rawValue, shallow = false) {
  // rawValue也可以是对象,但是一般情况对象直接使用reactive更合理
  return new RefImpl(rawValue, shallow)
}
class RefImpl {
  public _value; // 表示声明了_value属性, 但是没有赋值
  public __v_isRef = true; // 表示是一个ref属性
  constructor(public rawValue, public shallow) { // 这样写表示此属性放在了实例上了
    this._value = shallow ? rawValue : convert(rawValue)
  }
  // 类的属性访问器
  get value() {// 代理 取值value会代理到_value
    track(this, TrackOpTypes.GET, 'value')
    return this._value
  }
  set value(newValue) {
    if (hasChange(newValue, this.rawValue)) {
      // 判断老值和新值是否有变化
      this.rawValue = newValue
      this._value = this.shallow ? newValue : convert(newValue)
      trigger(this, TriggerOrTypes.SET, 'value', newValue)
    }
  }
}
const convert = val => isObject(val) ? reactive(val) : val



export function toRef(target, key) {
  return new ObjectRefImp(target, key)
}
export function toRefs(object) { // object可能是对象也可能是数组
  const ret = isArray(object) ? new Array(object.length) : {}
  for (let key in object) {
    ret[key] = toRef(object, key)
  }
  return ret;

}
class ObjectRefImp {
  public __v_isRef = true;
  constructor(public target, public key) {

  }
  get value() {
    return this.target[this.key]
  }
  set value(newValue) {
    this.target[this.key] = newValue
  }
}
/* 
ref 和 reactive 的区别:
reactive内部采用的是proxy  
ref内部使用的是defineProperty
 */