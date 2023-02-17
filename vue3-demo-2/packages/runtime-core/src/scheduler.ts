const queue = []
export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}
let isFlushPending = false;
function queueFlush() {
  if (!isFlushPending) { // 不是正在刷新
    isFlushPending = true
    Promise.resolve().then(flushJobs)

  }
}
function flushJobs() {
  isFlushPending = false
  // 清空时需要根据顺序依次刷新
  // 父组件的序号肯定小一些
  queue.sort((a, b) => a.id - b.id)
  for (let i = 0; i < queue.length; i++) {
    const job = queue[i]
    job()
  }
  queue.length = 0
}
