/* 操作文章表article */
const { connection, getUpdateSQL } = require('../db')

/*
* 查询全部文章（分页）
* article
* @params callback
* */
function findAllArticle(page, callback) {
    connection.query('SELECT * FROM article ORDER BY add_time ASC LIMIT ?, ?', page, callback)
}

/**
 * 查询文章总数
 * */
function findArticleCount (callback) {
  connection.query('SELECT COUNT(id) AS count FROM article', callback)
}

/*
* 根据uid查询单个文章
* @params uid callback
* */
function findByUId(uid, callback) {
    connection.query('SELECT * FROM article WHERE id = ?', uid, callback)
}

/*
* 添加文章
* @params article callback
* */
function addArticle(article, callback) {
    connection.query('INSERT INTO article SET ?', article, callback)
}

/*
* 更新文章
* @params article callback
* */
function updateArticle(article, callback) {
    let {sql, data} = getUpdateSQL(article, 'id', 'article')
    connection.query(sql, data, callback)
}

module.exports = {
  findAllArticle,
  findArticleCount,
  findByUId,
  addArticle,
  updateArticle
}
