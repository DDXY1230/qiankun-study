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
  }
}
module.exports = NewService