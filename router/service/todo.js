/* 待办列表 */
const { getJSON } = require('../../utils')
const dao = require('../../web/dao')

function addTodo (req, callback) {
  getJSON(req, data => {
    dao.addTodo(data, (err, result) => {
      if (err) return callback(err, null)
      callback(null, {status: 0, data: result})
    })
  })
}

function updateTodo (req, callback) {
  getJSON(req, params => {
    dao.updateTodo(params, (err, result) => {
      if (err) return callback(err, null)
      callback(null, {status: 0, data: result})
    })
  })
}

function findTodo (req, callback) {
  getJSON(req, params => {
    const start = (params.pageNum - 1) * params.pageSize
    dao.findTodo([start, params.pageSize], (err, result) => {
      if (err) return callback(err, null)
      callback(null, {status: 0, data: result})
    })
  })
}

module.exports = {
  '/add/todo': addTodo,
  '/update/todo': updateTodo,
  '/get/todo/list': findTodo
}
