const express = require('express')
const router = express.Router()
const db = require('./db.js')
const Tools = require('../utils/index');
const app = express()
const multer = require('multer');//upload


//设置上传地址
const storage = multer.diskStorage({
  destination: `upload/${Tools.getNowTimeStamp()}`,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({
  storage: storage
});

router.post('/upload', upload.single('logo'), (req, res, next)=> {
  let sql = `INSERT INTO file(filename,path,type,size) VALUES (${JSON.stringify(req.file.filename)},${JSON.stringify(req.file.path)},${JSON.stringify(req.file.mimetype)},${JSON.stringify(req.file.size)})`;
  db.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }else{
      let result = {
        code:0,
        message:'OK',
        data:rows,
        fileInfo:req.file,
        status:true
      };
      res.send(result);
    }
  });
});

router.use('/getFileList',(req,res)=>{
  let sql = `SELECT * FROM file`;
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

module.exports = router;
