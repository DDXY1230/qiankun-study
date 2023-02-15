'use strict';

const isObject = (value) => typeof value == 'object' && value !== null; // 判断是否是对象
const extend = Object.assign;
const isArray = Array.isArray;
const isFunction = value => typeof value == 'function';
const isIntegerKey = key => parseInt(key) + '' === key;
let hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (target, key) => hasOwnProperty.call(target, key);
const hasChange = (oldValue, value) => oldValue !== value;

function effect(fn, options = {}) {
    // 目的是我需要让这个effect变成响应式的effects, 可以做到数据变化重新执行
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect(); // 响应式的effect默认会先执行一次
    }
    return effect;
}
let uid = 0;
let activeEffect; // 存储当前的effect
const effectStack = [];
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) { // 保证effect没有加入effectStack中 才能加
            try {
                // console.log('默认会先执行一次')
                effectStack.push(effect);
                activeEffect = effect;
                console.log('================>', fn);
                return fn(); // 函数执行的时候,会走get方法
            }
            finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.id = uid++; // 制作一个effect标识, 用于区分effect
    effect._isEffect = true; // 用于标识这个是响应式effect
    effect.raw = fn; // 保留effect对应的原函数
    effect.options = options; // 在effect上面保存用户的属性
    return effect;
}
const targetMap = new WeakMap();
function track(target, type, key) {
    // activeEffect // 当前的正在运行的effect
    // console.log(target,key,activeEffect)
    if (activeEffect === undefined) { //此属性不用收集, 因为没有在effect中使用
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
    console.log('依赖', targetMap);
}
function trigger(target, type, key, newValue, oldValue) {
    console.log('修改新增调用trigger', target, type, key, newValue, oldValue);
    const depsMap = targetMap.get(target);
    console.log('depsMap', depsMap);
    if (!depsMap) {
        return;
    }
    const effects = new Set();
    const add = effectToAdd => {
        console.log('effectToAdd', effectToAdd);
        if (effectToAdd) {
            effectToAdd.forEach(effect => effects.add(effect));
        }
    };
    if (key == 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            console.log(depsMap, dep, key);
            if (key === 'length' || key > newValue) {
                add(dep);
            }
        });
    }
    else {
        // 可能是对象
        if (key !== undefined) { // 这里是修改,不能还是新增
            console.log('-------------key', key);
            console.log('-------------key', depsMap.get(key));
            add(depsMap.get(key)); // 
        }
        // 如果修改数组中的某一个索引
        switch (type) {
            case 0 /* TriggerOrTypes.ADD */:
                if (isArray(target) && isIntegerKey(key)) {
                    add(depsMap.get('length'));
                }
        }
    }
    console.log('====================>', effects);
    effects.forEach((effect) => effect());
}

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
        if (!isReadonly) {
            // 不是只读, 收集依赖,等会数据变化后更新对应的视图
            console.log('取值, 收集依赖');
            track(target, 0 /* TrackOpTypes.GET */, key);
        }
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
        console.log('设置', target, key, value, receiver);
        const oldValue = target[key];
        console.log('oldValue', oldValue);
        let hasKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver); // target[key] = value
        if (!hasKey) {
            // 新增
            console.log('新增');
            trigger(target, 0 /* TriggerOrTypes.ADD */, key, value);
        }
        else if (hasChange(oldValue, value)) {
            // 修改
            console.log('修改');
            trigger(target, 1 /* TriggerOrTypes.SET */, key, value, oldValue);
        }
        // 当数据更新 通知对应属性的effect重新执行
        // 我们区分是新增的 还是修改的 vue2里面无法监控索引更改, 无法控制数组的长度
        return result;
    };
}
let readonlyObj = {
    set: (target, key) => {
        console.error(`set on key ${key} falied, beacause key is readonly attr`);
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

function ref(value) {
    // value是一个普通类型
    return createRef(value);
}
function shallowRef(value) {
    return createRef(value, true);
}
function createRef(rawValue, shallow = false) {
    // rawValue也可以是对象,但是一般情况对象直接使用reactive更合理
    return new RefImpl(rawValue, shallow);
}
class RefImpl {
    rawValue;
    shallow;
    _value; // 表示声明了_value属性, 但是没有赋值
    __v_isRef = true; // 表示是一个ref属性
    constructor(rawValue, shallow) {
        this.rawValue = rawValue;
        this.shallow = shallow;
        this._value = shallow ? rawValue : convert(rawValue);
    }
    // 类的属性访问器
    get value() {
        track(this, 0 /* TrackOpTypes.GET */, 'value');
        return this._value;
    }
    set value(newValue) {
        if (hasChange(newValue, this.rawValue)) {
            // 判断老值和新值是否有变化
            this.rawValue = newValue;
            this._value = this.shallow ? newValue : convert(newValue);
            trigger(this, 1 /* TriggerOrTypes.SET */, 'value', newValue);
        }
    }
}
const convert = val => isObject(val) ? reactive(val) : val;
function toRef(target, key) {
    return new ObjectRefImp(target, key);
}
function toRefs(object) {
    const ret = isArray(object) ? new Array(object.length) : {};
    for (let key in object) {
        ret[key] = toRef(object, key);
    }
    return ret;
}
class ObjectRefImp {
    target;
    key;
    __v_isRef = true;
    constructor(target, key) {
        this.target = target;
        this.key = key;
    }
    get value() {
        return this.target[this.key];
    }
    set value(newValue) {
        this.target[this.key] = newValue;
    }
}
/*
ref 和 reactive 的区别:
reactive内部采用的是proxy
ref内部使用的是defineProperty
 */

// vue2  vue3原理不一样
class ComputedRefImpl {
    getter;
    setter;
    _dirty = true; // 默认取值时不要有缓存
    _value;
    effect;
    constructor(getter, setter) {
        this.getter = getter;
        this.setter = setter;
        // 计算属性默认会产生一个effect
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (!this._dirty) {
                    this._dirty = true;
                    trigger(this, 1 /* TriggerOrTypes.SET */, 'value');
                }
            }
        });
    }
    get value() {
        if (this._dirty) {
            this._value = this.effect();
            this._dirty = false;
        }
        track(this, 0 /* TrackOpTypes.GET */, 'value');
        return this._value;
    }
    set value(newValue) {
        this.setter(newValue);
    }
}
function computed(getterOrOptions) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
        setter = () => {
            console.warn('computed value must be readonly!');
        };
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter);
}

exports.computed = computed;
exports.effect = effect;
exports.reactive = reactive;
exports.readonly = readonly;
exports.ref = ref;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
exports.shallowRef = shallowRef;
exports.toRef = toRef;
exports.toRefs = toRefs;
//# sourceMappingURL=reactivity.cjs.js.map
