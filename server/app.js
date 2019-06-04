const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const express = require('express')
const app = express()

const path = require('path')
let bodyParser = require('body-parser')

//数据库
const db = require('./mysql/db')

app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

app.use('/getme', (req, res) => {
  res.send('im a girl')
})

//以下是连接数据库的操作
app.use('/getDBList', function (req, res, next) {
  db.query('SELECT * FROM user', function (err, rows) {
    res.send(rows)
  })
})

app.use('/addUser', function (req, res, next) {
  let sql2 = 'INSERT INTO user(username,password) VALUES (?,?)'
  db.query(sql2, [req.body.username, req.body.password], function (err, rows) {
    res.sendStatus(200)
  })
})

const server = http.createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
