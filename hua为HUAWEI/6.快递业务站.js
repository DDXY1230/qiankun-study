/**
 * 找到一个可以到达所有站点的业务站作为主力站点
 * 1表示可达
 * 0表示不可达
 * 1111
 * 1110
 * 1110
 * 1001
 * 选择1号站点就可以到达所有站点
 * 输出1
 */
function getResult(matrix,n) {
  const ufs = new UnionFindSet(n)
  for(let i = 0; i < n; i++) {
    for(let j = i + 1; j < n; j++) {
      if(matrix[i][j] == "1") {
        ufs.union(i,j)
      }
    }
  }
  return ufs.count;
}
class UnionFindSet {
  constructor(n) {
    this.fa = new Array(n).fill(0).map((_,i) => i);
    this.count = n
  }
  find(x) {
    if(x !== this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]))
    }
    return x;
  }
  union(x,y) {
    const x_fa= this.find(x);
    const y_fa = this.find(y)
    if(x_fa !== y_fa) {
      this.fa[y_fa] = x_fa
      this.count--
    }
  }
}