
// express 里面有静态文件中间件的概念 建在app/public
module.exports = (app) => {
  // 1. 从app中结构路由和控制器
  const {router, controller} = app
  // 2. 定义一个路由规则, 档客户端通过get方式访问/news的时候, 会由index函数来处理
  router.get('/news', controller.news.index)

}