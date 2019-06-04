var mysql = require('mysql')
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'reports'
})

function query (sql,params, callback) {
  connection.getConnection(function (err, connection) {
    connection.query(sql,params, function (err, rows) {
      callback(err, rows)
      connection.release()
    })
  })
}
exports.query = query
