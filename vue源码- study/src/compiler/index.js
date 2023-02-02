const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*`)
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>']+)))?/
const startTagClose = /^\s*(\/?)>/
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g


function parseHTML(html) {
  function advance(n) {
    html = html.substring(n)
  }

  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)

      let attr, end
      while (!html.match(startTagClose) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push({name: attr[1],value: attr[3] || attr[4] || attr[5]})
      }
      if (end) {
        advance(attr[0].length)
      }
    }
    return false
  }
  while (html) {
    // 如果是0 说明是一个开始标签或者是一个结束标签或者文本的结束位置
    let textEnd = html.indexOf('<')
    if (textEnd == 0) {
      const startTagMatch = parseStartTag()
      if(startTagMatch) {
        continue
      }
      let endTagMatch = html.match(endTag)
      if(endTagMatch) {
        advance(endTagMatch[0].length)
        continue
      }
    }
    if(textEnd > 0) {
      let text = html.substring(0,textEnd)
      if(text) {
        advance(text.length)
      }
    }
  }
}

export function compileToFunction(template) {
  // 将template转化成ast语法树
  let ast = parseHTML(template)
}