import Scanner from './Scanner.js'
import nestTokens from './nestTokens.js'

export default function (templateStr) {
  let tokens = []
  // 实例化一个扫描器,扫描器是针对这个模版字符串进行工作的
  let scanner = new Scanner(templateStr)
  console.log('templateStr', templateStr)
  while (!scanner.eos()) { // 指针没有到头就一直循环
    console.log('==============')
    let word_1 = scanner.scanUtil("{{")
    console.log(word_1, scanner.pos)
    if (word_1 != '') {
      tokens.push(['text', word_1.replace(/\s/g,'')])
    }

    scanner.scan('{{')

    let word_2 = scanner.scanUtil("}}")
    console.log(word_2, scanner.pos)
    if (word_2 != '') {
      if (word_2[0] == '#') {
        tokens.push(['#', word_2.substring(1)])
      } else if (word_2[0] == '/') {
        tokens.push(['/', word_2.substring(1)])
      } else {
        tokens.push(['name', word_2])
      }
    }
    scanner.scan('}}')
  }
  console.log('3131----------',tokens)
  return nestTokens(tokens)
}