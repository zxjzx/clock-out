const express = require('express')
const router = express.Router()
const md5 = require('md5')
const db = require('./db.js')

//以下是连接数据库的操作
router.use('/getDBList', function (req, res, next) {
  db.query('SELECT * FROM user', function (err, rows) {
    res.send(rows)
  })
})

router.use('/getme', (req, res) => {
  res.send('im a girl')
})

router.use('/login', (req, res) => {
  let sql = 'select * from user where username = ' + JSON.stringify(req.body.username) + ' and password = ' + JSON.stringify(req.body.password)
  db.query(sql, function (err, rows) {
    if (err) {
      res.send(err)
    } else {
      res.send("login state")
    }
  })
})

router.use('/addUser', function (req, res, next) {
  let password = md5(req.body.password)
  let sql2 = 'INSERT INTO user(username,password) VALUES (' + req.body.username + ',' + password + ')'
  db.query(sql2, function (err, rows) {
    res.sendStatus(200)
  })
})

module.exports = router
