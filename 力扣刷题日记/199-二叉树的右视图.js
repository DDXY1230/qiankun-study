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
 * @return {number[]}
 */

var rightSideView = function (root) {
  if(!root) return []
  let queue = [root]
  let res = []
  while(queue.length) {
    let len = queue.length
    let last = null
    for(let i = 0; i < len; i++) {
      let node = queue.shift()
      if(node.left) {
        queue.push(node.left)
      }
      if(node.right) {
        queue.push(node.right)
      }
      if(node.val !== undefined) {
        last = node.val
      }
    }
    res.push(last)
  }
  return res
}