const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let grid = [];
rl.on("line", (line) => {
  if (line === "") {
    rl.close();
  } else {
    let row = [];
    let start = 0,
      end = 0;
    while (end !== -1) {
      end = line.indexOf(" ", start);
      row.push(line.substring(start, end !== -1 ? end : undefined));
      start = end + 1;
    }
    grid.push(row);
  }
}).on("close", () => {
  let rows = grid.length;
  let cols = grid[0].length;
  let q = [];
  let toConvert = 0; // 需要改造的位置
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let val = grid[r][c];
      if (val === "YES") {
        q.push([r, c]);
      } else if (val === "NO") {
        toConvert++;
      }
    }
  }
  if (q.length === 0) {
    // 如果没有已经改造的位置,则无法继续改造
    console.log(-1);
    process.exit(0);
  }
  if (q.length === rows * cols) {
    // 如果所有位置都已经改造,则不需要继续改造
    console.log(0);
    process.exit(0);
  }
  let days = 0;
  let dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  while (q.length > 0 && toConvert > 0) {
    // 只要还有需要改造的位置,就继续改造
    let new_q = []; // 存储新改造的位置
    for (let pos of q) {
      let x = pos[0],
        y = pos[1];
      for (let dir of dirs) {
        let new_x = x + dir[0];
        let new_y = y + dir[1];
        if (
          new_x >= 0 &&
          new_x < rows &&
          new_y < cols &&
          grid[new_x][new_y] === "NO"
        ) {
          grid[new_x][new_y] = "YES";
          new_q.push([new_x, new_y]);
          toConvert--;
        }
      }
    }
    days++;
    q = new_q;
  }
  if (toConvert === 0) console.log(days);
  else console.log(-1);
});
