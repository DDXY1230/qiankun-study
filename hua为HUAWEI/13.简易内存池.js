/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    n = lines[0] - 0;
  }

  if (n && lines.length === n + 1) {
    lines.shift();
    getResult(lines.map((line) => line.split("=")));
    lines.length = 0;
  }
});

function getResult(commands) {
  // used保存被占用的内存 [起始地址，结束地址]，初始时有一个[100,101]作为尾边界限定
  const used = [[100, 101]];

  for (let [key, val] of commands) {
    // 申请内存
    if (key === "REQUEST") {
      // 当指令为REQUEST时，对应值为要申请的内存的大小，即size
      const size = val - 0;

      // 我们默认从start=0位置开始检查可用内存区间
      let start = 0;
      let flag = true;

      for (let i = 0; i < used.length; i++) {
        let end = start + size - 1;
        // 要申请的内存区间
        const range = [start, end];
        // 检查要申请的内存区间和已占有的内存区间是否交叉
        if (!hasIntersection(used[i], range)) {
          // 若不存在交叉，则将申请区间加入used中
          used.splice(i, 0, range);
          flag = false;
          // 并打印此时申请区间的起始位置
          console.log(start);
          break;
        } else {
          // 若存在交叉，则将变更要申请的内存区间的起始位置
          start = used[i][1] + 1;
        }
      }

      // 一旦申请到内存，那么flag就会被赋值为false，否则就保持true，意味着每申请到内存，则打印error
      if (flag) console.log("error");
    }
    // 释放内存
    else {
      //  当指令为RELEASE时，值为要释放内存的起始地址addr
      const addr = val - 0;
      let flag = true;

      for (let i = 0; i < used.length; i++) {
        // 到已占有内存中找起始位置是addr的，找到则将该区间从used中删除，表示解除占用
        if (used[i][0] === addr) {
          used.splice(i, 1);
          flag = false;
          break;
        }
      }

      // 一旦释放成功，则flag就会被置为false，否则就保持True,意味着没有内存释放，则打印error
      if (flag) console.log("error");
    }
  }
}

// 判断两个区间是否存在交集
function hasIntersection(area1, area2) {
  const [s1, e1] = area1;
  const [s2, e2] = area2;

  if (s1 === s2) return true;
  else if (s1 < s2) return e1 >= s2;
  else return e2 >= s1;
}
