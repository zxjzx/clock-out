const express = require('express')
const router = express.Router()
const db = require('./db.js')
router.use('/getTipoffList', (req, res) => {

  let currentPage = req.body.currentPage
  let pageSize = req.body.pageSize
  let startSize = (currentPage - 1) * pageSize

  let whereSql = 'where 1 = 1'
  let outid = req.body.outid
  let reporterid = req.body.reporterid
  let startTime = req.body.startTime
  let endTime = req.body.endTime

  if (outid) {
    whereSql += ' and t.outid=' + outid
  }
  if (reporterid) {
    whereSql += ' and t.reporterid=' + reporterid
  }

  if (startTime) {
    whereSql += ' and t.created >= ' + startTime
  }
  if (endTime) {
    whereSql += ' and t.created <= ' + endTime
  }

  let sql = 'select SQL_CALC_FOUND_ROWS\
  t.id,t.content,t.created,u.id as outUserId,u.userName as outUsername,o.id as reporUserId,o.username as reportName\
  FROM tipoff_record t\
  left join user u on u.id=t.outid\
  left join user o on o.id=t.reporterid\
  ' + whereSql + '\
  ORDER BY t.created desc limit ' + startSize + ',' + pageSize + '; \
  SELECT FOUND_ROWS() as total ;'
  db.query(sql, (err, rows) => {
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
module.exports = router
