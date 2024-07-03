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
}
window.customElements.define('lxm-btn', Btn)