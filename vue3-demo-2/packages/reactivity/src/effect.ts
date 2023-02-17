import { isArray, isIntegerKey } from '@vue/shared';
import { TriggerOrTypes } from './operators';
export function effect(fn, options: any = {}) {
  // 目的是我需要让这个effect变成响应式的effects, 可以做到数据变化重新执行
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect(); // 响应式的effect默认会先执行一次
  }
  return effect;
}
let uid = 0
let activeEffect // 存储当前的effect
const effectStack = []
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) { // 保证effect没有加入effectStack中 才能加
      try {
        // console.log('默认会先执行一次')
        effectStack.push(effect)
        activeEffect = effect
        console.log('================>', fn)
        return fn()// 函数执行的时候,会走get方法
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++; // 制作一个effect标识, 用于区分effect
  effect._isEffect = true; // 用于标识这个是响应式effect
  effect.raw = fn;// 保留effect对应的原函数
  effect.options = options;// 在effect上面保存用户的属性
  return effect
}
const targetMap = new WeakMap()
export function track(target, type, key) { // 可以拿到当前的effect
  // activeEffect // 当前的正在运行的effect
  // console.log(target,key,activeEffect)
  if (activeEffect === undefined) { //此属性不用收集, 因为没有在effect中使用
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
  console.log('依赖', targetMap)
}
export function trigger(target, type, key?, newValue?, oldValue?) {
  console.log('修改新增调用trigger', target, type, key, newValue, oldValue)
  const depsMap = targetMap.get(target)
  console.log('depsMap', depsMap)
  if (!depsMap) {
    return
  }
  const effects = new Set()
  const add = effectToAdd => {
    console.log('effectToAdd', effectToAdd)
    if (effectToAdd) {
      effectToAdd.forEach(effect => effects.add(effect))
    }
  }
  if (key == 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      console.log(depsMap, dep, key)
      if (key === 'length' || key > newValue) {
        add(dep)
      }
    })
  } else {
    // 可能是对象
    if (key !== undefined) {// 这里是修改,不能还是新增
      console.log('-------------key', key)
      console.log('-------------key', depsMap.get(key))
      add(depsMap.get(key)) // 
    }
    // 如果修改数组中的某一个索引
    switch (type) {
      case TriggerOrTypes.ADD:
        if (isArray(target) && isIntegerKey(key)) {
          add(depsMap.get('length'))
        }
    }
  }
  console.log('====================>', effects)
  effects.forEach((effect: any) => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  })
}  