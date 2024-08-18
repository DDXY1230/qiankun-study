const channel = new BroadcastChannel('demo')
export function sendMsg(type,content) {
  channel.postMessage({
    type,
    content
  })
}

export function listenMsg(callback) {
  channel.addEventListener('message', (e) => {
    callback && callback(e.data)
  })
  return () => {
    channel.removeEventListener('message', callback)
  }
}

/**
 * 这里需要注意的是vue的响应式数据可能监听不到,记得...params.value  展开结构
 */