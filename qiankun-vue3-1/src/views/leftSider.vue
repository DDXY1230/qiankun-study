<!--  -->
<template>
<div class=''>
  这里是leftSider的内容
</div>
</template>


<script setup>
import { useRoute } from 'vue-router'
const props = defineProps({
  id: String
})
console.log('14', props)
</script>
<style lang='scss' scoped>

</style>