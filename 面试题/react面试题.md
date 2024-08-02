1.为什么之前文件前面都要写import react from 'react' 后来又不用了
因为后来babel升级了,加了automatic的模式
2.说说stack reconciler和fiber reconciler
传统的dom的本质是一棵树,那么我们遍历dom的时候,一般情况要递归
fiber通过return、child sibling 之间的关系,构成了可以不递归的遍历
3.react中有那几种数据结构
  四种
  - v-dom/element
  是通过函数组件返回值,或者类组件render函数的返回值得到
  本质是一个大的对象
  - current fiber
  当前react内存中,表示当前数据状态的核心数据结构
  - workInProgress fiber
  状态更新时,生成的,在我的react完成调和commitWork更新之后,会切换成current fiber
  - 真实的dom
  总结:react调和的过程, 就是currentfiber和v-dom对比, 生成子组件workInProgress fiber的过程

4. 说一下react更新的流程
beginwork



