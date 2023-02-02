import { compileToFunction } from "./compiler/index.js"
import {
  observe
} from "./observe/index.js"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) { // 用于初始化操作
    // vue vm.$options就是获取用户的配置
    // this.$options = options
    const vm = this
    vm.$options = options
    //初始化状态
    initState(vm)
    if (options.el) {
      vm.$mount(options.el) // 实现数据的挂载
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this
    el = document.querySelector(el)
    let ops = vm.$options
    if (!ops.render) {
      let template
      if (!ops.template && el) {
        template = el.outerHTML
      } else {
        if (el) {
          template = ops.template
        }
      }
      if (template) {
        const render = compileToFunction(template)
      }
    }
    ops.render
  }
}

function initState(vm) {
  const opts = vm.$options // 获取所有的选项
  if (opts.props) {

  }
  if (opts.data) {
    initData(vm)
  }

}

function initData(vm) {
  let data = vm.$options.data // data可能是函数也可能是对象
  data = typeof data === 'function' ? data.call(vm) : data // 因为根实例可能是函数也可能是对象,组件实例必须是函数
  // 对数据进行劫持 vue2 里面采用了一个api defineProperty
  vm._data = data
  observe(data)
  //将._data 用vm来代理就可以了
  for (let key in data) {
    proxy(vm, '_data', key)
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}