/* 所有方法 */
const tag = require('./tag')
const classify = require('./classify')
const article = require('./blog')
const about = require('./about')
const saying = require('./saying')
const user = require('./user')
const todo = require('./todo')

module.exports = {
    ...tag,
    ...classify,
    ...article,
    ...about,
    ...saying,
    ...user,
    ...todo
}
