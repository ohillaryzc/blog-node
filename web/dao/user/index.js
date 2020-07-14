/* 用户模块，user表 */
const { connection, getUpdateSQL } = require('../db')

/**
 * 查询是否符合
 * @param {string} md5 加密字符串
 * @param {function} callback 回调函数
 * */
function findMD5 (md5, callback) {
  connection.query('SELECT * FROM user WHERE password = ?', md5, callback)
}

/**
 * 通过id查询用户
 * @param {string} id 用户id
 * @param {function} callback 回调函数
 * */
function findMD5ById (id, callback) {
  connection.query('SELECT * FROM user WHERE id = ?', id, callback)
}

/**
 * 添加登录码
 * @param {object} user 登录码
 * @param {function} callback 回调函数
 * */
function addMD5 (user, callback) {
  connection.query('INSERT INTO user SET ?', user, callback)
}

module.exports = {
  findMD5,
  addMD5,
  findMD5ById
}
