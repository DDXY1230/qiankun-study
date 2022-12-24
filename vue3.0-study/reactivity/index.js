const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(target) {
  if (!isObject(target)) return target
  const handle = {
    get(target, key, receiver) {
      // 收集依赖
      console.log('get', key, target[key])
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result) // 判断是否又是对象,如果是继续递归,不是直接返回result
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        console.log('set', key, value)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        console.log('delete', key)
        // 触发更新
        trigger(target, key)

      }
      return result
    }
  }
  return new Proxy(target, handle)
}

let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象,去收集依赖
  activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) {
  console.log("🚀 ~ file: index.js:47 ~ track ~ target, key", target, key)
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  console.log("🚀 ~ file: index.js:50 ~ track ~ depsMap", depsMap)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}


export function ref(raw) {
  // 判断raw是否是ref创建的对象,如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) return
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value')
      return value
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}

export toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key]
    },
    set value(newValue) {
      proxy[key] = newValue
    }
  }
  return r
}


export function computed(getter) {
  const result = ref()
  effect(() => (result.value = getter()))
  return result
}