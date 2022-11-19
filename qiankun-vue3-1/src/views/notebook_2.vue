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
      <template v-slot:aaa>
        <p>如果传了就显示传过来的内容</p>
      </template>
      <template #bbb>
        <p>v-slot:可以简写成#</p>
      </template>
      <template v-slot:bigboxslot="obj" > 
        <p>作用域插槽</p>
        <p>{{obj}}</p>
      </template>
    </child>
    <child1></child1>
  </div>
</template>

<script>
import child from "./child";
import child1 from "./child1";
export default {
  components: {
    child,
    child1
  },
  // provide: {
  //   msg: '这是跨级传过来的数据'
  // },// 这种方式不能传data中的数据,如果需要可以用一下方式,如果要实现响应式,那么可以
  // 写在一个对象里面传过去,或者传一个函数过去
  provide() {
    return {
      msg: this.msg + '这个是父级传过去的数据'
      // msg: () => this.msg
      // msg: obj
    }
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