// 多个数组之间合并交集取出公共区间,公共区间存在交集继续合并
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lines = [];
rl.on("line", (line) => {
  if (line === "") {
    rl.close();
  } else {
    lines.push(line);
  }
}).on("close", () => {
  let n = parseInt(lines[0]);
  if (n === 1) {
    console.log("None");
    return;
  }
  let intervals = [];
  for (let i = 1; i <= n; i++) {
    let [start, end] = lines[i].split(" ").map(Number);
    intervals.push([start, end]);
  }
  // 按照起点排序,起点相同则按照终点排序
  intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  console.log("🚀 ~ intervals:", intervals);

  let combined = [];
  for (let i = 0; i < n; i++) {
    let [start1, end1] = intervals[i];
    for (let j = i + 1; j < n; j++) {
      let [start2, end2] = intervals[j];
      if (start2 <= end1) {
        combined.push([start2, Math.min(end1, end2)]);
      } else {
        break;
      }
    }
  }
  if (combined.length === 0) {
    console.log("None");
    return;
  }
  combined.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let [prevStart, prevEnd] = combined[0];
  for (let i = 1; i < combined.length; i++) {
    let [currStart, currEnd] = combined[i];
    if (prevEnd >= currStart) {
      prevEnd = Math.max(prevEnd, currEnd);
    } else {
      console.log(prevEnd, prevEnd)[(prevStart, prevEnd)] = [
        currStart,
        currEnd,
      ];
    }
  }
  console.log(prevStart, prevEnd);
});
