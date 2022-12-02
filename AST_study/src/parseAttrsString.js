export default function parseAttrsString(attrsString) {
 console.log(attrsString)
 if(attrsString == undefined) return []
 let isYinhao = false // 用于标记当前是否在引号内
 let point = 0 // 断点
 let result = []
 for(let i = 0; i< attrsString.length;i++) {
  let char = attrsString[i]
  if(char == '"') {
    isYinhao = ! isYinhao
  }else if(char == ' ' && !isYinhao){
    // 遇见空格并且不再引号中, 这个if是如果结果不是空才放进结果数组中
    if(!/^\s*$/.test(attrsString.substring(point,i))){
      result.push(attrsString.substring(point, i).trim())
      point = i
    }
  }
 }
 //循环到最后靠近的那个后面没有空格,无法识别,需要单独手动添加进去
 result.push(attrsString.substring(point).trim())
 // 将数组变为数组{name: xx,value:xx}
 result = result.map(i => {
  const o = i.match(/^(.+)="(.+)"$/)
  return {name: o[1],value: o[2]}
 })
 console.log('result==>', result)
 return result
}