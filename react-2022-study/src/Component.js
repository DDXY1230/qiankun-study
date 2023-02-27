// 类组件
// import { createElement } from './react'
import { createDOM } from "./react-dom";
// 更新队列
export let updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set(),
  batchUpdate() {
    for(let updater of this.updaters) {
      updater.updateClassComponent()
    }
    this.isBatchingUpdate = false
  }
};
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = []; // 等待生效的状态
    this.callbacks = [];
  }
  addState(partialState, callback) {
    this.pendingStates.push(partialState); // 等待更新的状态函数
    if (typeof callback == "function") {
      this.callbacks.push(callback); // 更新后需要调的回调
    }
    if (updateQueue.isBatchingUpdate) {
      // 如果当前是批量更新, 先缓存
      console.log('批量更新')
      updateQueue.updaters.add(this);
    } else {
      this.updateClassComponent(); // 直接更新
    }
  }
  updateClassComponent() {
    let { classInstance, pendingStates, callbacks } = this;
    // 如果有等待更新的状态对象的话
    if (pendingStates.length > 0) {
      classInstance.state = this.getState(); // 计算新状态
      classInstance.forceUpdate();
      callbacks.forEach((cb) => cb());
      callbacks.length = 0
    }
  }
  getState() {
    // 计算新状态
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === "function") {
        // nextState = nextState.call(classInstance, state)
        console.log('===51', state)
        nextState = nextState(state);
        console.log('===>52', nextState)
      }
      state = {
        ...state,
        ...nextState,
      };
    });
    pendingStates.length = 0;
    return state;
  }
}
class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState, callback) {
    // 将更新操作委托给更新器来做
    this.updater.addState(partialState, callback);
  }
  forceUpdate() {
    let newVdom = this.render();
    updateClassComponent(this, newVdom);
  }
  // render() {
  //   throw new Error('此方法为抽象方法,需要之类实现')
  // }
}

function updateClassComponent(classInstance, newVdom) {
  let oldDOM = classInstance.dom; // 取除类组件上次渲染出来的真实dom
  let newDOM = createDOM(newVdom); // 新的虚拟dom转成真实dom
  oldDOM.parentNode.replaceChild(newDOM, oldDOM); //新的dom替换旧的dom
  classInstance.dom = newDOM;
}

export default Component;
