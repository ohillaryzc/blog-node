/* 全部路由 */
const tagRouter = require('./service/tag')
const classifyRouter = require('./service/classify')
const articleRouter = require('./service/article')
const aboutRouter = require('./service/about')
const sayingRouter = require('./service/saying')
const userRouter = require('./service/user')
const uploadRouter = require('./service/upload')
const catchJueJin = require('./service/juejin')

module.exports = {
  ...tagRouter,
  ...classifyRouter,
  ...articleRouter,
  ...aboutRouter,
  ...sayingRouter,
  ...userRouter,
  ...uploadRouter,
  ...catchJueJin
}
