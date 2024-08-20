function Node(value) {
  this.value = value
  this.neighbor = []
}
let a = new Node('a')
let b = new Node('b')
let c = new Node('c')
let d = new Node('d')
let e = new Node('e')

a.neighbor.push(b)
a.neighbor.push(c)
b.neighbor.push(a)
b.neighbor.push(c)
b.neighbor.push(d)
c.neighbor.push(a)
c.neighbor.push(b)
c.neighbor.push(d)
d.neighbor.push(b)
d.neighbor.push(c)
d.neighbor.push(e)
e.neighbor.push(d)

function deepSearch(node,target, path) {
  if(node == null) return false
  if(path.indexOf(node) > -1) return false // 之前找过了没有返回true,那现在肯定也是false
  if(node.value == target) return true
  path.push(node)
  let result = false;
  for(let i = 0; i < node.neighbor.length; i++) {
    result |= deepSearch(node.neighbor[i], target, path)
  }
  return result;
}