/**
 * 跟节点的左右两棵树,以及子节点的左右两棵树的高度差不能大于1,则称为平衡二叉树
 */
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
let a = new Node('a')
let b = new Node('b')
let c = new Node('c')
let d = new Node('d')
let e = new Node('e')
let f = new Node('f')
let g = new Node('g')
let h = new Node('h')
let j = new Node('j')
a.left = b
a.right = c
b.left = d
b.right = e
c.left = f
// c.right = g
d.left = h
d.right = j
j.right = g

function getDeep(root) {
  if (root == null) return 0;
  let leftDeep = getDeep(root.left)
  let rightDeep = getDeep(root.right)
  return Math.max(leftDeep, rightDeep) + 1
}

function isBalance(root) {
  if (root == null) return true
  let leftDeep = getDeep(root.left)
  let rightDeep = getDeep(root.right)
  if (Math.abs(leftDeep - rightDeep) > 1) return false
  else {
    return isBalance(root.left) && isBalance(root.right)
  }
}
console.log(isBalance(a))



// 将一个不平衡的二叉树转换成平衡二叉树
// 后序遍历的原则进行

// 左旋
function leftRotate(root) {
  //* 1.找到新根
  let newRoot = root.right
  //* 2.找到变化分支
  let changeTree = root.right.left
  //* 3.当前旋转节点的右孩子为变化分支
  root.right = changeTree
  //* 4.新根的左孩子为旋转节点
  newRoot.left = root
  //* 5.返回新的节点
  return newRoot

}
// 右旋
function rightRotate(root) {
  //1.找到新根
  let newRoot = root.left
  //2.找到变化分支
  let changeTree = root.left.right
  //3.当前旋转节点的左孩子为变化分支
  root.left = changeTree
  //4.新根的右孩子为旋转节点
  newRoot.right = root
  //5.返回新的跟节点
  return newRoot
}


function change(root) {
  if (isBalance(root)) return root;
  if (root != null) change(root.left)
  if (root != null) change(root.right)
  let leftDeep = getDeep(root.left)
  let rightDeep = getDeep(root.right)
  if (Math.abs(leftDeep - rightDeep) < 2) {
    return true
  } else if (leftDeep > rightDeep) { // 不平衡,左边深,需要右旋
    return rightRotate(root)
  } else { // 不平衡,右边深,需要左旋
    return leftRotate(root)
  }
}
change(a) // 让a平衡
console.log(isBalance(a))// 平衡了