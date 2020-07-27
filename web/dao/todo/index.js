/* todo表 */
const { connection, getUpdateSQL } = require('../db')

function addTodo (todo, callback) {
  connection.query('INSERT INTO todo SET ?', todo, callback)
}

function updateTodo (todo, callback) {
  const { sql, data } = getUpdateSQL(todo, 'id', 'todo')
  connection.query(sql, data, callback)
}

function findTodo (params, callback) {
  connection.query('SELECT * FROM todo ORDER BY start DESC LIMIT ?, ?', params, callback)
}

module.exports = {
  addTodo,
  updateTodo,
  findTodo
}
