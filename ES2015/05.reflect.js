let s1 = Symbol('lxm');
let obj = {
  name: 'lxm',
  age: 12,
  [s1]: 'okkk'
}
// Relect可以遍历出obj上所有的属性
Reflect.ownKeys(obj).forEach(item => {
  console.log(item)
})
// Reflect.preventExtensions // 阻止扩张
const fn = (a) => {
  console.log('fn',a, this)
}

fn.apply = function() {
  console.log('apply')
}
// fn.apply() // apply
Reflect.apply(fn,{a:'123'},[1222])

Function.prototype.apply.call(fn, null,['123'])
