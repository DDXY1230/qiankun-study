/* 
基本数据类型: string number boolean undefined null symbol bigint
 */
let s1 = Symbol('lxm');
let s2 = Symbol('lxm');
console.log(s1 === s2) // false  独一无二

// 一般把symbol作为对象的key
let obj = {
  name: 'lxm',
  age: 12,
  [s1]: 'okkk'
}
console.log(obj)
for(let key in obj) {
  console.log(key) // for in    拿不到symbol 因为symbol默认不能枚举
}
console.log(Object.getOwnPropertySymbols(obj)) // 获取所有symbol
console.log(Object.keys(obj))// 获取普通类型的key 组成一个数组

// Reflect



let s3 = Symbol.for('lll'); // 声明全新的
let s4 = Symbol.for('lll'); // .for 把之前声明的拿过来用 描述是一样的就是复用  描述不一样就不相等
console.log(s3 === s4) // true    要是for('xx') for('ll') 括号内部的东西不相等的话就会不等返回false


// 元编程的能力 =》 可以改写语法本身  自己制造一些类型判断
let obj = {
  [Symbol.toStringTag]: 'xxxm'
}
console.log(Object.prototype.toString.call(obj)) //[object xxxm]


// 隐式类型转换
let obj1 = {
  [Symbol.toPrimitive](type) {
    return '123'
  }
}
console.log(obj1 + '1') // 默认转的时候调用toPrimitive方法


//====
let instance = {
  [Symbol.hasInstance](value) {
    return 'name' in value
  }
}
console.log({name: 'alice'} instanceof instance) // true