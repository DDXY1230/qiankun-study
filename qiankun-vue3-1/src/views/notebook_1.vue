<template>
  <div class="about">
    <h1>This is notebook_1</h1>
    <p>
      1.
      call,apply,可以立即执行,bind不会立即执行
      apply参数要求时数组
    </p>
    <p>
      2.深拷贝和浅拷贝
      浅拷贝:
      let obj1 = {a:1,b:2}
      let obj2 = Object.assign(obj1)
      深拷贝:
      JSON.parse(JSON.stringfy(objs))
      function copy(obj) {
      let newobj = {}
      for(let key in obj) {
      if(typeof obj[key] == 'object'){
      newobj[key] = copy(obj[key])
      }else {
      newobj[key] = obj[key]
      }
      }
      return newobj
      }
    </p>
    <p>3.
      localstorage、sessionStorage、cookie、的区别<br />
      数据存放的有效期:
      sessionStorage浏览器关闭就没了
      要是用cookie必须要是线上环境比如http//localhost:808
      document.cookie='name=8989;expires=' + data.toUTCString()+''

      cookie的存储量不能超过4k
      localstorage、sessionStorage、存储不能超过5m
      当然不同浏览器 也有所差别
    </p>
    <p>4.
      语义话标签的易读性和维护性更高
      有利于seo搜索引擎搜索
      低版本ie浏览器不兼容 ie8以下不兼容
      可以通过html5shiv.js处理
    </p>
    <p>5.
      ::before ::after伪元素 (两个冒号)
      :hover 伪类 (一个冒号)
    </p>
    <p>6.
      手机端ios键盘首字母的清除方式
      在input中设置成off即可
      type="text" autocapitalize="off"
    </p>
    <p>7.
      chrome浏览器的默认字体16px
      如果要更小的现实只能用css
      -webkit-transform: scale(.8)
    </p>
    <p>8.
      rem和em的区别
      移动端的字体适配
      相对于font-size
      rem针对根元素做比较
      em针对父元素做比较
      rem比较好用
      只要设置了html的fontsize
    </p>
    <p>
      9.
      ios系统中元素被触摸的产生的半透明灰色遮罩怎么去除
      a,button,input,textarea{
      -webkit-tap-highlight-color: rgba(0,0,0,0)
      }
    </p>
    <p>
      10.webkit表单输入框placeholder的颜色值怎么修改?
      input::-webkit-input-placeholder {color:red}
    </p>
    <p>
      11.自适应
      使用淘宝无限适配+布局单位rem
      原理 window.onresize=function(){}
    </p>
    <p>
      12.响应式布局
      一个url可以响应多端
      语法结构:@media only screen and (max-width: 100px){
        ul li {width: 200px}
      }
      响应式图片如下代码,请在源代码看
      <picture>
        <source srcset="../assets/1.jpg" media="(min-width:1000px)">
        <source srcset="../assets/2.jpg" media="(min-width:700px)">
        <img src="../assets/3.jpg" alt="">
      </picture>
    </p>
    <p>
      13.布局方案
      @media会造成网页打开比较慢
      一般用于数据不多,用户少,一般用于纯展示类的网页,专题页等
      想淘宝这种要求性能的网站就不适合,因为会降低家在速度
      pc + 移动端适合于访问量比较大的,pc端是一套,移动端是一套
    </p>
    <p>
      14.禁止ios长按时触发系统的菜单,禁止ios&android长按时下载图片
      1.长按ios触发系统菜单的处理方式
      html,body{
        touch-callout: none;
        -webkit-touch-callout: none
      }
      2.禁止用户选中文字,同时也会禁止下载
      user-select:none
      -webkit-user-select:none
    </p>
    <p>
      16.
      some和every的区别
      some如果有一项匹配则返回true
      every必须所有都匹配返回true
    </p>
    <p>
      17.
      vue源码中体现的优先级是:
      props ==> methods ==> data ==> computed ==>watch
    </p>
    <p>
      18.
      vuex有哪些属性?
      State,Getters,Mutations,Actions,Modules
    </p>
    <p>
       19.
       vue中的路由模式有两种:hash history
       hash带有#
       history颜值高,当找不到的时候会发送请求,hash不会
       前端自测用hash,如果使用histiry会出现空白页
    </p>
    <p>
      20.spa是什么
      spa是单页面应用
      缺点是:seo优化不好
      性能不是很好
    </p>
    <p>
      {{name}}
    </p>
    <!-- 当name数据发生变化时,v-once的值不会更新 -->
    <p v-once>{{name}}</p>
    <!-- v-on: 的语法糖时@ -->
    <button @click="changename()">改变名字</button>
    <!-- v-html会解析字符串中的html -->
    <p v-html="htmlstring"></p>
    <p>{{htmlstring}}</p>
    <!-- v-bind: 可以之间简写为: -->
    <p v-bind:id="id" style="height:10px;background:red"></p>
    <p>{{name.split('').reverse().join('=')}}</p>
    <!-- 动态参数 -->
    <p :[attr]="id">hhhhhhhhh哈哈哈哈哈哈</p>
    <p v-bind:[name]="id">hhhhhhhhh哈哈哈哈哈哈</p>
    <!-- 动态事件 -->
    <button @[mouseEvent]="changename">动态事件</button>
    <button v-on:[mouseEvent]="changename">动态事件</button>
    <p>{{reverId}}</p>
    <p>{{reverName}}</p>

  </div>
</template>
<script>
export default {
  data() {
    return {
      attr: 'bigId',
      id: '001',
      name: '张三',
      htmlstring: '<span>nihao</span>',
      mouseEvent: 'click'
    }
  },
  computed: {
    // 简写
    reverId() {
      return this.id.split('').reverse().join('')
    },
    // 完整的写法
    reverName: {
      get: function() {
        return this.name.split('').reverse().join('======')
      },
      set:function(val) {
        // 更改的时候调用, 一般么有set方法,
        console.log(val)
      }
    }
  },
  watch: {
    name(newv,oldv) {
      console.log('197', newv,oldv)
    }
  },
  methods:{
    changename() {
      this.name = '李四'
    }
  }
}
</script>
