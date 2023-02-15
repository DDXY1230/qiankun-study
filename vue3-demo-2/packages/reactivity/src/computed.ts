import { isFunction } from '@vue/shared/src';
import { effect, track, trigger } from './effect';
import { TrackOpTypes, TriggerOrTypes } from './operators';
// vue2  vue3原理不一样
class ComputedRefImpl {
  public _dirty = true; // 默认取值时不要有缓存
  public _value;
  public effect;
  constructor(public getter, public setter) { // 在ts中默认不会挂在this上,但是加上public就可以挂在this上面了
    // 计算属性默认会产生一个effect
    this.effect = effect(getter, {
      lazy: true, // 默认不执行
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          trigger(this,TriggerOrTypes.SET,'value')
        }
      }
    })

  }
  get value() {// 计算属性也要收集依赖
    if (this._dirty) {
      this._value = this.effect()
      this._dirty = false
    }
    track(this, TrackOpTypes.GET, 'value')
    return this._value
  }
  set value(newValue) {
    this.setter(newValue)
  }
}
export function computed(getterOrOptions) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => {
      console.warn('computed value must be readonly!')
    }
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedRefImpl(getter, setter)
}