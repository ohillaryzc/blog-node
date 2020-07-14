/* saying模块 */
const { connection, getUpdateSQL } = require('../db')

/**
 * 获取saying列表
 * @param {Function} callback 回调函数
 * */
function findAllSay (callback) {
    connection.query('SELECT * FROM saying', callback)
}

/**
 * 添加一条say记录
 * @param {object} say 记录数据对象
 * @param {Function} callback 添加回调函数
 * */
function addSay(say, callback) {
    say.update_date = new Date()
    connection.query('INSERT INTO saying SET ?', say, callback)
}

module.exports = {
    findAllSay,
    addSay
}
