/**
 * @param {number} n
 * @return {number}
 */

var nthUglyNumber = function (n) {
  if (n == 1) return n
  // 暴力求法力扣不让通过
  // let i = 1,count = 0
  // while(true) {
  //     if(isUgly(i)) {
  //         count++
  //         if(count == n) {
  //             return i
  //         }
  //     }
  //     i++
  // }
  // 动态规划
  let dp = []
  dp[0] = 0
  dp[1] = 1
  let p2 = 1,
    p3 = 1,
    p5 = 1
  for (let i = 2; i <= n; i++) {
    let num2 = dp[p2] * 2,
      num3 = dp[p3] * 3,
      num5 = dp[p5] * 5
    dp[i] = Math.min(num2, num3, num5)
    if (dp[i] == num2) {
      p2++
    }
    if (dp[i] == num3) {
      p3++
    }
    if (dp[i] == num5) {
      p5++
    }
  }
  return dp[n]
};

function isUgly(n) {
  while (n >= 1) {
    if (n % 2 == 0) {
      n /= 2
    } else if (n % 3 == 0) {
      n /= 3
    } else if (n % 5 == 0) {
      n /= 5
    } else break
  }
  return n == 1
}