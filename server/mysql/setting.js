const express = require('express')
const router = express.Router()
const db = require('./db.js')

router.use('/addProject', (req, res) => {
  let sql = 'INSERT INTO project(name,description) VALUES (' + JSON.stringify(req.body.name) + ',' + JSON.stringify(req.body.description) + ')'
  db.query(sql, function (err, rows) {
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


router.use('/getProjectList',(req,res)=>{
  let sql = 'SELECT * FROM project';
  console.log(sql)
  db.query(sql,(err,rows)=>{
    if(err){
      req.send(err)
    }else{
      let result = {
        code:0,
        message:'OK',
        data:rows,
        status:true
      }
      res.send(result);
    }
  })
})

module.exports = router
