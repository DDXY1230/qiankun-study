<template>
  <div class="about">
    <h1>This is an about page</h1>
    <my-bubbles Click class="bubbles">自己定义的bubbles</my-bubbles>
    <long-time class="undefined">loading...</long-time>
    <Jsx></Jsx>
  </div>
</template>
<script>
import Jsx from './webCom.jsx'
export default {
  name: 'AboutPage',
  components: {
    Jsx
  },
  mounted () {
    customElements.define('my-bubbles', class extends customElements.get('fc-bubbles') {
      constructor () {
        super()
        this.onclick = () => console.log('我们自己的bubbles')
      }
    })
    // 这里有一万行代码,加载大约需要3秒
    setTimeout(() => {
      customElements.define('long-time', class extends HTMLElement {
        constructor () {
          super()
          this.innerHTML = '<h1>好久不见</h1>'
        }
      })
    }, 3000)
    customElements.whenDefined('long-time').then(() => {
      document.querySelector('long-time').innerHTML = '我出现了'
    }).catch(err => console.log(err))

    // upgrade的用法,用来未定义使用标签
    const el = document.createElement('vue-react-l')
    class VuReactL extends HTMLElement {}
    customElements.define('vue-react-l', VuReactL)
    console.log(el instanceof VuReactL) // false
    customElements.upgrade(el)
    console.log(el instanceof VuReactL) // true
  }
}
</script>
<style>
:not(:defined) {
/* .undefined { */
display: inline-block;
width: 100px;
height: 30px;
background:gray linear-gradient(60deg, transparent, transparent 20%, white 40%, transparent 60%) 0 / 300%;
border-radius: 15px;
border: 1px solid red;
animation: loading 2s infinite;
}
@keyframes loading {
  to {background-position: 300% 0;}
}
.bubbles{
  width: 200px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid red;
}
</style>
