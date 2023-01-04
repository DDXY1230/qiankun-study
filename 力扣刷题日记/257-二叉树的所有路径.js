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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  if(!root) return []
  let res = []
  const dfs = (root, curPath) => {
    if(root.left === null && root.right === null) {
      curPath += root.val 
      res.push(curPath)
      return
    }
    curPath += root.val + '->'
    root.left && dfs(root.left, curPath)
    root.right && dfs(root.right, curPath)
  }
  dfs(root, '')
  return res
}