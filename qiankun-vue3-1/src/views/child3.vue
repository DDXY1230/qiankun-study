<!--  -->
<template>
<div class=''>
  {{projectName}}
  <button @click="sendchild3val">传值给父组件</button>
  <p>父组件传过来的桌子名称:{{deskName}}</p>
</div>
</template>

<script>
import { onUpdated, toRefs,ref,inject } from 'vue';
export default {
components: {},
data() {
return {

};
},
computed: {},
watch: {},
props: {
projectName: ''
},
setup(props,context){
  let deskName = inject('deskName')
  console.log('18', props)
  console.log('24',context)
  let { projectName } = toRefs(props)// 解构会使得响应式的数据失效,用toRefs解决即可
  onUpdated(() => {
    console.log('26', projectName.value)
  })
  let child3Val = ref('子组件3传过来的值')
  function sendchild3val() {
    context.emit('getchild3val', child3Val.value)
  }
  // 暴露公共函数
  function getPage() {
    console.log('这是被暴露的页码函数')
  }
  context.expose({
    getPage
  })
  return {sendchild3val,deskName}
  
},
created() {

},
mounted() {

},
methods: {

},
}
</script>
<style lang='scss' scoped>

</style>