/**
 * 题目描述
给一个无向图染色，可以填红黑两种颜色，必须保证相邻两个节点不能同时为红色，输出有多少种不同的染色方案？

输入描述
第一行输入M(图中节点数) N(边数)

后续N行格式为：V1 V2表示一个V1到V2的边。

数据范围：1 <= M <= 15,0 <= N <= M * 3，不能保证所有节点都是连通的。

输出描述
输出一个数字表示染色方案的个数。

用例
输入	4 4
1 2
2 4
3 4
1 3
输出	7
说明	
4个节点，4条边，1号节点和2号节点相连，

2号节点和4号节点相连，3号节点和4号节点相连，

1号节点和3号节点相连，

若想必须保证相邻两个节点不能同时为红色，总共7种方案。


 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const lines = []
let m, n;
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 1) {
    [m, n] = lines[0].split(' ').map(Number)
  }
  if (n !== undefined && lines.length === n + 1) {
    const arr = lines.slice(1).map((line) => line.split(' ').map(Number))
    console.log(getResult(arr, m))
    lines.length = 0
  }
})
/**
 * 
 * @param {*} arr  边
 * @param {*} m 点的个数
 */
function getResult(arr, m) {
  // connect用于存放每个节点的相邻节点
  const connect = {}
  for (let [v1, v2] of arr) {
    connect[v1] ? connect[v1].add(v2) : (connect[v1] = new Set([v2]));
    connect[v2] ? connect[v2].add(v1) : (connect[v2] = new Set([v1]))
  }
  // 必须可以有一种全黑的染色方案
  let count = 1;
  // 求解染红色点的全部组合情况
  function dfs(m, index, path) {
    if (path.length === m) {
      return // 所有的点都链接起来了,退出递归函数
    }
    out: for (let i = index; i <= m; i++) {
      // 如果新加入节点和已有节点相邻, 则说明新加入节点不能染色成红色, 需要进行剪枝
      for (let j = 0; j < path.length; j++) {
        if (path[j].has(i)) continue out
      }
      count++
      if (connect[i] != undefined) {
        path.push(connect[i])
        dfs(m, i + 1, path)
        path.pop()
      } else {
        dfs(m, i + 1, path)
      }
    }
  }
  dfs(m,1,[])
  return count
}