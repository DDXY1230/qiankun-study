class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    // 指针
    this.pos = 0
    // 尾巴,一开始就是模版字符串原文
    this.tail = templateStr
  }
  // 路过双大口号,没有返回值
  scan(tag) {
    // 这里必然是等于0的
    if (this.tail.indexOf(tag) == 0) {
      // tag有多长,比如{{ 是2, 就让指针后移动多少位
      this.pos += tag.length
      // 尾巴的长度也要响应的减少前面后移的
      this.tail = this.templateStr.substring(this.pos)
    }
  }
  //让指针进行扫描,直到遇到双大括号停止,并且返回刚刚扫描的内容
  scanUtil(stopTag) {
    const pos_backup = this.pos
    // 当尾巴的开头不是stopTag的时候,就说明还没有扫描到stopTag
    while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
      this.pos++
      this.tail = this.templateStr.substr(this.pos)
    }
    return this.templateStr.substring(pos_backup, this.pos)
  }
  // 指针到最末端了
  eos() {
    return this.pos >= this.templateStr.length
  }
}
/* 

substr和substring两个都是截取字符串的。 
两者有相同点，如果只是写一个参数，两者的作用都是一样的：就是截取字符串当前下标以后直到字符串最后的字符串片段。
 例如：var a=”abcdefghiklmnopqrstuvwxyz”; var b=a.substr(3); var c=a.substring(3); console.log(b); console.log(c);这样输出的结果就是一样的，都是 defghiklmnopqrstuvwxyz 
 从第三个下标是2的位置截取到最后 当写第二个参数的时候，两者就会有完全不同的含义；
  substr（a,b） 第二个参数是截取字符串的 个数
  substring（a,b） 第二个参数是截取字符串 最终的下标
   例如：var a=“abcdefghiklmnopqrstuvwxyz”;var b=a.substr(3,5);var c=a.substring(3,5);打印输出的结果分别是：defgh，de。
   注意最后5下标是不会取到的意思是只能截取a字符串的3,4下标截取的时候是不会截取到最后一个[3,5）
 */

export default Scanner