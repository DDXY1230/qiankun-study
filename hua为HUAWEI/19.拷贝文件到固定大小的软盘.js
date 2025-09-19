const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let fileSizeArray = [];
let n = -1;
rl.on("line", (line) => {
  if (n === -1) {
    n = parseInt(line.trim(), 10);
  } else {
    fileSizeArray.push(parseInt(line.trim(), 10));
    if (fileSizeArray.length === n) {
      rl.close();
    }
  }
});
rl.on("close", () => {
  const blockCount = Math.floor(1474560 / 512);
  let dp = Array(blockCount + 1).fill(0);
  for (const fileSize of fileSizeArray) {
    const weight = Math.ceil(fileSize / 512);
    const worth = fileSize;
    for (let j = blockCount; j >= weight; j--) {
      dp[j] = Math.max(dp[j], dp[j - weight] + worth);
    }
  }
  console.log(dp[blockCount]);
});
