<!--  -->
<template>
<div class=''>
  <p>
    1.js中三类循环对比以及性能分析?
    用let  for循环的性能比while好一些
    用var  for和while差不多
    foreach比for性能差一些
    但是平时编程比价看中过程,更多关注的是结果
    更加喜欢函数式编程
    如果循环的量级比较大建议for

    for in 循环性能很差 (史上最垃圾的循环):迭代当前对象中所有可枚举的属性(私有属性大部分是可枚举的,共有属性『出现在所属类的圆形上的』
    也有部分是可枚举的) 查找机制上一定会找到原型链上的,有的对象原型链是非常非常长的

  </p>
</div>
</template>

<script>

export default {
components: {},
data() {
return {

};
},
computed: {},
watch: {},
created() {

},
mounted() {

},
methods: {

},
}
// forEach的源码大概
// Array.prototype.forEach = function forEach(callback, context) {
//   let self = this, i = 0, len = self.length;
//   context = context == null ? window : context
//   for(;i < len; i++) {
//     typeof callback === 'function' ? callback.call(context, self[i], i) : null
//   }
// }
</script>
<style lang='scss' scoped>

</style>