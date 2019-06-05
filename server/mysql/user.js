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

router.use('/getUserInfo/:id',(req,res)=>{
  let sql = 'select id,username,role,nickname from user where id = '+req.params.id;
  db.query(sql,(err,rows)=>{
    if(err){
      res.send(err);
      return
    }else{
      res.send(rows)
    }
  })
})

router.use('/login', (req, res) => {
  let sql = 'select id,username,role,nickname from user where username = ' + JSON.stringify(req.body.username) + ' and password = ' + JSON.stringify(req.body.password)
  db.query(sql, function (err, rows) {
    if (err) {
      res.send(err)
      return
    } else {
      if (rows.length) {
        let result = {
          code: 0,
          message: 'OK',
          data: rows,
          status: true
        }
        res.send(result)
      } else {
        let result = {
          code: 0,
          message: 'OK',
          data: '用户名或密码错误',
          status: false
        }
        res.send(result)
      }
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
