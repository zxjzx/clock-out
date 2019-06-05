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
      res.send(rows)
    }
  })
})

router.use('/getClockRecordList', (req, res) => {
  let sql = 'SELECT * FROM clockout_record'
  db.query(sql, (err, rows) => {
    if (err) {
      res.send(err)
    } else {
      let result = {
        code:0,
        message:'OK',
        data:rows,
        status:true
      }
      res.send(result)
    }
  })
})

module.exports = router
