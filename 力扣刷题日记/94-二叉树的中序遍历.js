// var inorderTraversal = function (root) {
//   // 方法一
//   const res = []
//   const stk = []
//   while (root || stk.length) {
//     while (root) {
//       stk.push(root)
//       root = root.left
//     }
//     root = stk.pop()
//     res.push(root.val)
//     root = root.right
//   }
// }

var inorderTraversal = function (root) {
  let res = []
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    res.push(root.val)
    dfs(root.right)
  }
  dfs(root)
  return res
}