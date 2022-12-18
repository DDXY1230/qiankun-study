export default class Compile {
  constructor(el, vue) {
    this.$vue = vue;
    this.$el = document.querySelector(el);
    if (this.$el) {
      // 调用函数,让节点变为fragment, 类似于mustache中的tokens
      let $fragment = this.node2Fragment(this.$el);
      // 编译
      this.compile($fragment);
    }
  }
  compile(el) {
    let childNodes = el.childNodes;
    console.dir(childNodes);
    let self = this;
    childNodes.forEach((node) => {
      let text = node.textContent;
      if (node.nodeType == 1) {
        // 元素节点
        self.compileElement(node);
      } else if (node.nodeType == 3) {
        // 文本节点
        self.compileText(node);
      }
    });
  }
  compileElement(node) {
    // nodeType == 1
    let nodeAttrs = node.attributes;
    console.log(nodeAttrs);
    Array.prototype.slice.call(nodeAttrs).forEach((attr) => {
      let attrName = attr.name;
      let value = attr.value;

      // 检测是否是指令
      if (attrName.startsWith("v-")) {
        // v- 开头的指令
        // 指令都是v-开头的  所以从2位置开始截取
        let dir = attrName.substring(2);

        if (dir == "model") {
          // 双向数据绑定
        } else if (dir == "for") {
          // v-for循环
        }
      }
    });
  }
  compileText() {
    // nodeType == 3
  }
  node2Fragment(el) {
    let fragment = document.createDocumentFragment();
    let child;
    // 让节点都进入fragment,只要进入一个,实际上就会没了一个,内置的函数
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }
}
