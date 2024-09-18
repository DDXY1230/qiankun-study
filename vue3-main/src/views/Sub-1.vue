<!-- 子应用1的展示区域 -->
<template>
  <div class="">
    <h2>子应用1的展示区域</h2>
    <div class="box">
      <WujieVue
        width="100%"
        height="100%"
        name="sub-1"
        :url="url"
        :sync="true"
        :beforeLoad="lifecycles.beforeLoad"
        :beforeMount="lifecycles.beforeMount"
        :afterMount="lifecycles.afterMount"
        :beforeUnmount="lifecycles.beforeUnmount"
        :afterUnmount="lifecycles.afterUnmount"
      ></WujieVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
let url = ref('http://localhost:5174/')
const props = {}
const fetch = () => {}
const lifecycles = {
  beforeLoad: (appWindow: Window) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow: Window) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow: Window) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow: Window) =>
    console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow: Window) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow: Window) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow: Window) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url: '', e: Error) => console.log(`${url} 加载失败`, e)
}
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid red;
  min-height: 500px;
}
</style>
