<!-- setup组合式api写法 -->
<template>
  <child4></child4>
  <child4></child4>
  {{a}}
  <hr>
  {{b}}
  <button @click="changeB">改变b的值</button>
</template>
<!-- 在setup中写代码,引入组件不需要注册,也不需要暴露出去
定义响应式的变量需要引入ref
 -->
<script setup>
import child4 from './child4'
import {ref} from 'vue'

const a = '这是一个常量'

let b = ref('这是一个响应式的数据')
function changeB () {
  b.value = b.value + '更新'
}
</script>
<style lang='scss' scoped>

</style>