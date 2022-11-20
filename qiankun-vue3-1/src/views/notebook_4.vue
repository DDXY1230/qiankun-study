<!-- setup组合式api写法 -->
<template>
  <child4></child4>
  <child4></child4>
  {{a}}
  <hr>
  {{b}}
  <button @click="changeB">改变b的值</button>
  <hr>
  <router-link to="/notebook_4/style1/456">样式一</router-link> |
  <router-link to="/notebook_4/style2/123">样式二</router-link>
  <button @click="goNotebook1">去notebook_1</button>
  <router-view></router-view>
  <router-view name="leftSider"></router-view>
  <router-view name="rightSider"></router-view>
</template>
<!-- 在setup中写代码,引入组件不需要注册,也不需要暴露出去
定义响应式的变量需要引入ref
由于组合式api没有this,所以动态路由取参数需要引入useRoute处理
 -->
<script setup>
import child4 from './child4'
import {ref} from 'vue'
import { useRoute } from 'vue-router';

console.log('19',useRoute())
console.log('20',useRoute().params)// 等同于在选择式api中的this.$route.params.id

const a = '这是一个常量'

let b = ref('这是一个响应式的数据')
function changeB () {
  b.value = b.value + '更新'
}

</script>
<script>
export default {
  methods: {
 goNotebook1() {
  this.$router.push({path: '/notebook_1',replace: true})
  // replace: true表示不记录历史记录 替换了上个链接
  // this.$router.go(-1)  .back() 后退一步   .forword()前进一步
}
  }
}
</script>
<style lang='scss' scoped>

</style>