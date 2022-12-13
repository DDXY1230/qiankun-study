const obj = {
  name: 'alice',
  age: 18
}
console.log(Reflect.ownKeys(obj))
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj,'age'))
console.log(Reflect.ownKeys(obj))
// Reflect 看起来更规范