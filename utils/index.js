/* 工具方法 */

/**
 * 获取post请求JSON数据，注意，只能是纯JSON数据
 * @param {Object} req request请求对象
 * @param {Function} callback 回调函数
 * */
function getJSON(req, callback) {
  let data = ''
  req.on('data', chunk => {
    data += chunk
  })

  req.on('end', () => {
    callback(JSON.parse(data))
  })
}

/**
 * 获取req中的cookie头
 * @param {object} req 请求对象
 * @return {object} cookie头对象信息
 * */
function getCookie (req) {
  let cookie = req.headers.cookie // string
  let cookieData = {}
  cookie.split('; ').forEach(item => {
    let kvArr = item.split('=')
    cookieData[kvArr[0]] = kvArr[1]
  })
  return cookieData
}

module.exports = {
  getJSON,
  getCookie
}
