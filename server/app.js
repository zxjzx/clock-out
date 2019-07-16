const http = require('http')
const hostname = '0.0.0.0'
const port = 4000
const express = require('express')
const app = express()

const path = require('path')
let bodyParser = require('body-parser')//对post请求的请求体进行解析

const multer = require('multer');//upload

const Tools = require('./utils/index');

app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))//解析request中body的urlencoded字符

//数据库
const user = require('./mysql/user')
const setting = require('./mysql/setting')
const clockOut = require('./mysql/clock-out')
const tipOff = require('./mysql/tip-off')
app.use('/api', user)
app.use('/api', setting)
app.use('/api', clockOut)
app.use('/api', tipOff);

//设置上传地址
// const upload = multer({ dest: 'upload/' });
const storage = multer.diskStorage({
  destination: `upload/${Tools.getNowTimeStamp()}`,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({
  storage: storage
});

const db = require('./mysql/db.js')
app.post('/api/upload', upload.single('logo'), function (req, res, next) {
  let sql = `INSERT INTO file(filename,path) VALUES (${JSON.stringify(req.file.filename)},${JSON.stringify(req.file.path)})`;
  db.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }else{
      let result = {
        code:0,
        message:'OK',
        data:rows,
        status:true
      };
      res.send(result);
    }
  });
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
