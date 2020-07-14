/* 文章路由 */
const dao = require('../../web/dao/index')
const { getJSON } = require('../../utils')

/*
* 添加文章
* @params article callback
* */
function addArticle(req, callback) {
    // 获取post请求数据
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        let article = JSON.parse(data)
        article.add_time = new Date()
        article.views = 0
        let classify = []
        let tag = []
        article.classify.forEach(item => {
            classify.push(item.id)
        })
        article.tag.forEach(item => {
            tag.push(item.id)
        })
        article.classify = classify.join(',')
        article.tag = tag.join(',')
        dao.addArticle(article, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result)
        })
    })
}

/*
* 文章列表
* @params (分页参数) callback
* */
function findAllArticle(req, callback, page) {
  let params = null
  if (page && page.start !== undefined) {
    // 展示内容分页数据在链接里面
    params = [page.start, 20]
    if (page.pageSize) {
      params[1] = page.pageSize
    }
    dao.findAllArticle(params, (err, result) => {
      if (err) return callback(err, null)
      callback(null, result)
    })
  } else {
    getJSON(req, data => {
      let start = (data.pageNum - 1) * data.pageSize
      dao.findAllArticle([start, data.pageSize], (err, result) => {
        if (err) return callback(err, null)
        dao.findArticleCount((err, count) => {
          if (err) return callback(err, null)
          callback(null, {list: result, count: count[0].count})
        })
      })
    })
  }
}

/*
* 查找具体文章
* @params id callback
* */
function findArticleById(id, callback) {
    dao.findByUId(id, (err, result) => {
        if (err) return callback(err, null)
        if (result[0]) {
            callback(null, result[0])
        } else {
            callback({message: '未找到该文章'}, null)
        }
    })
}

/*
* 更新文章
* @params article callback
* */
function updateArticle(article, callback) {
    dao.updateArticle(article, (err, result) => {
        if (err) return callback(err, null)
        callback(null, result)
    })
}

module.exports = {
    '/add/article': addArticle,
    '/get/article/list': findAllArticle,
    '/find/article': findArticleById,
    '/update/article': updateArticle
}
