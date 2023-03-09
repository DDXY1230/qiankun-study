const { Controller } = require("egg");

class NewsController extends Controller {
  async index() {
    // this.ctx.body = 'hello'
    let { ctx } = this;
    // const list = [
    //   {
    //     id: "111",
    //     title: "世界",
    //     url: "http:baidu.com",
    //     image: "http: ",
    //     createAt: new Date().toLocaleString(),
    //   },
    //   {
    //     id: "112",
    //     title: "世界",
    //     url: "http:baidu.com",
    //     image: "http: ",
    //     createAt: new Date().toLocaleString(),
    //   },
    // ];
    let limit = ctx.query ? ctx.query.limit: 5
    let list = await this.service.news.list(limit)
    console.log('controller', list)
    await ctx.render("news", {
      list,
      title: this.app.cache ? this.app.cache.title : '默认新闻列表'
    });
  }
}
module.exports = NewsController;
