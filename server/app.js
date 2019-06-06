const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const express = require('express')
const app = express()

const path = require('path')
let bodyParser = require('body-parser')//对post请求的请求体进行解析

app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))//解析request中body的urlencoded字符

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200) // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  } else {
    next()
  }
})

//数据库
const user = require('./mysql/user')
const setting = require('./mysql/setting')
const clockOut = require('./mysql/clock-out')
const tipOff = require('./mysql/tip-off')
app.use('/', user)
app.use('/', setting)
app.use('/', clockOut)
app.use('/', tipOff)

const server = http.createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
