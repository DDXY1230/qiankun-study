function fn(list) {
  let obj = {}
  let res = []
  for(let item of list) {
    obj[item.id] = item
  }
  for(let item of list) {
    if(item.parentId && obj[item.parentId]) {
      // (obj[item.parentId].children || 
      // (obj[item.parentId].children = [])).push(item)
      obj[item.parentId].children ? obj[item.parentId].children.push(item) :
      (obj[item.parentId].children = [])).push(item)
    }else {
      res.push(item)
    }
  }
  return res
}