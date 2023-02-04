// 链表是否有环
var hasCycle = function (head) {
  let f = head,
    s = head
  while (f != null && f.next != null) {
    s = s.next
    f = f.next.next
    if (s == f) return true
  }
  return false
}