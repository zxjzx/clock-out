const express = require('express')
const router = express.Router()
const db = require('./db.js')
router.use('/addClockRecord', (req, res) => {
  let data = req.body
  let sql = 'INSERT INTO clockout_record (userid,projectid,outtime,created) VALUES (' + data.userid + ',' + data.projectid + ',' + data.create + ',' + data.outtime + ')'
  db.query(sql, (err, rows) => {
    if (err) {
      res.send(err)
    } else {
      let result = {
        code: 0,
        message: 'OK',
        data: rows,
        status: true
      }
      res.send(result)
    }
  })
})

router.use('/getClockRecordList', (req, res) => {
  let currentPage = req.body.currentPage
  let pageSize = req.body.pageSize
  let startSize = (currentPage - 1) * pageSize
  // 主键查询：let sql2 = 'SELECT * FROM clockout_record  WHERE id >= 1 LIMIT 10;';
  let sql = 'select a.id,a.id outid,a.created,a.userid,b.username,b.nickname,b.role,a.projectid,c.name projectname,a.outtime from clockout_record a left join user b on a.userid = b.id left join project c on a.projectid = c.id limit ' + startSize + ',' + pageSize + ';'
  let sqlCount = 'SELECT COUNT(*) as total FROM clockout_record'
  let sqlresult = sql + sqlCount
  db.query(sqlresult, (err, rows) => {
    if (err) {
      res.send(err)
    } else {
      let data = {
        result: rows[0],
        total: rows[1][0].total
      }
      let result = {
        code: 0,
        message: 'OK',
        data: data,
        status: true
      }
      res.send(result)
    }
  })
})

router.use('/reportSome', (req, res) => {
  let obj = req.body
  let sql = 'INSERT INTO tipoff_record (outid,reporterid,content,created) VALUES (' + obj.outid + ',' + obj.reporterid + ',' + obj.content + ',' + obj.created + ')'
  db.query(sql, (err, rows) => {
    if (err) {
      res.send(err)
    } else {
      let result = {
        code: 0,
        message: 'OK',
        data: rows,
        status: true
      }
      res.send(result)
    }
  })
})

module.exports = router
