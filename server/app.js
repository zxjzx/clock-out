const http = require('http')
const hostname = 'localhost'
const port = 3000
const express = require('express')
const app = express();
const session = require('express-session');
const path = require('path')
let bodyParser = require('body-parser')//对post请求的请求体进行解析

app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))//解析request中body的urlencoded字符

//session 设置
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  name: 'testapp',
  cookie: {secure: false, maxAge: 100000},
}));

app.use('*', (req, res,next) => {
  if (req.session.login) {
    next();
  } else {
    req.session.login = true;
    next();
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
app.use('/', tipOff);

app.post('/', function (req, res) {
  res.send(403)
});

app.get('/', function (req, res) {
  res.send(403)
});

const server = http.createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
