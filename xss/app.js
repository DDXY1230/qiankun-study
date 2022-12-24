const express = require('express')
const app = express()

app.engine('html', require('express-art-template'))
app.get('/', (req, res) => {
  // res.send('hello world') 默认从views里面读取
  res.render('index.html', {bar: 'this is bar', search: req.query.search})
})
app.listen(3001, () => {
  console.log('3001服务启动了~~')
})