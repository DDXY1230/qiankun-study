let express = require('express')
let Mock = require('mockjs')
let app = express()
app.get('/news', function (req, res) {
  console.log(req.query)
  let {limit} = req.query
  let result = Mock.mock({
    "code": 0,
    "message": "成功",
    [`data|${limit}`]: [{
      "id": "@id", // 生成一个随机id
      "title": "@csentence", // 生成一个随机的ip
      "url": "@url",
      "image": "@image('200*100', '#894fc4', '#fff', 'png')",
      "createAt": "@datetime"
    }]
  })
  res.json(result)
})
app.get('/cache', (req, res) => {
  res.json({title: '服务器返回的新闻标题' + Date.now()})
})
app.listen(3000)