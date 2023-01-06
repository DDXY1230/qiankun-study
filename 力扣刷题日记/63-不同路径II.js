/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  let m = obstacleGrid.length
  let n = obstacleGrid[0].length
  if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) return 0
  let dp = []
  for (let i = 0; i < m; i++) {
    dp[i] = []
  }

  let i = 0,
    k = false
  while (i < m) {
    if (k) {
      dp[i][0] = 0
    } else
    if (obstacleGrid[i][0] == 1) {
      dp[i][0] = 0
      k = true
    } else {
      dp[i][0] = 1
    }
    i++
  }

  let j = 0,
    s = false
  while (j < n) {
    if (s) {
      dp[0][j] = 0
    } else if (obstacleGrid[0][j] == 1) {
      dp[0][j] = 0
      s = true
    } else {
      dp[0][j] = 1
    }
    j++
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] == 1) {
        dp[i][j] = 0
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
  return dp[m - 1][n - 1]
};