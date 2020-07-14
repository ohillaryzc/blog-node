/* 操作tag表 */
const { connection, getUpdateSQL } = require('../db')

/*
* 根据名称查询标签
* 表：tag
* */
function findTag(name, callback) {
    connection.query('SELECT * FROM tag WHERE name = ?', name, callback)
}

/*
* 获取所有的tag
* 表：tag
* */
function getTagList(callback) {
    connection.query('SELECT * FROM tag', callback)
}

/*
* 添加tag
* 表：tag
* */
function addTag(tag, callback) {
    connection.query('INSERT INTO tag SET ?', tag, callback)
}

/*
* 更新tag
* 表：tag
* */
function updateTag(tag, callback) {
    let {sql, data} = getUpdateSQL(tag, 'id', 'tag')
    connection.query(sql, data, callback)
}

module.exports = {
    getTagList,
    addTag,
    findTag,
    updateTag
}