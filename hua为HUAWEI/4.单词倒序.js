/**
 * 单词倒序,输入一行英语句子, 里面包括英文字母,
 * 空格以及,.?三种标点符号,请将句子内每个单词进行倒序,并且输出
 * 
 * 输入:yM eman si boB,tub eh si trams.
 * 输出: My name is Bob
 */



function getResult(str) {
   const reg = /[\,\.\?\s]/   
   //\s 是指空白，包括空格、换行、Tab 缩进等所有的空白，而 \S 刚好相反
   const idxs = [-1]
   for(let i = 0; i < str.length; i++) {
    if(reg.test(str[i])){
      idxs.push(i)
    }
   }
   idxs.push(str.length)
   // 此时得到单词的所有分割的位置
   const arr = [...str]
   idxs.reduce((p,c) => {
    let l = p + 1;
    let r = c - 1;
    while(l < r) {
      let tmp = arr[l]
      arr[l] = arr[r]
      arr[r] = tmp
      l++
      r--
    }
    return c
   })
   return arr.join("")
}
let str = 'yM eman si boB,tub eh si trams.'
console.log(getResult(str))