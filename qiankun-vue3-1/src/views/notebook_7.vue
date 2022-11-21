<!--  -->
<template>
<div class=''>
call(this,a,b,) apllay(this,[a,b]) 会立即执行
bind(this,a,b) 执行会返回一个新的函数

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
// 手撕call源码分析
Function.prototype.myCall = function call(context,...params) {
  let self = this, key = Symbol('KEY');
  context == null ? context = window : null // 如果没传指向window
  // 如果不是对象,装换成对象
  !/^(object|function)$/i.test(typeof context) ? context = Object(context) : null
  context[key] = self
  let result = context[key](...params)
  delete context[key]
  return result
}
// bind 源码分析
Function.prototype.myBind = function bind(context, ...params) {
  let self = this
  return function proxy(...args) {
    // self.apply(context, params.concat(args))
    self.call(context, ...params,...args)
  }
}
// 借用数组的方式
function afunc() {
  // arguments.forEach(i => {
  //   console.log('53', i)
  // }) . //这里会报错因为没有数组上的方法
  // [].forEach.call(arguments, item => {
  //   console.log('52==>', item)
  // })
}
afunc(1,2,3,3,2,1)
</script>
<style lang='scss' scoped>

</style>