// 
import express from 'express'
const app = express()
app.get('/', (req,res) => {
  res.end('123321')
})
app.listen(8080, () => {
  console.log('服务已经开启!')
})