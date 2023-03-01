// 类组件
// import { createElement } from './react'
import { createDOM,compareTwoVdom } from "./react-dom";
// 更新队列
export let updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set(),
  batchUpdate() {
    for(let updater of this.updaters) {
      updater.updateComponent()
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
    this.emitUpdate()
  }
  // 一个组件不管组件变了还是状态变了都会更新
  emitUpdate(newProps) {
    if (updateQueue.isBatchingUpdate) {
      // 如果当前是批量更新, 先缓存
      // console.log('批量更新')
      updateQueue.updaters.add(this);
    } else {
      this.updateComponent(); // 直接更新
    }
  }
  updateComponent() {
    let { classInstance, pendingStates, callbacks } = this;
    // 如果有等待更新的状态对象的话
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState())
    }
  }
  getState() {
    // 计算新状态
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === "function") {
        nextState = nextState(state);
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
function shouldUpdate(classInstance,nextProps, nextState){
  if(nextProps) {
    classInstance.props = nextProps
  }
  classInstance.state = nextState;// 不管组件要不要刷新,其实组件的state一定会改变
  // 如果有这个方法, 并且这个方法返回为false, 则不需要继续向下更新, 否则更新
  if(classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(classInstance.props,classInstance.state)){
    return
  }
  classInstance.forceUpdate()
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
    if(this.componentWillUpdate) {
      this.componentWillUpdate()
    }
    let newRenderVdom = this.render();
    let oldRenderVdom = this.oldRenderVdom;
    let oldDOM = oldRenderVdom.dom;
    // updateClassComponent(this, newVdom);
    let currentRenderVdom = compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom)
    this.oldRenderVdom = currentRenderVdom
    if(this.componentDidUpdate) {
      this.componentDidUpdate()
    }
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
