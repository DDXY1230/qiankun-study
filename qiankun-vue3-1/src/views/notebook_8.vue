<!--  -->
<template>
  <div class=''>
    <p>
      1.面试必问: Ajax、axios、Fetch的核心区别?

      2. for in 适用于纯对象的遍历，并且只能输出可枚举属性
        for of适用于无需知道索引值的数组遍历，因为可以中断。另外对于其他字符串，类数组，类型数组的迭代，for of也更适用
        forEach适用于需要知道索引值的数组遍历，但是不能中断

    </p>

  </div>
</template>

<script>
import _ from ".././utils";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
// 数组的浅拷贝 只能拷贝一维,二维三维拷贝不了,还是引用
let a = [1, 2, 3, 4];
let b = [...a];
let c = a.concat([]);
let d = a.slice(0);
console.log(a, b, c, d);
// 对象的浅拷贝
let obj1 = { a: "aaa", b: "bbb" };
let newObj1 = { ...obj1 };
let newObj2 = Object.assign({}, obj1);
console.log(obj1, newObj1, newObj2);
// 也可以用for...in...循环遍历生成一个对象,但是for...in...无法拷贝Symbol属性,因为Symbol不可枚举
//for...in...只遍历可枚举的
// Object.keys(obj)获得对象中所有的属性,但是Symbol也是获取不到的
// Object.getOwnPropertySymbols(obj) 拿到对象中所有Symbol属性
// 如果对象中有Symbol和其他属性,想要都拷贝出来可以用一下方法
let obj2 = { a: "111", [Symbol("2")]: "123" };
let _obj2 = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)];
console.log("38", _obj2);
let copyObj2 = {};
for (let i of _obj2) {
  //for of 循环的原理是按照迭代器规范来的,数组有迭代器,对象没有迭代器
  copyObj2[i] = obj2[i];
}
console.log("43", copyObj2);
//===========================================
//浅拷贝方法封装
function shallClone(obj) {
  let type = _.toType(obj),
    Ctor = obj.constructor;
  // 对于Symbol/ BigInt
  if (/^(symbol|bigint)$/i.test(type)) return Object(obj);

  // 对于正则/日期的处理
  if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);

  // 对于错误对象的处理
  if (/^(error)$/i.test(type)) return new Ctor(obj.message);

  // 对于函数
  if (/^function$/i.test(type)) {
    return function() {
      return obj.call(this, ...arguments);
    };
  }

  // 对于对象/数组的处理
  if (/^(object|array)$/i.test(type)) {
    let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
    let result = new Ctor();
    // 方法一
    for (let index of keys) {
      result[index] = obj[index];
    }
    // 方法二
    // keys.forEach((i,index) => {
    //   if(/^(array)$/i.test(type)) result[index] = obj[i] // 数组
    //   if(/^(object)$/i.test(type)) result[i] = obj[i] // 对象
    // })
    // let result = new Ctor()
    return result;
  }
  return obj;
}
// console.log(shallClone(['1',Symbol("AA")]))
// console.log(shallClone({a:'1',[Symbol("AA")]: '222'}))
// console.log(Symbol("AAbbcc"))
// console.log(shallClone(Symbol("AAbbcc")))

// 深克隆
function deepClone(obj, cache = new Set()) {
  let type = _.toType(obj);
  let Ctor = obj.constructor;
  if (!/^(object|array)$/i.test(type)) return shallClone(obj);
  // 避免无限套娃
  if(cache.has(obj)) return obj
  cache.add(obj)

  let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
  let result = new Ctor();
  for (let index of keys) {
    result[index] = deepClone(obj[index],cache);
  }
  return result;
}
let da1 = {a: {a:1212}}
let sa1 = shallClone(da1)
console.log("🚀 ~ file: notebook_8.vue ~ line 104 ~ sa1", sa1)
let da2 = deepClone(da1)
console.log("🚀 ~ file: notebook_8.vue ~ line 106 ~ da2", da2)
console.log(da1.a == sa1.a) // true
console.log(da1.a == da2.a) // false

//------------------------------------

</script>
<style lang='scss' scoped>
</style>