const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let inputLines = [];
rl.on("line", (line) => {
  if (line === "") {
    rl.close();
  } else {
    inputLines.push(line);
  }
});
rl.on("close", () => {
  // 解析输入数据
  const heights = inputLines[0].split(",").map(Number); // 解析第一行高度数据
  const strength = parseInt(inputLines[1]); // 解析体力值
  console.log(heights, strength);
});
function findPeak(heights) {
  return heights.map((h, i) => {
    return (
      (i === 0 || h > heights[i - 1]) &&
      (i === heights.length - 1 || h > heights[i + 1])
    );
  });
}
function solve(heights, strength) {
  const n = heights.length;
  const peaks = findPeak(heights);
  console.log("🚀 ~ solve ~ peaks:", peaks);
  let up = Array(n).fill(Infinity);
  let down = Array(n).fill(Infinity);
  let tempUp = 0,
    tempDown = 0;
  upFrom = -1;
  for (let i = 0; i < n; i++) {
    if (heights[i] === 0) {
      tempUp = tempDown = 0;
      upFrom = i;
      continue;
    }
    if (upFrom === -1) continue;
    let diff = heights[i] - heights[i - 1];
    tempUp += diff > 0 ? 2 * diff : -diff;
    tempDown += diff > 0 ? diff : -2 * diff;
    up[i] = tempUp;
    down[i] = tempDown;
  }
  // 从右到左
  tempUp = tempDown = 0;
  upFrom = n;
  for (let i = n - 1; i >= 0; i--) {
    if (heights[i] === 0) {
      upFrom = i;
      tempUp = tempDown = 0;
      continue;
    }
    if (upFrom === n) continue;
    let diff = heights[i] - heights[i + 1];
    tempUp += diff > 0 ? 2 * diff : -diff;
    tempDown += diff > 0 ? diff : -2 * diff;
    up[i] = Math.min(up[i], tempUp);
    down[i] = Math.min(down[i], tempDown);
  }
  return peaks.filter((p, i) => p && up[i] + down[i] < strength).length;
}
