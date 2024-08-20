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

function bfs(roots, target) {
  if(roots == null || roots.length == 0) return false 
  let children = [] 
  for(let i = 0; i < roots.length; i++) {
    if(roots[i].value == target) return true
    else {
      children = children.concat(roots[i].children)
    }
  }
  return bfs(children,target)
}
console.log(bfs([a], 'n'))
console.log(bfs([a], 'f'))