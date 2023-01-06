const express = require('express')
const app = express()
const port = 3000
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

// 当使用websocket协议通信和服务端建立链接的时候触发该函数
    const clients = []
io.on('connection',socket => {
  clients.push(socket)
  console.log('有用户连接进来了')
  socket.on('chat message', (data) => {
    console.log('chat message =>', data)
    socket.emit('chat message', '服务端发给客户端的消息')
    clients.forEach(item => {
      item.emit('chat message', '这是群发的消息')
    })
  })
  
})
server.listen(port, () => {
  console.log('Example app listening at http://localhost: ' + port)
})