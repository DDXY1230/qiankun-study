const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const charMap = [
  "abc", //0
  "def", //1
  "ghi", //2
  "jkl", //3
  "mno", //
  "pqr", //5
  "st", //6
  "uv", //7
  "wx", //8
  "yz", //9
];
let filterSet = new Set();
// 判断是否包含全部单词
function isContainsAllFilterChars(used) {
  // console.log("🚀 ~ isContainsAllFilterChars ~ used:", used);
  // console.log("🚀 ~ isContainsAllFilterChars ~ filterSet:", filterSet);
  for (let x of filterSet) {
    if (!used.has(x)) {
      return false;
    }
  }
  return true;
}

function dfs(letters, index, path, res, used) {
  if (index === letters.length) {
    if (!isContainsAllFilterChars(used)) {
      res.push(path.join("") + ",");
    }
    return;
  }
  // 遍历当前数字对应的字母
  for (let c of letters[index]) {
    // console.log("🚀 ~ dfs ~ c:", c);
    path.push(c);
    used.add(c);
    dfs(letters, index + 1, path, res, used);
    path.pop();
    used.delete(c);
  }
}
rl.question("", (digits) => {
  rl.question("", (filter) => {
    filterSet = new Set(filter);
    let letters = digits.split("").map((d) => charMap[parseInt(d)]);
    // console.log("🚀 ~ letters:", letters);
    let res = [];
    dfs(letters, 0, [], res, new Set());
    console.log("🚀 ~ res:", res.join(""));
    rl.close();
  });
});
