const isObject = (value) => typeof value == 'object' && value !== null; // 判断是否是对象
const extend = Object.assign;
const isArray = Array.isArray;
const isFunction = value => typeof value == 'function';
const isString = value => typeof value == 'string';
const isIntegerKey = key => parseInt(key) + '' === key;
let hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (target, key) => hasOwnProperty.call(target, key);
const hasChange = (oldValue, value) => oldValue !== value;

function isVnode(vnode) {
    return vnode.__v_isVnode;
}
function createVNode(type, props, children = null) {
    // 可以根据type来区分组件还是普通元素
    // 根据type来区分 是元素还是组件
    const shapeFlag = isString(type) ?
        1 /* ShapeFlags.ELEMENT */ : isObject(type) ?
        4 /* ShapeFlags.STATEFUL_COMPONENT */ : 0;
    const vnode = {
        __v_isVnode: true,
        type,
        props,
        children,
        component: null,
        el: null,
        key: props && props.key,
        shapeFlag
    };
    normalizeChildren(vnode, children);
    return vnode;
}
function normalizeChildren(vnode, children) {
    let type = 0;
    if (children == null) ;
    else if (isArray(children)) {
        type = 16 /* ShapeFlags.ARRAY_CHILDREN */;
    }
    else {
        type = 8 /* ShapeFlags.TEXT_CHILDREN */;
    }
    vnode.shapeFlag |= type; // 判断自己的类型和儿子的类型
}
const Text = Symbol('Text');
function normalizeVNode(child) {
    if (isObject(child))
        return child;
    return createVNode(Text, null, String(child));
}

function createAppAPI(render) {
    return function createApp(rootComponent, rootProps) {
        const app = {
            _props: rootProps,
            _component: rootComponent,
            _container: null,
            mount(container) {
                // console.log('渲染的参数', container, rootComponent, rootProps, rendererOption)
                // let vnode = {}
                // render(vnode, container)
                // 1.根据组件创建虚拟节点
                // 2.将虚拟节点和容器获取到后调用render方法进行渲染
                // 虚拟节点  调render函数
                const vnode = createVNode(rootComponent, rootProps);
                console.log('vnode===》', vnode);
                render(vnode, container);
                app._container = container;
            }
        };
        return app;
    };
}

const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        console.log('render里面的proxy取值');
        const { setupState, props, data } = instance;
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        else if (hasOwn(data, key)) {
            return data[key];
        }
        else {
            return undefined;
        }
    },
    set({ _: instance }, key, value) {
        console.log('render里面的proxy设置值');
    }
};

const createComponentInstance = function (vnode) {
    const instance = {
        vnode,
        type: vnode.type,
        props: {},
        attrs: {},
        slots: {},
        ctx: {},
        setupState: {},
        render: null,
        isMounted: false
    };
    instance.ctx = { _: instance };
    return instance;
};
const setupComponent = function (instance) {
    const { props, children } = instance.vnode;
    // 根据props解析出props和attrs, 将其放到instance
    instance.props = props; // iniProps
    instance.children = children; // 插槽的解析
    // 需要先看一下,当前组件是不是有状态的组件
    console.log('instance', instance);
    let isStateful = instance.vnode.shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */;
    console.log('isStateful', isStateful);
    if (isStateful) {
        // 一个带状态的组件
        // 调用当前实例setup的方法, 用setup的返回值填充setupState和对应的render方法
        setupStatefulComponent(instance);
    }
};
function setupStatefulComponent(instance) {
    // 1.代理 传递给render函数的参数
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    // 2.获取组件的类型
    let Component = instance.type;
    let { setup } = Component;
    if (setup) {
        let setupContext = createContext(instance);
        const setupResult = setup(instance.props, setupContext); // instance中props attrs slots emit
        handleSetupResult(instance, setupResult);
    }
    else {
        finishComponentSetup(instance); // 完成组件的启动
    }
    // expose会被提取出来 因为在开发中会使用
    Component.render(instance.proxy);
}
function handleSetupResult(instance, setupResult) {
    console.log('handleSetupResult', instance);
    // 处理setup返回值
    if (isFunction(setupResult)) {
        instance.render = setupResult;
    }
    else if (isObject(setupResult)) {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance); // 完成组件的启动
}
function finishComponentSetup(instance) {
    console.log('finishComponentSetup', instance);
    const Component = instance.type;
    if (!instance.render) {
        // 对template模版进行编译, 产生render函数 需要将生成render函数放在实例上
        if (!Component.render && Component.template) ;
        instance.render = Component.render;
    }
}
function createContext(instance) {
    return {
        attrs: instance.attrs,
        props: instance.props,
        slots: instance.slots,
        emit: () => { },
        expose: () => { }
    };
}

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
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter(false);
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
const readonlyHandlers = extend({
    get: readonlyGet,
}, readonlyObj);
extend({
    get: shallowReadonlyGet,
}, readonlyObj);

