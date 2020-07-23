/* 获取掘金文章 */
const { getJSON } = require('../../utils')
const getJueJinArticle = require('../../catch/juejin')
const dao = require('../../web/dao')
/**
 * /get/juejin/article
 * @param {Object} req
 * @param {Function} callback
 * */
function getJueJin (req, callback) {
  getJSON(req, data => {
    getJueJinArticle(data.source, article => {
      if (article) {
        callback(null, {status: 0, data: article})
      } else {
        callback({status: 1, message: '获取文章失败！'})
      }
    })
  })
}

/**
 * /save/juejin/article
 * @param {Object} req
 * @param {Function} callback
 * */
function saveJueJin (req, callback) {
  getJSON(req, data => {
    dao.addArticle(data, (err, result) => {
      if (err) return callback(err, null)
      callback(null, {status: 0, data: result})
    })
  })
}

module.exports = {
  '/get/juejin/article': getJueJin,
  '/save/juejin/article': saveJueJin
}
