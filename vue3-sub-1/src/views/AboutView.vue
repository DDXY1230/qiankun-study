<template>
  <div class="about">
    <h1>This is an about page999</h1>
    <p>{{ props.from }}</p>
    <p>{{ props.to }}</p>
    <p>{{ props.jellyCat }}</p>
    <button @click="sendPramsToSub2">传参数给sub2</button>
  </div>
</template>

<script lang="ts" setup>
import WujieVue from 'wujie-vue3'
const { bus } = WujieVue
const props = window.$wujie?.props
console.log('来自wujie主应用的参数', window)
const sendPramsToSub2 = () => {
  console.log('传参数给sub2')
  bus.$emit('sendParams', '我来自sub1')
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
