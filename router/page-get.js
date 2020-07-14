/* get 请求，发送页面 */
// 核心模块
let path = require('path')

// 自定义模块
let readFile = require('../utils/readFile')
let fileType = require('../utils/file-type')
const router = require('./router')
let myGlobal = require('../global')

// 第三方模块
let template = require('art-template')
template.defaults.root = path.join(__dirname,'../')
// 处理时间库
const dayUtil = require('dayjs')

router['/get/about'](null, (err, data) => {
    if (err) throw err
    data[0] && (myGlobal.info = data[0])
})

module.exports = (pathname, req, callback) => {
  let pageData = {info: myGlobal.info}
  let reg = /\/page\/[0-9]*/
  if (pathname === '/' || reg.test(pathname)) {
    // 主页 path = /index
    let page = 1
    if (reg.test(pathname)) {
      page = Number(path.basename(pathname))
    }
    pageData.pageNum = page
    if (page > 1) {
      pageData.proPage = page - 1
    }
    pathname = './view/index.html'
    let count = 0
    router['/get/article/list'](req, (err, data) => {
      if (err) return callback(err, null)
      data.forEach(item => {
        item.last_time = dayUtil(item.last_time).format('YYYY-MM-DD')
        item.add_time = dayUtil(item.add_time).format('YYYY-MM-DD')
      })
      pageData.articles = data
      if (data.length === 20) {
        pageData.nextPage = page + 1
      }
      setCount()
    }, {start: (page - 1) * 20})

    router['/get/tag/list'](req, (err, data) => {
      if (err) return callback(err, null)
      pageData.tags = data
      setCount()
    })

    router['/get/classify/list'](req, (err, data) => {
      if (err) return callback(err, null)
      pageData.classify = []
      data.forEach(item => {
        pageData.classify['C' + item.id] = item
      })
      setCount()
    })

    function setCount() {
      count++
      if (count === 3) {
        toReadFile(pathname)
      }
    }
    return
  } else if (pathname.indexOf('/public/') === 0) {
      pathname = '.' + pathname
  } else if (pathname.indexOf('/blog/detail/') === 0) {
    // 从数据库中取出具体内容，根据pathname最后/的值 path.basename
    let nums = path.basename(pathname).split('-')
    nums.forEach((item, index) => {
      nums[index] = Number(item)
    })
    let start = (nums[0] - 1) * 20 + (nums[2] - 1)
    let pageSize = 3
    if (start < 0) {
      start = 0
      pageSize = 2
    }

    pageData.pro = {
      index: nums[2] - 1,
      pageNum: nums[0]
    }
    pageData.next = {
      index: nums[2] + 1,
      pageNum: nums[0]
    }
    if (nums[2] === 0) {
      pageData.pro.index = 19
      pageData.pro.pageNum = nums[0] - 1
    } else if (nums[2] === 19) {
      pageData.next.index = 0
      pageData.next.pageNum = nums[0] + 1
    }

    let id = nums[1]
    let page = {
      start,
      pageSize
    }
    pathname = './view/blog_detail.html'

    router['/get/article/list'](null, (err, list) => {
      if (err) return callback(err, null)
      toReadFile(pathname)
      let views = null
      if (start === 0 && list.length === 2) {
        views = list[0].views
        pageData.currentArt = list[0]
        pageData.nextArt = list[1]
      } else {
        views = list[1].views
        pageData.proArt = list[0]
        pageData.currentArt = list[1]
        pageData.nextArt = list[2]
      }
      router['/update/article']({id, views}, (err, result) => {
        if (err) return console.log(err)
        console.log(result)
      })
    }, page)

    return
  } else {
    pathname = './view' + pathname + '.html'
  }

  toReadFile(pathname)

  function toReadFile(pathname) {
    readFile(pathname, (err, data) => {
      if (err) return callback(err, null)
      let file = path.extname(pathname)
      let html = ''
      if (file === '.html') {
        // html = template.render(data.toString(), {title: 'blog index', ...pageData})
        html = template(pathname, {title: 'blog index', ...pageData})
      } else {
        html = data
      }
      callback(err, html, {contentType: fileType[file]})
    })
  }
}
