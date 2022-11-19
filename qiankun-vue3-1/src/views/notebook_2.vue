<!--  -->
<template>
  <div class=''>
    <child>
      <template v-slot:haha>
        <p>
          {{msg}}=======
          v-slot只能在template标签上
        </p>
      </template>
      <p>默认插槽</p>
      <template v-slot:aaa></template>
      
      <template v-slot:bigboxslot="obj" > 
        <p>作用域插槽</p>
        <p>{{obj}}</p>
      </template>
    </child>
  </div>
</template>

<script>
import child from "./child";
export default {
  components: {
    child
  },
  data() {
    return {
      msg: '你好'
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
</style>