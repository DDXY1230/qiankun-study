

// 1.
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}
// 但是es6之后,可以人为指定,所以堵漏洞的方式就是自己手动写成Array
const obj = {
  // [Symbol.toStringTag]: 'bbb'
  [Symbol.toStringTag]: 'Array' // 所以堵漏洞的方式就是自己手动写成Array
}
console.log(Object.prototype.toString.call(obj));//[object bbb]


//2. 另一种方式
function isArr(obj) {
  return obj instanceof Array;
}
// 但是这种方法也是有可能人为更改,这些人为更改在开发业务上吗其实是没有影响,
// 但是在写更高级别的框架那么就要规避,不然别人会用脚说你的框架又问题
const o = {}
Object.setPrototypeOf(o,Array.prototype) // 人为把o的原型指向数组的原型
const Array1 = window.Array
const frame = document.querySelector('iframe');
const Array2 = frame.contentWindow.Array
console.log(Array1 == Array2) // false
console.log(isArr(Array2))// false 
// 上面之所以返回false, 是因为这两个数组的构造函数不一样,
// 他们来自不同的框架,有各自的构造函数

// 3.
// 
// 上面两个方法判断数组的方式其实都不是很完善,
// 后来es6给我们提供了一个更好的静态方法   Array.isArray()
// 经过本地代码,就是c++代码,这个函数模拟不了
// 最好用这个,其他就算你设置了原型是数组的原型,用这个方法也是false,
// 所以新时代判断数组的方式就用   Array.isArray()  就对了



