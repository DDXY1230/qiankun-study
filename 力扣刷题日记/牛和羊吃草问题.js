// 有一头牛和一只羊,都是绝顶聪明,它们比赛吃草,每次只能吃4的n次方的堆数.谁先让对方没有草吃谁赢.
function winner(n) {
  if(n < 5) { 
    return (n == 0 || n == 2) ? '后手' :'先手'
  }
  // n>=5
  let base = 1 // 当前先手决定吃的草数
  while(base <= n) {
    if(winner(n - base) == '后手') {
      return '先手'
    }
    if(base * 4 > n) break
    base *= 4
  }
  return '后手'
}
function winner1(n) {
  if(n % 5 == 0 || n % 5 == 2) {
    return '后手'
  }else {
    return '先手'
  }
}
console.log(winner(9) == winner1(9))
console.log(winner(19) == winner1(19))
console.log(winner(29) == winner1(29))
console.log(winner(39) == winner1(39))
