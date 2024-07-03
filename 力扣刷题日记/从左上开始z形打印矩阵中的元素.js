let arr = [
  [1,  2,  6,  7,  14],
  [3,  5,  8,  13, 15],
  [4,  9,  12, 16, 19],
  [10, 11, 17, 18, 20]
]
function printMatrixZigZag(matrix) {
  let tR = 0 // 上面A的横坐标
  let tC = 0 // 上面A的纵坐标
  let dR = 0 // 左面B的横坐标
  let dC = 0 // 左面B的纵坐标
  let endR = matrix.length - 1    // 矩阵横坐标终点
  let endC = matrix[0].length - 1 // 矩阵纵坐标终点
  let fromUp = false // 是否是右上往左下的行走方向
  while(tR <= endR + 1) {
    printLevel(matrix, tR,tC,dR,dC,fromUp)
    tR = tC == endC ? tR + 1 : tR;
		tC = tC == endC ? tC : tC + 1;
		dC = dR == endR ? dC + 1 : dC;
		dR = dR == endR ? dR : dR + 1;
    fromUp = !fromUp
  }
}
function printLevel(matrix,tR,tC,dR,dC,fromUp) {
  if(fromUp) {
    while(tR <= dR) {
      console.log(matrix[tR++][tC--])
    }
  }else {
    while(dR >= tR) {
      console.log(matrix[dR--][dC++])
    }
  }
}
printMatrixZigZag(arr)