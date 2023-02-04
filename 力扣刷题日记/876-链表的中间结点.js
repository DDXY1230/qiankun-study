var middleNode = function(head) {
  let s = head, f = head;
  while(f != null && f.next != null) {
    s = s.next
    f = f.next.next
  }
  return s
}