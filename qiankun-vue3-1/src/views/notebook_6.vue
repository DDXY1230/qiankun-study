<!--  -->
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
Object.prototype.fn1 = function fn() {};
let obj = {
  name: "Alice",
  age: 18,
  [Symbol("AA")]: 100,
  0: 200,
  1: 300
};
for (let key in obj) {
  // if(!obj.hasOwnProperty(key))  break // 发现不是私有的跳出 解决下面描述的第3点
  console.log(key); // 0,1,name,age, fn1
  // 1.遍历数字优先 2.无法遍历Symbol属性 3.可以遍历到公有中可枚举的(自己写的方法fn1)
}
console.log(Object.keys(obj)) // 可读取对象中的所有非Symbol属性
console.log(Object.getOwnPropertySymbols(obj))// 拿到对象中所有Symbol属性
// keys  和 getOwnPropertySymbols拼到一起解决for ..in.. [2.无法遍历Symbol属性]这个问题
</script>
<style lang='scss' scoped>
</style>