/* post请求 接口对应处理 */
const router = require('./router')

module.exports = (pathname, req, res, callback) => {
    router[pathname](req, callback, res)
}
