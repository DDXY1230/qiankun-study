<!--  -->
<template>
  <div class=''>
    <p>
      vue父子组件生命周期加载顺序执行顺序?
      父beforeCreate => 父created => 父beforeMount =>
      子beforeCreate => 子created => 子beforeMount => 子mounted
      => 父mounted
    </p>
    <p>
      检测数据类型:
      1.typeof xx 
      直接在计算机底层基于数据类型的值(二进制)进行检测
      typeof null ===> object 对象存储在计算机中,都是以000开始的二进制,null也是,所以检测出来的结果是对象
      typeof 普通对象/数组对象/正则对象/日期对象/null 结果都是=》'object'
      typeof 111n => bigint
      一个树枝后面加n就是bigint类型

      2.instanceof 检测当前实力是否属于这个类
      底层机制:只要当前类出现在实例的原型链上,结果都是true
      由于我们可以肆意修改原型的指向,所以检测出来的结果是不准确的
      instanceof 不能检测基本数据类型
      例如 1 instanceof Number =》 false 
      instanceof基本类型处理不了

      3.constructor
      arr.constructor === Array     Array/RegExp/Object
      constructor可以处理基本数据类型
      同样也存在一个问题,就是constructor可以随便改,所以也不准

      4.相对于上面三种的不足,第四种是相对比较好而全面的了
      Object.prototype.toString.call(value) 这个最全面
      [object Object/Array/RegExp/Number/Function/Symbol/.......]




    </p>
  </div>
</template>

<script>
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


function Fn() {
  this.x = 100
}
// 肆意修改原型链接的指向
Fn.prototype = Object.create(Array.prototype)
let f = new Fn
console.log(f,f instanceof Array)

console.log(1 instanceof Number) // false

//实例.__proto__ === 类.prototype
function instance_of(example,classFunc) {
  let classFuncPrototype = classFunc.prototype
  let proto = Object.getPrototypeOf(example) // 等同于example.__proto__ ,浏览器不能直接用这个而已
  while(true) {
    if(proto === null) {
      //Object.prototype.__proto__ 找到最顶级都没有找到,直接返回false
      return false
    }
    if(proto === classFuncPrototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}
let arr = []
console.log(instance_of(arr, Array)) // true
console.log(arr.constructor === Array) // true
let num = 123
console.log(num.constructor === Number) // true
Number.prototype.constructor = 'AAA'
console.log(num.constructor === Number) // false 因为这里的上面更改了constructor为AAA了

let obj = {
  neme: 'Alick爱丽丝'
}
console.log(obj.toString()) //[object Object]
console.log(Object.prototype.toString.call(1)) //[object Number]
console.log(Object.prototype.toString.call([1,2,3])) //[object Array]
console.log(Object.prototype.toString.call(null)) //[object Null]
console.log(Object.prototype.toString.call(/^$/)) //[object RegExp]
console.log(Object.prototype.toString.call(111n)) //[object BigInt]


// 封装方法
let class2type = {}
let toString = class2type.toString // Object.prototype.toString
let typeArr = ['Boolean', 'Number','String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol']
typeArr.forEach(name => {
  class2type[`object ${name}`] = name.toLowerCase()
})
console.log(class2type)
function toType(obj) {
  if(obj === null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj == 'function' ?
  class2type[toString.call(obj)] || "object" : typeof obj
}
</script>
<style lang='scss' scoped>
</style>