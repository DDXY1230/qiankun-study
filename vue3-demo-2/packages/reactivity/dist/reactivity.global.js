var VueReactivity = (function (exports) {
  'use strict';

  const isObject = (value) => typeof value == 'object' && value !== null; // 判断是否是对象
  const extend = Object.assign;

  // 只读的属性set会被报异常
  // 是不是深度
  const get = createGetter();
  const shallowGet = createGetter(false, true);
  const readonlyGet = createGetter(true);
  const shallowReadonlyGet = createGetter(true, true);
  const set = createSetter(false);
  const shallowSet = createSetter(true);
  function createGetter(isReadonly = false, shallow = false) {
      return function get(target, key, receiver) {
          const res = Reflect.get(target, key, receiver); // target[key]
          if (shallow) {
              return res;
          }
          if (isObject(res)) { // vue2是一上来就递归, vue2是当取值的时候进行代理,vue3的代理模式是懒代理
              return isReadonly ? readonly(res) : reactive(res);
          }
          return res;
      };
  }
  function createSetter(shallow = false) {
      return function set(target, key, value, receiver) {
          const result = Reflect.set(target, key, value, receiver); // target[key] = value
          return result;
      };
  }
  let readonlyObj = {
      set: (target, key) => {
          console.log(`set on key ${key} falied, beacause key is readonly attr`);
      }
  };
  const mutableHandlers = {
      get,
      set
  };
  const shallowReactiveHandlers = {
      get: shallowGet,
      set: shallowSet
  };
  const readonlyHandlers = extend({
      get: readonlyGet,
  }, readonlyObj);
  const shallowReadonlyHandlers = extend({
      get: shallowReadonlyGet,
  }, readonlyObj);

  function reactive(target) {
      return createReactiveObject(target, false, mutableHandlers);
  }
  function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers);
  }
  function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers);
  }
  function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers);
  }
  // 是不是只读   是不是深度
  const reactiveMap = new WeakMap(); // WeakMap 会自动垃圾回收, 不会造成内存泄漏,存储的key必须是对象
  const readonlyMap = new WeakMap(); // 
  function createReactiveObject(target, isReadonly, baseHandlers, isShallow) {
      // 如果目标不是对象, 没法拦截了, reactive这个api只能用来拦截对象类型
      if (!isObject(target)) {
          return target;
      }
      // 如果某个对象被代理了就不需要被再次代理 可能一个对象被代理一次,又被只读代理
      const proxyMap = isReadonly ? readonlyMap : reactiveMap;
      // 判断之前是否存在过代理
      const existProxy = proxyMap.get(target);
      if (existProxy) {
          return existProxy; // 如果存在代理过  返回代理的对象即可
      }
      const proxy = new Proxy(target, baseHandlers);
      proxyMap.set(target, proxy); // 将要代理的对象 和 对应代理结果缓存起来
      return proxy;
  }

  exports.reactive = reactive;
  exports.readonly = readonly;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadonly = shallowReadonly;

  return exports;

})({});
//# sourceMappingURL=reactivity.global.js.map
