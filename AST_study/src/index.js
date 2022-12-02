
import parse from './parse'


let templateStr = `<div class="box">
  <h3 class="title strong" id="bigTitle" style="color: red">你好</h3>
  <ul>
    <li>今天天气真好!</li>
    <li>我想买包包!</li>
    <li>送给自己一束花!</li>
  </ul>
</div>
`
const ast = parse(templateStr)
console.log(ast)
let root = document.getElementById('root')
console.log("🚀 ~ file: index.js ~ line 17 ~ root", root)
root.innerHTML = templateStr