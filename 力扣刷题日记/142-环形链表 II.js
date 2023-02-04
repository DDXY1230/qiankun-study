var detectCycle = function (head) {
  if (head == null) return null
  let sP = head,
    fP = head,
    isExist = false;
  while (fP.next != null && fP.next.next != null) {
    sP = sP.next
    fP = fP.next.next
    if (sP == fP) {
      isExist = true
      break
    }
  }
  if (isExist) {
    sP = head;
    while (sP != fP) {
      sP = sP.next
      fP = fP.next
    }
    return sP // 返回环的开始节点
  }
  return null // 不存在环
}