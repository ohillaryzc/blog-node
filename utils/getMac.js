/* 获取mac工具 */
const MAC = require('getmac')
module.exports = callback => {
    MAC.getMac({iface: 'eth0'}, (err, macAddress) => {
        if (err) return callback(err, null)
        callback(null, macAddress)
    })
}
