import parseTemplateToTokens from './parseTemplateToTokens'
window.Lxm_TemplateEngine = {
  render(templateStr, data) {
    console.log('render函数中的scanner开始工作11')
    let tokens = parseTemplateToTokens(templateStr)
    console.log("🚀 ~ file: index.js ~ line 6 ~ render ~ tokens", tokens)
  }
}