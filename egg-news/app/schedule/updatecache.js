const {
  Subscription
} = require("egg");
class UpdateCacheSubscription extends Subscription {
  static get schedule() {
    //定死的名字
    return {
      interval: "1m", // 每隔5分钟执行一次计划任务
      type: "all",// worker all   计划任务将在那个worker上执行, all值得死所有的worker
    };
  }
  async subscribe() {
    // 这个名字也是定死的
    const result = await this.ctx.curl(this.config.cache.url, {
      method: "GET",
      dataType: "json",
    });
    console.log('updatecache', result)
    this.ctx.app.cache = result.data
  }
}
module.exports = UpdateCacheSubscription;