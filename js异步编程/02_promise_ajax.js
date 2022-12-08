function ajax(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.response = 'json'
    xhr.onload = function () {
      if (this.status === 2000) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}
ajax('xxx').then(function (res) {
  console.log(res)
}, function (err) {
  console.log(err)
})