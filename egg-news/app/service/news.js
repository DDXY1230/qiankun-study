const {Service} = require('egg')
class NewService extends Service {
  async list(limit) {
    console.log('limit', limit)
    const {cts} = this
    let url = this.config.news.url
    let result = await this.ctx.curl(url, {
      method: 'GET',
      data: {limit},
      dataType: 'json'
    })
    console.log(result.data.data)
    return result.data.data

    // query是执行sql语句的意思, 增删改查
    // let result = await this.app.mysql.query(`SELECT * FROM news LINIT ${limit}`)
    // return result
  }
}
module.exports = NewService