let nunjucks = require('nunjucks')
let path = require('path')
let express = require('express')
let app = express()
nunjucks.configure('view', {
  autoescape: true,
  express: app // 通过这个属性实现nunjucks和express关联
})
/**
 * 1. response.render 方法是express内部实现的
 * 2. 先读取模版文件, 然后把模版文件和数据对象作为参数传递给nunjucks模版引擎
 * 3. 然后由nunjucks模版引擎渲染出来最终的字符串,再由response发送给客户端
 */
app.get('/', function (req, res) {
  res.render('index.html', {name: '学习'})
})
app.listen(8080)