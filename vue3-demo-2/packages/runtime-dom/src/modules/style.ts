export const patchStyle = (el, prev, next) => {
  const style = el.style // 获取样式
  if (next == null) {
    el.removeAttribute('style') // 
  } else {
    // 老的里面新的有没有
    if(prev) {
      for(let key in prev) {
        if(next[key] == null){// 老的有  新的没有  需要删除
          style[key] = ''
        } 
      }
    }
    // 新的里面需要赋值到style
    for (let key in next) {
      style[key] = next[key]
    }
  }
}