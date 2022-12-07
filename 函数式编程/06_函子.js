// 方法一
// class Container {
//   constructor(value) {
//     this._value = value
//   }
//   map(fn) {
//     return new Container(fn(this._value))
//   }
// }
// let r = new Container(5).map(x => x + 1).map(x => x*x)
// console.log(r._value)
// 方法二
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
}
let r = Container.of(5).map(x => x + 1).map(x => x * x)
// console.log(r._value)
// 可以实现链式调用

//-------------------------
class MayBe {
  static of(value) {
    return new MayBe(value)
  }
  constructor(value) {
    this._value = value
  }
  map (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }
  isNothing() {
    return this._value == null
  }
}
console.log(MayBe.of('HEllo world').map(x => x.toUpperCase()).map(x => null))
