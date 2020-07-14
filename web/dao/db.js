/* 操作数据库 */
const mysql = require('mysql')

// 连接数据库
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    dateStrings:true
})

connection.connect()

/**
 * 根据参数生成更新的SQL语句
 * @param {Object} obj 需要更新的对象
 * @param {string} target 目标记录
 * @param {string} table 需要操作的表名
 * @return {Object} 包含sql语句和更新数据的对象
 * */
function getUpdateSQL(obj, target, table) {
    let SQL = 'UPDATE ' + table + ' SET '
    let data = []
    Object.keys(obj).forEach(key => {
        if (key !== target) {
            SQL += (key + ' = ?, ')
            data.push(obj[key])
        }
    })
    SQL = SQL.substr(0, SQL.length - 2)
    SQL += (' WHERE ' + target + ' = ?')
    data.push(obj[target])
    return {sql: SQL, data}
}

module.exports = {
    connection,
    getUpdateSQL
}
