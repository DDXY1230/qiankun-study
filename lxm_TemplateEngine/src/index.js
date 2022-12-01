import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'
window.Lxm_TemplateEngine = {
  render(templateStr, data) {
    console.log('render函数中的scanner开始工作11')
    let tokens = parseTemplateToTokens(templateStr)
    console.log("🚀 ~ file: index.js ~ line 7 ~ render ~ tokens", tokens)
    let domStr = renderTemplate(tokens, data)
    console.log("🚀 ~ file: index.js ~ line 9 ~ render ~ domStr", domStr)
    return domStr
  }
}