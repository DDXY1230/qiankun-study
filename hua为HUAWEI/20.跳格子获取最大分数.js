const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const inputs = [];
rl.on("line", (line) => {
  if (line === "") {
    rl.close();
  } else {
    inputs.push(line);
  }
}).on("close", function () {
  const n = parseInt(inputs[0]);
  const score = inputs[1].split(" ").map(Number);
  const k = parseInt(inputs[2]);
  // 特殊情况处理:如果格子数量为1,直接输出格子的分数
  if (n === 1) {
    console.log(score[0]);
    return;
  }
  // 动态规划数组,dp[ℹ️]存储到达第i个格子时能得到的最大分数
  const dp = Array(n).fill(0);
  dp[0] = score[0]; // 初始化,起点的最大分数就是起点的分数
  //使用双端队列来维护窗口内的最大dp值的索引
  const deque = [];
  deque.push(0);
  for (let i = 1; i < n; i++) {
    // 如果队列不为空且队列头部的索引已经超出了跳跃范围,从队列中移除头部
    while (deque.length > 0 && deque[0] < i - k) {
      deque.shift();
    }
    // 计算当前格子的最大分数, 当前格子的分数加上可以跳到该格子的最大分数
    dp[i] = score[i] + (deque.length === 0 ? 0 : dp[deque[0]]);
    // 维护队列,保持队列为递减,新的最大值需要添加到队列尾部
    while (deque.length > 0 && dp[deque[deque.length - 1] <= dp[i]]) {
      deque.pop();
    }
    deque.push(i);
  }
  // 输出到达最后一个格子时能得到的最大分数
  console.log(dp[n - 1]);
});
