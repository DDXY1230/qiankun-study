class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅
  on(eventName, callback) {
    const callbacks = this.events[eventName] || [];
    callbacks.push(callback);
    this.events[eventName] = callbacks;
  }
  // 发布
  emit(eventName, ...args) {
    const callbacks = this.events[eventName] || [];
    callbacks.forEach((cb) => cb(...args));
  }
  // 取消订阅
  off(eventName, callback) {
    const index = this.events[eventName].indexOf(callback);
    if (index != -1) {
      this.events[eventName].splice(index, 1);
    }
  }
  // 只监听一次
  once(eventName, callback) {
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one);
    };
    this.on(eventName, one);
  }
}
let JJ1 = new EventEmitter();
let JJ2 = new EventEmitter();

let handleOne = (params) => {
  console.log(params, "handleOne");
};
JJ1.on("aaa", handleOne);
JJ1.emit("aaa", "hhh");
JJ1.off("aaa", handleOne);
// 取消了,再发布就没有用了
JJ1.emit("aaa", "fff");

JJ2.once("aaa", handleOne);
JJ2.emit("aaa", "eee");
// 只能发布一次,再发也没用了
JJ2.emit("aaa", "eee");
