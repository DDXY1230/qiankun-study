const express =  require('express')
const app = express()
app.get('/', (request, response) => {
  response.send('hello express')
})
app.all('/server', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Header', '*') // 后端加这个,前端就可以传自定义的头部信息了
  response.send('Hello AJax')
})
app.listen(8000, () => {
  console.log('8000服务已经启动.22')
})