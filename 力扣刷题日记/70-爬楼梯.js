var climbStairs = function(n) {
  const map = new Map()
  const recursionFun = (n) => {
    if(n == 1) return 1
    if(n == 2) return 2
    if(map.get(n)) {
      return map.get(n)
    }else {
      let result = recursionFun(n - 1) + recursionFun(n - 2)
      map.set(n,result)
      return result
    }
  }
  return recursionFun(n)
}