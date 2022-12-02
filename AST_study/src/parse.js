import parseAttrsString from './parseAttrsString'

export default function parse(templateStr) {
  // 指针
  let index = 0
  //剩余部分
  let rest = ''
  // 开始标记
  let startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
  // 结束标签
  let endRegExp = /^\<\/([a-z]+[1-6]?)\>/
  // 检测标签中的文字
  let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/ 
    // 准备两个栈
    let stack1 = [],
      stack2 = [] // 也可以初始化的时候就补充一个children
  while (index < templateStr.length) {
    rest = templateStr.substring(index)
    if (startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1]
      let attrsString = rest.match(startRegExp)[2]
      console.log('attrsString',attrsString)
      console.log('检测到开始标签', tag)
      stack1.push(tag)
      stack2.push({'tag': tag, 'children': [],'attrs': parseAttrsString(attrsString)})
      index += tag.length + 2 + (attrsString ? attrsString.length : 0)
    } else if (endRegExp.test(rest)) {
      let tag = rest.match(endRegExp)[1]
      console.log('监测到结束标签', tag)
        let pop_tag = stack1.pop()
      if (tag == pop_tag) {
        let pop_arr = stack2.pop()
        if(stack2.length > 0) {
          stack2[stack2.length - 1].children.push(pop_arr)
        }
      } else {
        throw new Error('出错!你有未封闭的标签存在!')
      }
      index += tag.length + 3
      console.log(stack1,JSON.stringify(stack2))
    } else if (wordRegExp.test(rest)) {
      let word = rest.match(wordRegExp)[1]
      if (!/^\s+$/.test(word)) {
        // 文字为非空
        console.log('检测到文字', word)
        stack2[stack2.length - 1].children.push({text: word, 'type': 3})
      }
      index += word.length
    } else {
      index++
    }
  }
  return templateStr
}