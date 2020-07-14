/* 分类路由 */
const dao = require('../../web/dao/index')

// 获取分类列表
function getClassifyList(req, callback) {
    dao.getClassifyList((err, result) => {
        if (err) return callback(err, null)
        callback(null, result)
    })
}

// 添加分类
function addClassify(req, callback) {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        let classify = JSON.parse(data)
        dao.findClassify(classify.name, (err, result) => {
            if (err) return callback(err, null)
            if (result[0]) {
                callback('{message: "该分类已存在"}', null)
            } else {
                dao.addClassify(classify, (err, result) => {
                    if (err) return callback(err, null)
                    callback(null, result)
                })
            }
        })
    })
}

// 更新分类
function updateClassify(req, callback) {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        let classify = JSON.parse(data)
        dao.updateClassify(classify, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result)
        })
    })
}

module.exports = {
    '/get/classify/list': getClassifyList,
    '/add/classify': addClassify,
    '/update/classify': updateClassify
}
