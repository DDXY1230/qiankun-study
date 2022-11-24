export default function ajax(option = {}) {
option = Object.assign({
  url: '',
  method: 'get',
  data: null,
  success: null
}, option)

let xhr = new XMLHttpRequest
xhr.open('get', '')
xhr.onreadystatechange = function() {
  if(/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4){
    // 服务器返回数据了
    console.log(xhr.responseText)
    typeof option.success === 'function' ? 
    option.success(JSON.parse(xhr.responseText)) : null
  }
}
xhr.send()


}
