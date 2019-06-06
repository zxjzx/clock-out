var mysql = require('mysql')
var connection = mysql.createPool({
  host: 'localhost', //你的数据库地址
  user: 'root',
  password: '123456',
  database: 'imscodb',
  multipleStatements: true
})

function query (sql, callback) {
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows)
      connection.release()
    })
  })
}
exports.query = query
