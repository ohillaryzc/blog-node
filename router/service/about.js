/* about更新服务 */
const dao = require('../../web/dao')
const { getJSON } = require('../../utils')
let global = require('../../global')

/**
 * 对应前端请求'/update/about'
 * @param {Object} req request请求对象
 * @param {Function} callback 回调函数
 * */
function updateAbout(req, callback) {
    getJSON(req, (data) => {
        dao.updateAbout(data, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result)
            // 更新全局状态
            Object.keys(data).forEach(item => {
                global.info[item] = data[item]
            })
        })
    })
}

/**
 * url: '/get/about'
 * @param {Object} req request请求对象
 * @param {Function} callback 回调函数
 * */
function findAllAbout(req, callback) {
    dao.findAllAbout((err, result) => {
        if (err) return callback(err, null)
        callback(null, {status: 0, data: result})
    })
}

module.exports = {
    '/update/about': updateAbout,
    '/get/about': findAllAbout
}
