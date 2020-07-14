/* 可登录后台用户模块 */
const dao = require('../../web/dao')
const {getTokenByUserId, addToken, updateToken} = require('../../web/dao/token')
const { getJSON, getCookie } = require('../../utils')
const md5 = require('md5')
const getUid = require('uuid/v1')

/**
 * url: /login
 * @param {object} req 请求对象
 * @param {function} callback 回调函数
 * @param {object} res
 * */
function findMD5 (req, callback, res) {
  getJSON(req, (data) => {
    dao.findMD5(md5(data.password), (err, result) => {
      if (err) return callback(err, null)
      if (result.length !== 0) {
        let time = new Date().valueOf()
        let loginTime = new Date(result[0].expire_time).valueOf()
        if (time >= loginTime && result[0].type !== 0) {
          callback(null, {error: 1, message: '登录码过期'})
        } else {
          let user = result[0]
          getTokenByUserId(user.id, (err, result) => {
            if (err) return callback(err, null)
            let uid = getUid()
            let token = {
              user_id: user.id,
              token: uid,
              expire_time: new Date(new Date().valueOf() + 24 * 3600 * 1000)
            }
            if (!result.length) {
              // 生成token
              addToken(token, (err, result) => {
                if (err) return callback(err, null)
                if (result.affectedRows) {
                  res && res.setHeader('Set-Cookie', [
                    `user=${user.id}; httpOnly=true; max-age=${60 * 60 * 24}`,
                    `token=${uid}; httpOnly=true; max-age=${60 * 60 * 24}`
                  ])
                  callback(null, user)
                }
              })
            } else {
              updateToken(token, (err, result) => {
                if (err) return callback(err, null)
                if (result.affectedRows) {
                  res && res.setHeader('Set-Cookie', [
                    `user=${user.id}; httpOnly=true; max-age=${60 * 60 * 24}`,
                    `token=${uid}; httpOnly=true; max-age=${60 * 60 * 24}`
                  ])
                  callback(null, user)
                }
              })
            }
          })
        }
      } else {
        callback(null, {error: 1, message: '无效登录码'})
      }
    })
  })
}

/**
 * url:/add/login
 * @param {object} req 请求对象
 * @param {function} callback 回调函数
 * */
function addMD5 (req, callback) {
  getJSON(req, data => {
    dao.findMD5(md5(data.password), (err, result) => {
      if (err) return callback(err)
      if (result === 0) {
        data.password = md5(data.password)
        data.add_time = new Date()
        let expire = new Date().valueOf() + (data.expire_time * 24 * 3600 * 1000)
        data.expire_time = new Date(expire)
        dao.addMD5(data, (err, result) => {
          if (err) return callback(err, null)
          callback(null, result)
        })
      } else {
        callback(null, {error: 1, message: '登录码已存在'})
      }
    })
  })
}

/**
 * url:/token/login
 * @param {object} req 请求对象
 * @param {function} callback 回调函数
 * */
function findUserByToken (req, callback) {
  let cookie = getCookie(req)
  if (cookie.user && cookie.token) {
    getTokenByUserId(cookie.user, (err, result) => {
      if (err) return callback(err, null)
      let token = result[0].token
      if (token === cookie.token) {
        dao.findMD5ById(cookie.user, (err, users) => {
          if (err) return callback(err, null)
          callback(null, users[0])
        })
      } else {
        callback(null, {error: 1, message: '无效cookie，请重新输入登录码。'})
      }
    })
  } else {
    callback(null, {error: 1, message: '无效cookie，请重新输入登录码。'})
  }
}

module.exports = {
  '/login': findMD5,
  '/add/login': addMD5,
  '/token/login': findUserByToken
}
