<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld ref="HelloWorld" msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  setup() {
    const helloworld = ref<InstanceType<typeof HelloWorld | null>>(null)
    onMounted(() => {
      console.log(helloworld.value)
    })
    return {
      helloworld
    }
  }
});
</script>
