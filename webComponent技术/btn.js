class Btn extends HTMLElement {
  constructor() {
    super()
    const shaDom = this.attachShadow({mode: "open"})
    this.template = this.h('template')
    this.template.innerHTML = `<style>
    div{width: 200px;height: 200px;border: red solid 1px;}
    </style></style><div>今天天气真好</div>`
    // 这里的样式不会影响到外面的,这里比较安全,隔离的很好
    shaDom.appendChild(this.template.content.cloneNode(true))
  }
  h(el) {
    return document.createElement(el)
  }
  // 是个生命周期
  connectedCallback() {
    console.log('connectedCallback==111')
  }
  // 当自定义元素与文档dom断开时调用
  disconnectedCallback() {
    console.log('disconnectedCallback==222')
  }
  //当自定义元素被移动到新文档时调用
  adoptedCallback() {
    console.log('adoptedCallback==333')
  }
  // 当自定义元素的一个属性被增加、移动、更改时候被调用
  attributeChangeCallback() {
    console.log('attributeChangeCallback==444')
  }
}
window.customElements.define('lxm-btn', Btn)