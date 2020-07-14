/* token 模块 */
const { connection, getUpdateSQL } = require('../db')

function getToken (token, callback) {
  connection.query('SELECT * FROM token WHERE token = ?', token, callback)
}

function getTokenByUserId (id, callback) {
  connection.query('SELECT * FROM token WHERE user_id = ?', id, callback)
}

function addToken (token, callback) {
  connection.query('INSERT INTO token SET ?', token, callback)
}

function updateToken (token, callback) {
  let {sql, data} = getUpdateSQL(token, 'user_id', 'token')
  connection.query(sql, data, callback)
}

module.exports = {
  getToken,
  getTokenByUserId,
  addToken,
  updateToken
}
