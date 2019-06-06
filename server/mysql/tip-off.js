const express = require('express')
const router = express.Router()
const db = require('./db.js')
router.use('/getTipoffList', (req, res) => {
  let sql = "select t.id,t.content,t.created,u.id as outUserId,u.userName as outUsername,o.id as reporUserId,o.username as reportName\
  FROM tipoff_record t\
  left join user u on u.id=t.outid\
  left join user o on o.id=t.reporterid\
  ORDER BY t.created desc"
  db.query(sql, (err, rows) => {
    if (err) {
      req.send(err)
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
