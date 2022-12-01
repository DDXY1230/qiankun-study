// 用于周转对象一层一层找下去
export default function lookup(dataObj, keyName) {
  console.log("🚀 ~ file: lookup.js ~ line 3 ~ lookup ~ keyName", keyName)
  let temp = dataObj
  if(keyName === '.') {// 单独处理点
    return temp
  }
  if(keyName.indexOf('.') != -1 && keyName !== '.') {
    keyName.split('.').forEach(i => temp = temp[i])
    return temp
  }else {
    return temp[keyName]
  }
}