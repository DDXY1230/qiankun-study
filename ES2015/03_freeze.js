let obj = {
  name: 'alice', 
  age: 18,
  habby: {
    one: '篮球'
  }
}
Object.freeze(obj) // 冻结obj   只能浅层次冻结
obj.name = 'lisi'
console.log(obj)

// 深层次冻结  深度冻结
function depFreeze(obj) {
  Object.freeze(obj)
  for(let i in obj) {
    if((typeof obj[i] === 'object') && obj.hasOwnProperty(i)) {
      depFreeze(obj[i])
    }
  }
}
depFreeze(obj)
obj.habby.one = '足球'

console.log(obj)
