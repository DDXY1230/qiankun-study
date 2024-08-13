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

function deepSearch(root, target) {
  if(root == null) return false
  if(root.value == target) return true
  let left = deepSearch(root.left, target)
  let right = deepSearch(root.right,target)
  return left || right
}
console.log(deepSearch(a, "n"))
console.log(deepSearch(a, "B"))