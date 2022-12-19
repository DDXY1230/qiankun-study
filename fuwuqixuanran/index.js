const express = require('express')
const fs = require('fs')
const template = require('art-template')
const app = express()
app.get('/', (req, res) => {
  //1. 获取页面模版
  // readFileSync 如果不指定第二个参数‘utf-8’,那么默认返回的是Buffer 
  const templateStr = fs.readFileSync('./index.html', 'utf-8') // 指定了utf-8, 字符串
  console.log(templateStr)
  //2. 获取数据  JSON.parse转位对象
  const data = JSON.parse(fs.readFileSync('./data.js', 'utf-8'))
  console.log(data)
  //3. 渲染: 数据+模版=最终结果  npm i art-template  借助第三方模版引擎解析
  const html = template.render(templateStr, data)
  //4. 把渲染结果发送给客户

  res.send(html)

  // ssr服务器渲染的弊端:
/* 
  1. 前后端代码完全耦合在一起,不利于开发和维护
  2. 前端没有足够的发挥空间
  3. 服务器压力大
  4. 用户体验一般


  所以现在绝大部分都是客户端渲染crs
  有利于人员责任的划分
  前端专注做页面渲染
  后端专注处理数据逻辑
  前端变得更加独立,不再受限制于后端

  不足主要体现在首屏渲染慢,不利于seo
  为什么首屏渲染慢呢
  因为发生的请求比较多第一次请求html,然后请求数据....

  搜索引擎拿到客户端的页面字符串body里面没有内容,
  因为所有的内容是通过请求得到的

  解决以上两个问题
  现代化的服务端渲染(同构渲染)
  对于首屏用服务端渲染
  之后所有的用客户端渲染
 */



})
app.listen(3000, () => {
  console.log('服务已经启动了~~~')
})