function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers);
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

function createRenderer(rendererOption) {
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, } = rendererOption;
    const setupRenderEffect = (instance, container) => {
        effect(function componentEffect() {
            // 每个组件都有一个effect vue3是组件级别更新, 数据变化重新执行对应组件的effect
            if (!instance.isMounted) {
                let proxyToUse = instance.proxy;
                let subtree = instance.subtree = instance.render.call(proxyToUse, proxyToUse);
                patch(null, subtree, container);
                instance.isMounted = true;
            }
        });
    };
    const mountComponent = (initialVnode, container) => {
        console.log('初始化', initialVnode, container);
        // 组件的渲染流程 最核心的是调用setup 拿到返回值,获取render函数返回的结果进行渲染
        // 1.先有实例
        const instance = (initialVnode.component = createComponentInstance(initialVnode));
        // 2.需要的数据解析到实例上面去
        setupComponent(instance);
        // 3.创建一个effect让render函数执行
        setupRenderEffect(instance, container);
    };
    const processComponent = (n1, n2, container) => {
        if (n1 == null) { // 组件没有上次的虚拟节点 初始化过程
            mountComponent(n2, container);
        }
    };
    const processElement = (n1, n2, container) => {
        // 
        if (n1 == null) {
            //元素初始化
            mountElement(n2, container);
        }
    };
    const mountChildren = (children, container) => {
        for (let i = 0; i < children.length; i++) {
            let child = normalizeVNode(children[i]);
            patch(null, child, container);
        }
    };
    const mountElement = (vnode, container) => {
        // 递归渲染
        const { props, shapeFlag, type, children } = vnode;
        let el = (vnode.el = hostCreateElement(type));
        if (props) {
            for (const key in props) {
                hostPatchProp(el, key, null, props[key]);
            }
        }
        if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
            hostSetElementText(el, children);
        }
        else if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
            mountChildren(children, el);
        }
        hostInsert(el, container);
    };
    // 《-------------------处理文本-------------
    const processText = (n1, n2, container) => {
        if (n1 == null) {
            hostInsert(hostCreateText(n2.children), container);
        }
    };
    // -------------------处理文本-------------》
    const patch = (n1, n2, container) => {
        // 针对不同类型做初始化操作
        const { shapeFlag, type } = n2;
        switch (type) {
            case Text:
                processText(n1, n2, container);
                break;
            default:
                if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
                    // console.log('n2是元素')
                    processElement(n1, n2, container);
                }
                else if (shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */) {
                    // console.log('n2是一个组件')
                    processComponent(n1, n2, container);
                }
                break;
        }
    };
    const render = (vnode, container) => {
        // 核心 core  根据不同的虚拟节点创建对应的真实元素
        patch(null, vnode, container);
    };
    return {
        createApp: createAppAPI(render)
    };
}

function h(type, propsOrChildren, children) {
    const l = arguments.length; // 儿子节点要么是字符串要么是数组  针对的是createVnode
    console.log('h函数', type, propsOrChildren, children);
    if (l == 2) {
        // 类型+ 属性 类型+ 孩子
        // 如果第二个参数不是对象 那一定是孩子
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
            if (isVnode(propsOrChildren)) {
                return createVNode(type, null, [propsOrChildren]);
            }
            return createVNode(type, propsOrChildren);
        }
        else {
            // 不是对象 那一定是孩子
            return createVNode(type, null, propsOrChildren);
        }
    }
    else {
        if (l > 3) {
            // 除了前两个  后面都是儿子节点
            children = Array.prototype.slice.call(arguments, 2);
        }
        else if (l === 3 && isVnode(children)) {
            children = [children];
        }
        return createVNode(type, propsOrChildren, children);
    }
}

export { createRenderer, h };
//# sourceMappingURL=runtime-core.esm-bundler.js.map
