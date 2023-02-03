import axios from 'axios'
import { ElMessage } from 'element-plus'
const $http = axios.create({
  baseURL: '',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
enum MSGS {
  "操作成功" = 200,
  "密码错误",
  "账号错误",
  "请求异常"
}
// 请求拦截
$http.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  config.headers.token = localStorage.getItem('token') || ''
  return config
})
// 响应拦截
$http.interceptors.response.use(res => {
  const code:number = res.data.code
  if(code !== 200) {
    // MSGS[code]
    ElMessage.error(MSGS[code])
    return Promise.reject(res.data)
  }
  return res.data
},err => {
  console.log('响应出错')
})
export default $http
