import {
  customRef
} from 'vue'
export function debounceRef(value, duration = 1000) {
  let
  return customRef((track, trigger) => {
    let timer;
    return {
      get() {
        // 收集依赖
        track()
        return value
      },
      set(val) {
        // 做一个延迟更新的功能
        clearTimeout(timer)
        timer = setTimeout(() => {
          // 派发更新
          trigger()
          value = val
        }, duration)
      }
    }
  })
}