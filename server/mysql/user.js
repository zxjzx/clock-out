const express = require('express')
const router = express.Router()
const md5 = require('md5')
const db = require('./db.js')
const Utils = require('../utils/index')

//以下是连接数据库的操作
router.use('/getDBList', function (req, res, next) {
  db.query('SELECT * FROM user', function (err, rows) {
    res.send(rows)
  })
});

router.use('/getme', (req, res) => {
  res.send('im a girl');
});

router.use('/getUserInfo/:id', (req, res) => {
  // let sql = 'select id,username,role,nickname from user where id = ' + req.params.id
  let sql = 'select u.id,u.username,u.role,u.nickname,u.default_projectid as projectId,p.name as projectName\
  from user u\
  left join project p on p.id = u.default_projectid\
  where u.id = ' + req.params.id
  db.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
      return
    } else {
      let result = {
        code: 0,
        message: 'OK',
        data: rows,
        status: true
      };
      res.send(result);
    }
  })
});

router.use('/updateUserInfo', (req, res) => {
  let obj = req.body;
  let password = obj.password ? JSON.stringify(md5(obj.password)) : null;
  let username = Utils.isNotEmpty(obj.username);
  let projectId = Utils.isNotEmpty(obj.projectId);
  let sql = 'UPDATE user SET username=' + username + ',password=' + password + ',default_projectid=' + projectId;
  let roleSql = ',role=' + Utils.isNotEmpty(obj.role);
  let nicknameSql = ',nickname=' + Utils.isNotEmpty(obj.nickname);
  if (obj.role) sql += roleSql
  if (obj.nickname) sql += nicknameSql
  sql += ' WHERE id =' + obj.id;
  db.query(sql, (err, rows) => {
    if (err) {
      res.send(err);
      return;
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
});

router.use('/login', (req, res) => {
  let password = JSON.stringify(md5(req.body.password));
  let sql = 'select id,username,role,nickname from user where username = ' + JSON.stringify(req.body.username) + ' and password = ' + password
  db.query(sql, function (err, rows) {
    if (err) {
      res.send(err);
      return;
    } else {
      if (rows.length) {
        let result = {
          code: 0,
          message: 'OK',
          data: rows,
          status: true
        };
        res.send(result)
      } else {
        let result = {
          code: 0,
          message: 'OK',
          data: '用户名或密码错误',
          status: false
        };
        res.send(result)
      }
    }
  })
});

router.use('/addUser', function (req, res, next) {
  let password = req.body.password ? JSON.stringify(md5(req.body.password)) : null;
  let username = Utils.isNotEmpty(req.body.username);
  let nickname = Utils.isNotEmpty(req.body.nickname);
  let role = Utils.isNotEmpty(req.body.role);
  let projectId = Utils.isNotEmpty(req.body.projectId);

  let sql = 'INSERT INTO user(username,password,nickname,role,default_projectid) VALUES (' + username + ',' + password + ',' + nickname + ',' + role + ',' + projectId + ')'
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
});

router.use('/deleteUser', function (req, res, next) {
  let userId = req.body.userId
  let sql = 'DELETE FROM user WHERE id = ' + userId
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
});

router.use('/getUserList', function (req, res, next) {
  let sql = 'select u.id,u.username,u.nickname,u.role,p.id as projectId,p.name as projectName,p.description,p.managerid\
  from user u\
  left join project p on u.default_projectid = p.id'
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
});

router.use('/getUser',function (req, res, next) {
  let sql = 'SELECT * FROM user';
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

router.use('/updateUserList', function (req, res, next) {
  let sql = 'UPDATE user SET username=' + req.body.username + ',nickname=' + req.body.nickname + ',role=' + req.body.role + ',default_projectid=' + req.body.projectId + ' WHERE id = ' + req.body.id
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
});

module.exports = router;
