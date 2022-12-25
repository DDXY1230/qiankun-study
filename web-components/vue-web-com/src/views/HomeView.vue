<template>
  <div class="home">
    <fc-bubbles Click>
      <!-- click 加好了,其他配置也配好了,但是无效, 可能vue3.0这里是一个bug 但是把Click大写 -->
    <img alt="Vue logo" src="../assets/logo.png">
    </fc-bubbles>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',

  components: {
    HelloWorld
  }
}
</script>
