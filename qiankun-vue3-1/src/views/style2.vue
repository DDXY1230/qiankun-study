<!--  -->
<template>
<div class=''>
  这里是style22222的内容
</div>
</template>
<script setup>
const props = defineProps({
  id: String
})
console.log('11', props)
 
</script>
<!-- 以下是选项式方式获取路由参数 -->
<!-- <script>

export default {
components: {},
props: {
  id: {
    type: String
  }
},
data() {
return {

};
},
computed: {},
watch: {},
created() {

},
mounted() {
  console.log('28', this.id)
},
methods: {

},
}
</script> -->


<style lang='scss' scoped>

</style>