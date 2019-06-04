var express = require('express')
var router = $Router()

var db = require('./db.js')

//以下是连接数据库的操作
router.get('/getDBList', function (req, res, next) {
  db.query('SELECT * FROM reports', function (err, rows) {
    res.send(rows)
  })
})
module.exports = router
