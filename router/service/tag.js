/* 标签路由 */
const dao = require('../../web/dao/index')

// 获取所有的tag标签
function getTagList(req, callback) {
    dao.getTagList((err, result, fields) => {
        if (err) return callback('{message: "查询失败，稍后再试"}', null)
        callback(null, result)
    })
}

// 添加标签
function addTag(req, callback) {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        let tag = JSON.parse(data)
        dao.findTag(tag.name, (err, result, fields) => {
            if (err) return callback(err, null)
            // dao.addTag(JSON.parse(data))
            if (result[0]) {
                callback('{message: "此标签已存在"}', null)
            } else {
                dao.addTag(JSON.parse(data), err => {
                    if (err) return callback(err, null)
                    callback(null, '{message: "添加成功"}')
                })
            }
        })
    })
}

// 更新
function updateTag(req, callback) {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        let tag = JSON.parse(data)
        dao.updateTag(tag, (err, result, fields) => {
            if (err) return callback(err, null)
            callback(null, result)
        })
    })
}

module.exports = {
    '/get/tag/list': getTagList,
    '/add/tag': addTag,
    '/update/tag': updateTag
}
