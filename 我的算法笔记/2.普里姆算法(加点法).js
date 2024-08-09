/**
 * 普里姆算法俗称加点法
 * 任选一个点作为起点
 * 找到以当前点作为起点中路径最短的边
 * 如果这个边的另一端没有被连通起来,那么就连接
 * 如果这个边的另一端已经被连通了,那么就卡倒数第二短的边
 * 重复以上操作,直到所有的点都纳入集合
 */
let max = 100000 // 表示不相连的两个点
let pointSet = []
distance = [
  [0, 4, 7, max, max],
  [4, 0, 8, 6, max],
  [7, 8, 0, 5, max],
  [max, 6, 5, 0, 7],
  [max, max, max, 7, 0],
]

function Node(value) {
  this.value = value;
  this.neighbors = [];
}
let a = new Node('A')
let b = new Node('B')
let c = new Node('C')
let d = new Node('D')
let e = new Node('E')
pointSet.push(a)
pointSet.push(b)
pointSet.push(c)
pointSet.push(d)
pointSet.push(e)
// 找到点在矩阵图的第几行
function getIndex(str) {
  for (let i = 0; i < pointSet.length; i++) {
    if (str == pointSet[i].value) return i
  }
  return -1;
}
// 根据已经有的点获取到距离最短的点
function getMinDisNode(pointSet, distance, nowPointSet) {
  let fromNode = null;
  let minDisNode = null;
  let minDis = max;
  // 根据已有的点为起点, 依次判断连接其他的点的距离是多少
  for (let i = 0; i < nowPointSet.length; i++) {
    let nowPointIndex = getIndex(nowPointSet[i].value) // 获取当前点在矩阵图的哪一行
    for (let j = 0; j < distance[nowPointIndex].length; j++) {
      let thisNode = pointSet[j]
      if (nowPointSet.indexOf(thisNode) < 0 &&
        distance[nowPointIndex][j] < minDis) {
        fromNode = nowPointSet[i];
        minDisNode = thisNode;
        minDis = distance[nowPointIndex][j]
      }
    }
  }
  fromNode.neighbors.push(minDisNode);
  minDisNode.neighbors.push(fromNode)
  return minDisNode
}

function prim(pointSet, distance, start) {
  let nowPointSet = []
  nowPointSet.push(start)
  // 获取最小代价的边
  while (true) {
    let minDisNode = getMinDisNode(pointSet, distance, nowPointSet)
    nowPointSet.push(minDisNode)
    if(nowPointSet.length == pointSet.length) {
      // 所有的点已经连起来了
      break;
    }
  }
  return nowPointSet
}
console.log(prim(pointSet, distance, a))