const Mock = require('mockjs')
let result = Mock.mock({
  "code": 0,
  "message": "成功",
  "data|10": [{
    "id": "@id", // 生成一个随机id
    "ip": "@ip", // 生成一个随机的ip
    "name": "@cname", // 生成一个中文名
    "userId": "@id",
    "stars|2": ["*"],
    "avatar": "@image()",
    "createAt": "@datetime"
  }]
})
console.log(result)