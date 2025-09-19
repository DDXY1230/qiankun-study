const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line);
  if (input.length === 2) {
    rl.close();
  }
});
rl.on("close", () => {
  let [sum, bucketBallNums] = input[0].split(" ").map(Number);
  let ans = input[1].split(" ").map(Number);
  let totalSum = ans.reduce((acc, val) => acc + val, 0);
  let maxBall = Math.max(...ans);
  if (totalSum <= sum) {
    console.log("[]");
    return;
  }
  // 二分法查找最大容量
  let left = 0,
    right = maxBall;
  while (left < right) {
    let mid = Math.floor((left + right + 1) / 2);
    let res = ans.reduce((acc, val) => acc + Math.min(mid, val), 0);
    if (res <= sum) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  //
  console.log("[" + ans.map((x) => Math.max(0, x - left)).join(",") + "]");
});
