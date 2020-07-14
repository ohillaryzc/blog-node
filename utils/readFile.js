/* 读取文件工具 */
let fs = require('fs')

module.exports = (path, callback) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data)
        }
    })
}
