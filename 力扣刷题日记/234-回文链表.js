// 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

var isPalindrome = function (head) {
  // 反转链表
  const reverse = (head) => {
    let p1 = head,
      p2 = null
    while (p1) {
      let tem = p1.next
      p1.next = p2
      p2 = p1
      p1 = tem
    }
    return p2
  }


  let f = head,
    s = head
  while (f != null && f.next != null) {
    f = f.next.next
    s = s.next
  }
  // 如果链表是奇数个, 把中间的节点归到左边
  if (f != null) {
    s = s.next
  }
  s = reverse(s)
  f = head
  while (s != null) {
    if (f.val != s.val) return false
    f = f.next
    s = s.next
  }
  return true
}