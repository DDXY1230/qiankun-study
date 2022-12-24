<template>
  <div>about</div>
</template>
<script>
// import axios from 'axios'
export default {
  name: 'About',
  components: {},
  // asyncData 是nuxt特殊提供的钩子函数,专门用来获取页面服务端渲染的数据
  async asyncData() {
    // const {data} = await axios({
    //   method: 'GET',
    //   url: ''
    // })

    // 这里返回的数据会和 vue中的data合并
    return {
    }
  }
}

</script>