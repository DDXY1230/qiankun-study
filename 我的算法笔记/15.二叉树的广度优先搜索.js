function Node(value) {
  this.value = value
  this.left = null
  this.right = null
}
let a = new Node('A')
let b = new Node('B')
let c = new Node('C')
let d = new Node('D')
let e = new Node('E')
let f = new Node('F')
let g = new Node('G')
a.left = b
a.right = c
b.left = d
b.right = e
c.left = f
c.right = g

function f1(rootList, target) {
  if (rootList == null || rootList.length == 0) return false;
  let childList = []
  for (let i = 0; i < rootList.length; i++) {
    if (rootList[i] !== null && rootList[i].value == target) {
      return true
    } else {
      console.log(rootList[i].left,rootList[i].right)
      rootList[i].left && childList.push(rootList[i].left)
      rootList[i].right && childList.push(rootList[i].right)
    }
  }
  return f1(childList, target)
}
console.log(f1([a], 'B'))
console.log(f1([a], 'z'))