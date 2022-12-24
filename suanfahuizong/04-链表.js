let a = {val: 'aaa'}
let b = {val: 'bbb'}
let c = {val: 'ccc'}
let d = {val: 'ddd'}
a.next = b
b.next = c
c.next = d
let p = a
while(p) {
  console.log(p.val) // 访问链表每个元素
  p = p.next
}
