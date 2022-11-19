<!--  -->
<template>
  <div class=''>
    <p>
      {{msg}}
    </p>
    <p>
      {{reverseMsg}}
    </p>
    <button @click="changemsg">改变上面的值</button>
    <p>名字:{{obj.name}}</p>
    <p>名字:{{name}}</p>
    <button @click="changeObjname">改变名字</button>
    <hr>
    <p>{{projectName}}</p>
    <button @click="change3">改变上面的值</button>
    <child3 class='box' ref="child3" :projectName="projectName" @getchild3val="getchild3val"></child3>
    <button @click="getpage">获取页码数</button>
    <button @click="changeDesk">改变桌子</button>
  </div>
</template>

<script>
import child3 from './child3'
import { ref,reactive, toRefs,watch, watchEffect,computed,onMounted,provide } from 'vue'
export default {
  components: {child3},
  data() {
    return {
      // projectName: 'notebook3传过来的值'
    };
  },
  computed: {},
  props: {
    msg: 'hhh'
  },
  watch: {},
  setup(props) {//接收父组件传过来的值,这里写了props上面也是写
  // props是响应式的,不能用es6进行解构,否则会消除prop的响应式
    console.log('30', props)
    // 在setup中应该避免使用this,因为他不会找到组件实例
    console.log('setup, 在beforeCreate和created中做的事情,统统可以在setup中做')
    let deskName = ref('书桌')
    provide('deskName',deskName)// 这个地方不要.value
    function changeDesk() {
      deskName.value = '饭桌'
    }

    // 用ref实现响应式
    let msg = ref('setup的msg') // ref() 返回带有value属性的对象
    function changemsg() {
      msg.value = '被改变的msg'
    }

    //通过reactive定义引用类型的数据
    let obj = reactive({
      name: '李四',
      age: 18
    })
    function changeObjname() {
      obj.name = 'Alice'
    }
    
    // watch的使用,这里的msg不用假value
    watch(msg,(nv,ov) => {
      console.log(nv,ov)
    })
    watch(obj,(nv,ov) => {
      console.log('46', nv,ov)
    })
    watchEffect(()=>{ 
    // watchEffect(回调函数) 注意不需要指定监听属性,
    //组建初始化的时候会执行一次自动收集依赖
      console.log(obj.name)
    })
    // watch和watchEffect的区别
    // watchEffect不需要指定监听的属性,自动收集依赖,只要在回调中饮用到了响应式的属性,只要这些属性发生变化,回调就会执行
    //watch只能监听制定的属性,作出回调函数的执行,可以获取到新值和旧值.watchEffect拿不到旧的值
    // watchEffect在组件初始化的时候就会执行一次

    const reverseMsg = computed(() => {
      return msg.value.split('').reverse().join('=')
    })
    console.log(reverseMsg.value)// 这里也要value才能答应出来
    onMounted(() => {
      console.log('在组合式api中使用生命周期函数前面加on')
    })
    onMounted(() => {
      console.log('在组合式api中使用生命周期函数前面加on,可以执行多次')
    })
      let projectName = ref('notebook3传过来的值')
    function change3(){
      projectName.value = projectName.value + '-更新的值'
    }
    // 下面直接通过es6三点结构会使得响应式失效,可以使用roRefs解决此问题
    return {msg,changemsg,changeDesk,change3,projectName,changeObjname,obj,...toRefs(obj),reverseMsg} // 导出的时候不用写value
  },
  created() {},
  mounted() {},
  methods: {
    getchild3val(v) {
      console.log('notebook===94',v)
    },
    getpage() {
      this.$refs.child3.getPage()
    }
  }
};
</script>
<style lang='scss' scoped>
</style>