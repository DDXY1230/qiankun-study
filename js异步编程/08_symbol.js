const cache = {}
cache['foo'] = Math.random()
const s = Symbol()
// 为对象添加独一无二的属性名 , 比如在class内部添加一个不给外部访问的属性
const s1 = Symbol('foo')
const s2 = Symbol('foo')
console.log(s1 == s2) // false
console.log(Symbol('foo') == Symbol('foo')) // false

// for in    Object.keys  JSON.Stringify  都是拿不到Symbol的
// 所以特别适合作为类的私有属性