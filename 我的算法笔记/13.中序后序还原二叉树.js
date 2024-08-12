let zhong = ['f', 'c', 'g', 'a', 'd', 'b', 'e']
let hou = ['f', 'g', 'c', 'd', 'e', 'b', 'a']
// 中序遍历的左子树和后序遍历的左子树个数时一样的
function Node(value) {
  this.value = value
  this.left = null
  this.right = null
}

function f1(zhong, hou) {
  if (zhong == null || hou == null || zhong.length == 0 || hou.length == 0 ||
    zhong.length != hou.length
  ) return
  let root = new Node(hou[hou.length - 1])
  let index = zhong.indexOf(root.value)
  let leftZhong = zhong.slice(0, index)
  let rightZhong = zhong.slice(index + 1, zhong.length)

  let leftHou = hou.slice(0, index) // 中序遍历的左子树和后序遍历的左子树个数时一样的
  let rightHou = hou.slice(index, hou.length - 1)
  root.left = f1(leftZhong, leftHou)
  root.right = f1(rightZhong, rightHou)
  return root

}
console.log(f1(zhong, hou))