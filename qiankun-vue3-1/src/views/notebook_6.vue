
<template>
  <div class=''>
    <p>
      1.js中三类循环对比以及性能分析?
      用let for循环的性能比while好一些
      用var for和while差不多
      foreach比for性能差一些
      但是平时编程比价看中过程,更多关注的是结果
      更加喜欢函数式编程
      如果循环的量级比较大建议for

      for in 循环性能很差 (史上最垃圾的循环):迭代当前对象中所有可枚举的属性(私有属性大部分是可枚举的,共有属性『出现在所属类的圆形上的』
      也有部分是可枚举的) 查找机制上一定会找到原型链上的,有的对象原型链是非常非常长的

      for key遍历的方式是以数字优先,无法遍历symbol属性,可以遍历到公有中的可枚举的

      for of 循环的原理是按照迭代器规范来的
      数组/部分类数组argument/Set/Map这些是实现了迭代器规范的,可以用哪个for of
      对象没有实现迭代器规范不能用for of

    </p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
// forEach的源码大概
// Array.prototype.forEach = function forEach(callback, context) {
//   let self = this, i = 0, len = self.length;
//   context = context == null ? window : context
//   for(;i < len; i++) {
//     typeof callback === 'function' ? callback.call(context, self[i], i) : null
//   }
// }

//    for key遍历的方式是以数字优先,无法遍历symbol属性,可以遍历到公有中的可枚举的
// Object.prototype.fn1_123 = function () {};
let obj = {
  name: "Alice",
  age: 18,
  [Symbol("AA")]: 100,
  0: 200,
  1: 300
};
for (let key in obj) {
  // if(!obj.hasOwnProperty(key))  break // 发现不是私有的跳出 解决下面描述的第3点
  console.log(key); // 0,1,name,age, fn1_123
  // 1.遍历数字优先 2.无法遍历Symbol属性 3.可以遍历到公有中可枚举的(自己写的方法fn1)
}
console.log(Object.keys(obj)) // 可读取对象中的所有非Symbol属性
console.log(Object.getOwnPropertySymbols(obj))// 拿到对象中所有Symbol属性
// keys  和 getOwnPropertySymbols拼到一起解决for ..in.. [2.无法遍历Symbol属性]这个问题



// 手写迭代器,(随意控制内部机制)
let aArr = [1,2,3,4,5,6,7,8,9]
aArr[Symbol.iterator] = function() {
  let self = this
  let index = -1
  return {
    next() {
      if(index > self.length - 1) {
        return {
          done: true,
          value: undefined
        }
      }
      index++ // 可以随意控制步骤
      return {
        done: false,
        value: self[index]
      }
    }
  }
}
for(let val of aArr) {
  console.log('88==>', val)
}


//-------
let obj1 = {0: 100,1: 200,2: 300,3: 400,length: 4}
obj1[Symbol.iterator] = Array.prototype[Symbol.iterator]
for(let val of obj1) {
  console.log('96',val)
}
</script>
<style lang='scss' scoped>
</style>