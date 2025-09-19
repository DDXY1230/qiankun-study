/**
 * 6 7
 * 2 12 6 3 5 5
 * 表示小明手上的牌时7,接下来发6张牌,存在连续的牌整数和可以整除7的是  2 + 12 = 14 只存在一组
 * 输出 1
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let isFirstLine = true;
let n, m, cardNumbers;
rl.on("line", (line) => {
  if (isFirstLine) {
    [n, m] = line.split(" ").map(Number);
    isFirstLine = false;
  } else {
    // 读取后面发的n张牌的数字
    cardNumbers = line.split(" ").map(Number);
    // 使用数组来记录余数出现的情况
    const remainderExists = new Array(m).fill(false);
    let sum = 0;
    let found = false;
    for (let i = 0; i < n; i++) {
      const cardNumber = cardNumbers[i];
      sum += cardNumber;
      console.log("🚀 ~ sum:", sum);
      const remainder = sum % m;
      console.log("🚀 ~ remainder:", remainder);
      if (remainderExists[remainder]) {
        found = true;
        break;
      } else {
        remainderExists[remainder] = true;
      }
    }
    console.log(found ? 1 : 0);
    isFirstLine = true;
  }
});
