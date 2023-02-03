<template>
  <div>

    订单列表
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs,onMounted } from "vue";
import { InitData } from "../types/order";
import { getList } from "../http/api";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      // getList({ page: data.selectData.page }).then(res => {
      //   console.log(res);
      // });
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>
<style scoped>
</style>