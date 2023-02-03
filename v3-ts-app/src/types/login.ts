import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
export interface LoginFormInt {
  userName: string;
  password: string;
}
export class InitData {
  loginForm: LoginFormInt = {
    userName: "张三伊郎哈enenen嗯嗯",
    password: "123456"
  }
  loginFormRef =ref<FormInstance>()
}