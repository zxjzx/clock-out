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
  let projectId = req.body.projectId
  let userId = req.body.userId
  let startTime = req.body.startTime
  let endTime = req.body.endTime

  let projectSql = 'where 1=1'
  if (projectId) {
    projectSql += ' and a.projectid = ' + projectId
  }
  if (userId) {
    projectSql += ' and a.userid = ' + userId
  }
  if (startTime) {
    projectSql += ' and a.outtime >= ' + startTime
  }
  if (endTime) {
    projectSql += ' and a.outtime <= ' + endTime
  }

  let sql = 'select SQL_CALC_FOUND_ROWS \
    a.id,a.id outid,a.created,a.userid,b.username,b.nickname,b.role,a.projectid,c.name projectname,a.outtime\
    from clockout_record a \
    left join user b on a.userid = b.id \
    left join project c on a.projectid = c.id \
    ' + projectSql + ' \
    order by a.created desc limit ' + startSize + ',' + pageSize + ';'
  let sqlCount = 'SELECT FOUND_ROWS() as total'
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

router.use('/deleteReport', (req, res) => {
  let obj = req.body;
  let sql = 'DELETE FROM clockout_record WHERE id = ' + obj.id;
  db.query(sql, function (err, rows) {
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
