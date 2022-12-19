<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>count: {{ num }}</p>
    <p>msg: {{ message }}</p>
    <p>reverseMsg: {{ rMsg }}</p>
    <button @click="add(10)">点击+10</button>
    <button @click="$store.commit('add', 2)">mutation加2</button>
    <button @click="actionAdd(50)">action加50</button>
    <button @click="$store.dispatch('addAsync', 20)">action加20</button>
    <h3>模块</h3>
    <p>products: {{ products }}</p>
    <button @click="setProducts">products/setProducts方法执行</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    // mapState 、 mapGetters 可以传数组和对象, 对象方便对映射的对象进行改名
    // ...mapState(["count", "msg"])
    ...mapState({
      num: "count",
      message: "msg",
    }),
    ...mapState("products", ["products"]),
    ...mapGetters({
      rMsg: "reverseMsg",
    }),
  },
  methods: {
    // mutation 中的 state 不需要传  不要在mutation中写异步代码
    ...mapMutations("cart", ["add"]),
    // addcount() {
    //   this.add(5)
    // }

    // action 异步代码,调用mutation提交代码
    ...mapActions({
      actionAdd: "addAsync",
    }),
    ...mapMutations("products", ["setProducts"]),
  },
};
</script>
