var isBalanced = function(root) {
  if(!root) return true
  const helper = (root) => {
    if(root == null) return 0
    let left = helper(root.left)
    let right = helper(root.right)
    if(left == -1 || right == -1 || Math.abs(left - right) > 1) {
      return -1
    }
    return Math.max(left, right) + 1
  }
  return helper(root) != -1
}