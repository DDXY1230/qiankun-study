/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 方法一:
var maxDepth = function(root) {
  if(!root) return 0
  let stack = [root]
  let num = 0
  while(stack.length) {
    let len = stack.length
    num++
    while(len--) {
      const o = stack.shift()
      o.left && stack.push(o.left)
      o.right && stack.push(o.right)
    }
  }
}
// 方法二:
var maxDepth_2 = function(root) {
  if(!root) return 0
  return Math.max(maxDepth_2(root.left), maxDepth_2(root.right)) + 1
}
// 方法三:
var maxDepth_3 = function(root) {
  if(!root) return 0
  let res = 0
  const dfs = (n, l) => {
    if(!n) return
    if(!n.left && !n.right) {
      res = Math.max(res,l)
    }
    dfs(n.left, l+1)
    dfs(n.right, l+ 1)
  }
  dfs(root, 1)
  return res
}