let qian = ['a','c','f','g','b','d','e']
let zhong = ['f','c','g','a','d','b','e']

function Node(value) {
  this.value = value
  this.left = null
  this.right = null
}
function f1(qian,zhong) {
  if(qian == null || zhong == null ||
    qian.length == 0 || zhong.length == 0
  ) return ;
  let root = new Node(qian[0]) // 根节点
  let index = zhong.indexOf(root.value)// 根节点在中序遍历中的位置
  let qianLeft = qian.slice(1,index + 1)
  let qianRight = qian.slice(index + 1,qian.length)
  
  let zhongLeft = zhong.slice(0, index)
  let zhongRight = zhong.slice(index + 1, zhong.length)
  root.left = f1(qianLeft, zhongLeft)
  root.right = f1(qianRight, zhongRight)
  return root
}
console.log(f1(qian,zhong))