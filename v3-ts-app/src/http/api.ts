import $http from "./index";
import { LoginFormInt } from '../types/login'
export const login = (data: LoginFormInt) => {
console.log('登录请求',data)
  // return $http({ url: "/login", method: 'post', data })
}
export const getList = (data: LoginFormInt) => {
console.log('getList请求',data)
  // return $http({ url: "/login", method: 'post', data })
}
export const getRouter = (data: any) => {
  console.log('路由的获取')
}