var VueRuntimeDom = (function (exports) {
  'use strict';

  const isObject = (value) => typeof value == 'object' && value !== null; // 判断是否是对象
  const extend = Object.assign;
  const isArray = Array.isArray;
  const isString = value => typeof value == 'string';
  let hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (target, key) => hasOwnProperty.call(target, key);

  const nodeOps = {
      // createElement, 不同的平台创建元素的方式不一样
      // 元素
      createElement: tagName => document.createElement(tagName),
      remove: child => {
          const parent = child.parentNode;
          if (parent) {
              parent.removeChild(child);
          }
      },
      insert: (child, parent, anchor = null) => {
          parent.insertBefore(child, anchor);
      },
      querySelector: selector => document.querySelector(selector),
      setElementText: (el, text) => el.textContent = text,
      //文本操作 
      createText: text => document.createTextNode(text),
      setText: (node, text) => node.nodeValue = text
  };

  const patchStyle = (el, prev, next) => {
      const style = el.style; // 获取样式
      if (next == null) {
          el.removeAttribute('style'); // 
      }
      else {
          // 老的里面新的有没有
          if (prev) {
              for (let key in prev) {
                  if (next[key] == null) { // 老的有  新的没有  需要删除
                      style[key] = '';
                  }
              }
          }
          // 新的里面需要赋值到style
          for (let key in next) {
              style[key] = next[key];
          }
      }
  };

  const patchEvent = (el, key, value) => {
      // 对函数的缓存
      const invokers = el.vei || (el._vei = {});
      const exists = invokers[key];
      if (value && exists) { // 需要绑定事件并且 新的事件value有值的情况下
          exists.value = value;
      }
      else { // 
          const eventName = key.slice(2).toLowerCase();
          if (value) {
              // 以前没有绑定过 要绑定事件
              let invoker = invokers[key] = createInvoker(value);
              el.addEventListener(eventName, invoker);
          }
          else { // 以前绑定了, 但是没有绑定值
              el.removeEventListener(eventName, exists);
              invokers[key] = undefined;
          }
      }
  };
  function createInvoker(value) {
      const invoker = e => {
          invoker.value(e);
      };
      invoker.value = value; // 为了能随时更改value属性
      return invoker;
  }

  const patchClass = (el, value) => {
      if (value == null) {
          value = '';
      }
      el.className = value;
  };

  const patchAttr = (el, key, value) => {
      if (value == null) {
          el.removeAttribute(key);
      }
      else {
          el.setAttribute(key);
      }
  };

  // 一系列的属性操作
  const patchProp = (el, key, prevValue, nextValue) => {
      switch (key) {
          case 'class':
              patchClass(el, nextValue);
              break;
          case 'style':
              patchStyle(el, prevValue, nextValue);
              break;
          // case 'attr':
          //   break;
          // case 'events':
          //   break
          default:
              if (/^on[^a-z]/.test(key)) { // 事件
                  patchEvent(el, key, nextValue);
              }
              else { // 属性
                  patchAttr(el, key, nextValue);
              }
      }
  };

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
      let setupContext = createContext(instance);
      setup(instance.props, setupContext); // instance中props attrs slots emit
      // expose会被提取出来 因为在开发中会使用
      Component.render(instance.proxy);
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

  function createRenderer(rendererOption) {
      const mountComponent = (initialVnode, container) => {
          console.log('初始化', initialVnode, container);
          // 组件的渲染流程 最核心的是调用setup 拿到返回值,获取render函数返回的结果进行渲染
          // 1.先有实例
          const instance = initialVnode.component = createComponentInstance(initialVnode);
          // 2.需要的数据解析到实例上面去
          setupComponent(instance);
      };
      const processComponent = (n1, n2, container) => {
          if (n1 == null) { // 组件没有上次的虚拟节点 初始化过程
              mountComponent(n2, container);
          }
      };
      const patch = (n1, n2, container) => {
          // 针对不同类型做初始化操作
          const { shapeFlag } = n2;
          if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
              console.log('n2是元素');
          }
          else if (shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */) {
              console.log('n2是一个组件');
              processComponent(n1, n2, container);
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

  extend({ patchProp }, nodeOps);
  function createApp(rootComponent, rootProps = null) {
      const app = createRenderer().createApp(rootComponent, rootProps);
      let { mount } = app;
      app.mount = function (container) {
          // 清空容器的操作
          container = nodeOps.querySelector(container);
          container.innerHTML = '';
          // 将组建渲染成dom元素 进行挂载
          mount(container);
      };
      return app;
  }
  // export {
  //   rendererOption
  // }

  exports.createApp = createApp;

  return exports;

})({});
//# sourceMappingURL=runtime-dom.global.js.map
