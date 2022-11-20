<!--  -->
<template>
<div class=''>
  这里是style11111的内容
  <button @click="goDetail">去notebook_4</button>
</div>
</template>

<script setup>
import { useRoute,useRouter } from 'vue-router'
const props = defineProps({
  id: String
})
console.log(useRouter())
const router = useRouter()
const goDetail = () => {
      router.push({ path: '/notebook_4' })
}
console.log('13', props)
</script>
<style lang='scss' scoped>

</style>