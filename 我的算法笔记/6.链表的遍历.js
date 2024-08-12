class Node{
  constructor(value) {
    this.value = value
    this.next = null
  }
}
let node1 = new Node(1)
let node2 = new Node(2)
let node3 = new Node(3)
let node4 = new Node(4)
let node5 = new Node(5)
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
console.log(node1)
// 遍历代码重点
function bianLink(root) {
  let temp = root
  while(true) {
    if(temp !== null) {
      console.log(temp.value)
    }else {
      break
    }
    temp = temp.next
  }
}
// bianLink(node1)
// 递归
function bianLink2(root) {
  if(root == null) return
  console.log('递归',root.value)
  bianLink2(root.next)
}
bianLink2(node1)