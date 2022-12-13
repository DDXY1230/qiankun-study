const person = {
  name: 'alice',
  age: 18
}
const proxyPerson = new Proxy(person,{
  deleteProperty(target,property) {
    console.log('删除', property)
    delete target[property]
  },
  get(target,property) {
    console.log('get', target, property)
    return 100
  },
  set(target, property, newValue) {
    console.log('set', target,property,newValue)
    target[property] = newValue
  }
})
console.log(proxyPerson.age)
proxyPerson.habby = 'music'
console.log(person)
console.log(proxyPerson)
proxyPerson.boy = 'tom'
console.log(person)
console.log(proxyPerson)
// vue 3.0 就是用proxy实现数据响应的
delete proxyPerson['habby']
console.log(person)
console.log(proxyPerson)
console.log('-----------------------')
const list = []
const listProxy = new Proxy(list, {
  set(target, property, value) {
    console.log('set list', target, property, value)
    target[property] = value
    return true
  }
})
listProxy.push(100)
// console.log(list)
// console.log(listProxy)
