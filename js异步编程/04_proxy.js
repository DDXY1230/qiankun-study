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
console.log(person.age) // 直接获取18
console.log(proxyPerson.age) // 会走get函数

person.habby = 'music222' // 给原对象和代理对象加属性,两个上面都会被添加
console.log('person==>',person)
console.log('proxyPerson==>',proxyPerson)


person.aaa = 'aaa'
console.log('person==>',person)
console.log('proxyPerson==>',proxyPerson)
// 愿对象和代理对象发生改变,两个都会改变
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

const man = {
  name: 'jack',
  age : 18
}
const proxyMan = new Proxy(man, {
  get(target, property) {
    if(property in target) {
      console.log(target[property])
      return target[property]
    }else {
      throw new Error('don,t has this property')
    }
  },
  set(target,property,value,recerver) {
    console.log('====>',target,property,value,recerver)
    target[property] = value
  }
})
console.log('---',proxyMan.name)
// console.log(proxyMan.aa)
proxyMan.bbb = 'bbb'
console.log(proxyMan, man)
 