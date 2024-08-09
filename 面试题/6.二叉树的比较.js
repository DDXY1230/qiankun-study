function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

let a1 = new Node('a')
let b1 = new Node('b')
let c1 = new Node('c')
let d1 = new Node('d')
let e1 = new Node('e')
let f1 = new Node('f')
let g1 = new Node('g')

a1.left = c1;
a1.right = b1;
c1.left = f1;
c1.right = g1;
b1.left = d1;
b1.right = e1;

let a2 = new Node('a')
let b2 = new Node('h')
let c2 = new Node('c')
let d2 = new Node('d')
let e2 = new Node('e')
let f2 = new Node('f8')
let g2 = new Node('g')

a2.left = c2;
a2.right = b2;
c2.left = f2;
c2.right = g2;
b2.left = d2;
b2.right = e2;

  //原封不动的相等
function compareTree(root1,root2) {
  if(root1 == root2) return true;
  if(root1 == null && root2 != null || root2== null && root1!= null) return false;
  if(root1.value != root2.value) return false;
  let leftBool = compareTree(root1.left,root2.left)
  let rightBool = compareTree(root1.right,root2.right)
  return leftBool && rightBool
}
  // 还有一种情况就是,另一棵树拧过来相等的,也可以视为相等,具体看题目要求
  function compareTree(root1,root2) {
  if(root1 == root2) return true;
  if(root1 == null && root2 != null || root2== null && root1!= null) return false;
  if(root1.value != root2.value) return false;
   return compareTree(root1.left,root2.left) && compareTree(root1.right,root2.right)
   || compareTree(root1.left,root2.right) && compareTree(root1.right,root2.left) 
}


// 两颗树的diff算法
// {type: "新增", origin: null,now: c2}
// {type: "修改", origin: a1,now: c2}
// {type: "删除", origin: a1,now: null}

function diffTree(root1, root2,diffList) {
  if(root1 == root2) return diffList;
  if(root1 == null && root2 != null) {
    // 新增
    diffList.push({type: '新增', origin: null, now: root2})
  }else if(root1 != null && root2 == null) {
    // 删除
    diffList.push({type: '删除', origin: root1, now: null})
  }else if(root1.value != root2.value) {
    diffList.push({type: '修改', origin: root1, now: root2})
    diffTree(root1.left, root2.left, diffList)
    diffTree(root1.right, root2.right, diffList)
  }else {
    diffTree(root1.left, root2.left, diffList)
    diffTree(root1.right, root2.right, diffList)
  }
}
var diffList = []
diffTree(a1,a2,diffList)
console.log(diffList)