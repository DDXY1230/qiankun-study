function Node(value) {
  this.value = value
  this.children = []
}
let a = new Node('a')
let b = new Node('b')
let c = new Node('c')
let d = new Node('d')
let e = new Node('e')
let f = new Node('f')

a.children.push(c)
a.children.push(f)
a.children.push(b)
b.children.push(d)
b.children.push(e)

function deepSearch(root, target) {
  if(root == null) return false;
  if(root.value == target) return true
  let result = false;
  for(let i = 0; i < root.children.length; i++) {
    result |= deepSearch(root.children[i], target)
  }
  return result
}