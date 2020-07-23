/* 获取掘金文章 */
const axios = require('axios')
const cheerio = require('cheerio')
const dao = require('../web/dao')

function getJueJinArticle (url, callback) {
  axios.get(url).then(res => {
    const $ = cheerio.load(res.data)
    // console.log($('.article-title').text())
    // console.log($('time').attr('datetime'))
    // console.log($('meta[name="description"]').attr('content'))
    // console.log($('.views-count').text().split(' ')[1])
    // console.log($('.article-content').html())
    const article = {
      title: $('.article-title').text(),
      description: $('meta[name="description"]').attr('content'),
      add_time: new Date($('time').attr('datetime')),
      views: $('.views-count').text().split(' ')[1],
      classify: '9',
      tag: '15',
      content: $('.article-content').html(),
      type: '2'
    }
    callback(article)
    // dao.addArticle(article, (err, result) => {
    //   if (err) return callback()
    //   callback(article)
    // })
  })
}

module.exports = getJueJinArticle
// getJueJinArticle('https://juejin.im/post/5f0f1a045188252e415f642c')
