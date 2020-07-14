/* 处理操作saying表的请求 */
const dao = require('../../web/dao')
const { getJSON } = require('../../utils')

/**
 * url: '/get/saying/list'
 * 获取saying列表
 * @param {object} req 请求头，包含请求数据
 * @param {function} callback 回调函数
 * */
function findAllSay(req, callback) {
    dao.findAllSay((err, result) => {
        if (err) return callback(err, null)
        callback(null, result)
    })
}

/**
 * url: '/add/saying'
 * 添加记录
 * @param {object} req 请求对象
 * @param {function} callback 回调函数
 * */
function addSay(req, callback) {
    getJSON(req, data => {
        dao.addSay(data, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result)
        })
    })
}

module.exports = {
    '/get/saying/list': findAllSay,
    '/add/saying': addSay
}
