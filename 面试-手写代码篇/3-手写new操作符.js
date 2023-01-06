/* 
在调用new的过程中会发生以下4件事情
1. 首先创建了一个新的空对象
2. 设置原型,将对象的原型设置为函数的prototype对象
3. 让函数的this指向这个对象,执行构造函数的代码
4. 判断函数的返回值类型,如果值类型,返回创建的对象, 如果引用类型, 就返回这个引用类型的对象
 */
function objectFactory() {
  let newObject = null
  let constructor = Array.prototype.shift.call(arguments)
  let result = null
  if(typeof constructor !== 'function') {
    console.log('type error')
    return
  }
  //新建一个空对象,对象的原型为构造函数的prototype对象
  newObject = Object.create(constructor.prototype)
  // 将this指向新对象,并执行函数
  result = constructor.apply(newObject, arguments)
  // 判断返回对象
  let flag = result && (typeof result == 'object' || typeof result == 'function')
  return flag ? result : newObject
}
//使用方式
//objectFactory(构造函数, 初始化参数)