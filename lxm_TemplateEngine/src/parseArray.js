// 这个函数入参是token, data
import lookup from "./lookup"
import renderTemplate from "./renderTemplate"
export default function parseArray(token, data) {
  // console.log("🚀 ~ file: parseArray.js ~ line 4 ~ parseArray ~ token, data", token, data)
  let v = lookup(data, token[1])
  console.log("🚀 ~ file: parseArray.js ~ line 6 ~ parseArray ~ v", v)
  let resultStr = ''
  for(let i = 0; i < v.length; i++) {
    resultStr += renderTemplate(token[2], v[i])
  }
  return resultStr
}