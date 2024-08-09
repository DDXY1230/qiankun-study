/**
 * 二叉搜索树有排序的效果, 
 * 左子树的节点都比当前节点小, 
 * 右子树的节点都比当前节点大.
 */
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
let num = 0;
function search(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    num+=1
    if(arr[i] == target) return true
  }
  return false
}
function addNode(root, num) {
  if(root == null) return
  if(root.value == num) return
  if(root.value < num) {
    if(root.right == null) root.right = new Node(num)
    else addNode(root.right, num)
  }else {
    if(root.left == null) root.left = new Node(num)
    else addNode(root.left, num)
  }
}
function buildSearchTree(arr) {
  if(arr == null || arr.length == 0) return null
  let root = new Node(arr[0])
  for(let i = 1; i < arr.length; i++) {
    addNode(root, arr[i])
  }
  return root
}

// let root = buildSearchTree(arr)
function searchByTree(root,target) {
  if(root == null) return false;
  if(root.value == target) return true
  if(root.value > target) return searchByTree(root.left, target)
  else return searchByTree(root.right, target)
}