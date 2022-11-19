<!--  -->
<template>
<div class=''>
  <slot></slot>
  <p>这是一条分割下=====================</p>
  <slot name="haha"></slot>
  <slot name="aaa">没有传东西过来只显示默认内容</slot>
  <slot :info="{name:'张三',age:18}" :level="{rank: 10}" name="bigboxslot"></slot>
  
</div>
</template>

<script>

export default {
components: {},
data() {
return {

};
},
computed: {},
watch: {},
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