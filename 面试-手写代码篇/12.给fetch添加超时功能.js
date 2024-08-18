// 给fetch添加超时功能
function createFetchWithTime(timeout = 1000) {
  return function (url, options) {
    return new Promise((resolve, reject) => {
      const signalController = new AbortController()
      fetch(url, {
        ...options,
        signal: signalController.signal
      }).then(resolve, reject);
      setTimeout(() => {
        reject(new Error('fetch timeout'))
        signalController.abort()
      }, timeout)
    })
  }
}

/**
 * fetch
 * 是promise风格的,状态一旦改变就不会改变了,所以setTimeout里面不需要判断
 * 有没有成功,因为没超时前肯定是改变了状态,超时还没有改变状态直接就抛出错误就行了
 */