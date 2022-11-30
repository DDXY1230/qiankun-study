// 整合折叠tokens,多维数组

export default function nestTokens(tokens) {
  let nestedTokens = []
  let collector = nestedTokens
  // 准备一个栈
  let sections = []
    for(let i = 0; i < tokens.length; i++) {
      let token = tokens[i]
      // debugger
      switch(token[0]) {
        case '#':
          collector.push(token)
          console.log('collector==>',collector)
          sections.push(token)
          token[2] = []
          collector = token[2]
          break
        case '/':
          let section_pop = sections.pop()
          collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
          break
          default:
            collector.push(token)
      }


      // 一下方法无法折叠多位数组
      // switch(token[0]) {
      //   case '#':
      //     //入栈
      //     console.log(token[1]+'入栈了')
      //     token[2] = []
      //     sections.push(token)
      //     break;
      //   case '/':
      //     let section_pop = sections.pop()
      //     console.log(section_pop[1] + '出栈了')
      //     nestedTokens.push(section_pop)
      //     break
      //   default:
      //     if(sections.length === 0) {
      //       nestedTokens.push(token)
      //     }else {
      //       // console.log('sections', sections)
      //       sections[sections.length - 1][2].push(token)
      //     }
      // }
    }
  return nestedTokens
}