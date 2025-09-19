const readline = require("readline");

// 创建 readline 接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 定义存储输入的数组
const inputs = [];

// 读取输入
rl.on("line", (input) => {
  if (input === "") {
    rl.close();
  } else {
    inputs.push(input);
    console.log("🚀 ~ inputs:", inputs);
  }
}).on("close", () => {
  // 读取窗口数量N
  const numCol = parseInt(inputs[0]);
  console.log("🚀 ~ numCol:", numCol);

  // 读取每个窗口需要的元素数量K
  const numRow = parseInt(inputs[1]);

  // 创建队列列表，用于存储每个列表的元素
  const queueList = inputs.slice(2).map((line) => line.split(" ").map(Number));
  console.log("🚀 ~ queueList:", queueList);

  // 创建一个数组，用于存储最终的元素排列
  const matrix = new Array(numRow * numCol).fill(0);
  let matrixIndex = 0; // 用于标记当前填充到matrix数组中的位置
  let queueIndex = 0; // 用于标记当前处理的队列索引

  // 循环，直到matrix数组被完全填满
  while (matrixIndex < matrix.length) {
    let didRemoveQueue = false; // 标记本轮循环中是否有队列被移除
    // 遍历每个窗口，并尝试从当前队列中为每个窗口提取一个元素
    for (let i = 0; i < numCol; i++) {
      if (!queueList.length) {
        // 如果所有队列都已处理完毕，则退出循环
        break;
      }
      // 如果当前队列为空，则移除该队列
      if (!queueList[queueIndex].length) {
        queueList.splice(queueIndex, 1);
        if (!queueList.length) {
          break;
        }
        queueIndex %= queueList.length;
        didRemoveQueue = true;
      }
      // 如果当前队列不为空，则从队列中取出一个元素填充到matrix数组中
      if (queueList.length && queueList[queueIndex].length) {
        matrix[matrixIndex] = queueList[queueIndex].shift();
        matrixIndex += 1;
        if (matrixIndex >= matrix.length) {
          break;
        }
      }
    }

    // 如果本轮循环没有队列被移除，并且队列列表不为空，则处理下一个队列
    if (!didRemoveQueue && queueList.length) {
      queueIndex = (queueIndex + 1) % queueList.length;
    }
  }

  // 按照窗口顺序构建输出字符串
  console.log("matrix", matrix);
  const output = [];
  for (let col = 0; col < numCol; col++) {
    for (let row = 0; row < numRow; row++) {
      output.push(matrix[row * numCol + col]);
    }
  }
  console.log(output.join(" "));
});
