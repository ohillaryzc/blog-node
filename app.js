/* 入口js文件 */
// 核心模块
let http = require('http')
let url = require('url')
// let mysql = require('mysql')

// 第三方模块

let getPage = require('./router/page-get')
let postInterface = require('./router/interface-post')
let {getToken} = require('./web/dao/token')
let {getCookie} = require('./utils')
const noToken = ['/login', '/token/login']

global.session = {}
http.createServer((req, res) => {

  // 通过url模块把请求路径解析成一个对象，包含路径信息和参数信息
  let parseObj = url.parse(req.url, true)

  // 获取路径部分信息，不包含？后面的参数
  let pathname = parseObj.pathname

  // 暂时不考虑跨域的情况
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'GET') {
    getPage(pathname, req, (err, data, options) => {
      if (err) {
        res.statusCode = 404
        res.end('404 Not Found.')
      } else {
        if (options.contentType) {
          res.setHeader('Content-Type', options.contentType)
        }
        res.end(data)
      }
    })
  } else if (req.method === 'POST') {
    let cookie = req.headers.cookie // string
    let cookieData = null
    if (noToken.indexOf(pathname) !== -1) {
      postInterface(pathname, req, res, (err, data) => {
        if (err) {
          return res.end(JSON.stringify({ error: 1, data: err }))
        }
        res.end(JSON.stringify({ status: data.status, data: data.data, message: data.message }))
      })
    } else if (cookie) {
      cookieData = getCookie(req)
      if (!cookieData.user) {
        res.end(JSON.stringify({error_code: 10001, message: '请先登录！'}))
      } else if (!cookieData.token) {
        res.end(JSON.stringify({error_code: 10001, message: '登录信息过期，请先登录！'}))
      } else {
        getToken(cookieData.token, (err, result) => {
          if (err) return res.end(JSON.stringify(err))
          if (!result[0]) {
            res.end(JSON.stringify({error_code: 10001, message: '登录信息错误，请先登录！'}))
          } else if (Number(cookieData.user) !== result[0].user_id) {
            res.end(JSON.stringify({error_code: 10001, message: '登录信息错误，请先登录！'}))
          } else if (new Date().valueOf() > new Date(result[0].expire_time).valueOf()) {
            res.end(JSON.stringify({error_code: 10001, message: '登录信息过期，请先登录！'}))
          } else {
            postInterface(pathname, req, res, (err, data) => {
              if (err) {
                return res.end(JSON.stringify(err))
              }
              res.end(JSON.stringify(data))
            })
          }
        })
      }
    } else {
      res.end(JSON.stringify({error_code: 10001, message: '请先登录！'}))
    }
  }

}).listen(process.env.PORT || 3000, () => {
    console.log('Running 3000 git')
})
