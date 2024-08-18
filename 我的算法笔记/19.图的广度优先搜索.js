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

function bfs(nodes,target, path) {
  if(nodes == null || nodes.length == 0) return false;
  let nextNodes = []
  for(let i = 0; i < nodes.length; i++) {
    if(path.indexOf(nodes[i]) > -1) continue
    path.push(nodes[i])
    if(nodes[i].value == target) return true
    else nextNodes = nextNodes.concat(nodes[i].neighbor);

  }
  return bfs(nextNodes,target,path)
}
console.log(bfs([c], 'b', []))