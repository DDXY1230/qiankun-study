// 代码有问题


// 加边法
let max = 1000000
let pointSet = []
let distance = [
  [0,  4,  7,  max,  max],
  [4,  0,  8,  6,    max],
  [7,  8,  0,  5,    max],
  [max,6,  5,  0,    7],
  [max,max,max,7,    0]
]
function Node(value) {
  this.value = value
  this.neighbor = []
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

function canLink(tempBegin, end) {
  let beginIn = null;
  let endIn = null;
  for(let i = 0; i < resultList.length; i++) {
    if(resultList[i].indexOf(tempBegin) > -1) {
      beginIn = resultList[i]
    }
    if(resultList[i].indexOf(tempEnd) > -1) {
      endIn = resultList[i]
    }
  }
  // 两个点都是新的点 都不在任何部落, 可以连接, 产生新的部落
  /**
   * begin在A部落,end没有部落, A部落扩展一个村庄
   * end在A部落, begin没有部落,A部落扩展一个村庄
   * begin在A部落,end在B部落, 将AB两个部落合并
   * begin和end在同一个部落,不可以连接
   */
  if(beginIn != null && endIn != null && beginIn == endIn) {
    return false
  }
  return true
}
function link (resultList, tempBegin,tempEnd) {
  let beginIn = null;
  let endIn = null;
  for(let i = 0; i < resultList.length; i++) {
    if(resultList[i].indexOf(tempBegin) > -1) {
      beginIn = resultList[i]
    }
    if(resultList[i].indexOf(tempEnd) > -1) {
      endIn = resultList[i]
    }
  }
  // 两个点都是新的点 都不在任何部落, 可以连接, 产生新的部落
  if(beginIn ==null && endIn == null) {
    let newArr = []
    newArr.push(tempBegin)
    newArr.push(tempEnd)
    resultList.push(newArr)
  }else if(beginIn !=null && endIn == null) {
    // begin在A部落,end没有部落, A部落扩展一个村庄
    beginIn.push(tempEnd)
  }else if(beginIn == null && endIn != null) {
    //end在A部落, begin没有部落,A部落扩展一个村庄
    endIn.push(tempBegin)
  }else if(beginIn != null && endIn != null && beginIn != endIn) {
   // begin在A部落,end在B部落, 将AB两个部落合并
   beginIn.concat(endIn)
   let needRemove = resultList.indexOf(endIn)
   resultList.splice(needRemove,1)
  }
  tempBegin.neighbor.add(tempEnd)
  tempEnd.neighbor.add(tempBegin)
}
function kruskal(pointSet,distance) {
  let resultList = []// 这也是一个二维数组, 此数组代表的是有多少个部落
  let minDis = max;
  let begin = null;
  let end = null;
  for(let i = 0; i < distance.length; i++) {
    for(let j = 0; j < distance[i],length; j++) {
      let tempBegin = pointSet[i];
      let tempEnd = pointSet[j];
      if(i != j && distance[i][j] < minDis && canLink(resultList,tempBegin,tempEnd)) {// i == j 是自己到自己的点,没必要
        minDis = distance[i][j]
        begin = tempBegin
        end = tempEnd
      }
    }
  }
  link(resultList,begin,end)
  if(resultList.length == 1 && resultList.get(0).length == pointSet.length) {
    break
  }
}
kruskal(pointSet,distance)