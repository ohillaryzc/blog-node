/* about表 */
const { connection, getUpdateSQL } = require('../db')


/**
 * 更新关于信息、博主个人信息、网站logo、描述、头像等信息
 * @param {Object} about domain实体对象
 * @param {Function} callback 回调函数
 */
function updateAbout(about, callback) {
    let {sql, data} = getUpdateSQL(about, 'id', 'about')
    connection.query(sql, data, callback)
}

/**
 * 查找about信息
 * @param {Function} callback 回调函数
 * */
function findAllAbout(callback) {
    connection.query('SELECT * FROM about', callback)
}

module.exports = {
    updateAbout,
    findAllAbout
}
