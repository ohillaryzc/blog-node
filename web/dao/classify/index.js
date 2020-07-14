/* 操作classify表 */
const { connection, getUpdateSQL } = require('../db')

/*
* 根据名称查询分类
* 表：classify
* */
function findClassify(name, callback) {
    connection.query('SELECT * FROM classify WHERE name = ?', name, callback)
}

/*
* 获取所有分类
* 表：classify
* */
function getClassifyList(callback) {
    connection.query('SELECT * FROM classify', callback)
}

/*
* 添加分类
* 表：classify
* */
function addClassify(classify, callback) {
    connection.query('INSERT INTO classify SET ?', classify, callback)
}

/*
* 更新分类
* 表：classify
* */
function updateClassify(classify, callback) {
    let {sql, data} = getUpdateSQL(classify, 'id', 'classify')
    connection.query(sql, data, callback)
}

module.exports = {
    findClassify,
    addClassify,
    getClassifyList,
    updateClassify
}
