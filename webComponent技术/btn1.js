class Btn extends HTMLElement {
  constructor() {
    super()
    const shaDom = this.attachShadow({mode: "open"})
    this.p = this.h('p')
    this.p.innerText = 'lxm-失业了'
    this.p.setAttribute('style', 'width: 200px;height: 100px;border: 1px solid black;')
    shaDom.appendChild(this.p)
  }
  h(el) {
    return document.createElement(el)
  }
}
window.customElements.define('lxm-btn', Btn)