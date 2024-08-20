const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length == 2) {
    const arr = lines[0].split('');
    const n = parseInt(lines[1])
    console.log(getResult(arr,n))
    lines.length = 0
  }
})
function getResult(arr,n) {
  // count 用于统计滑动窗口内各种颜色的数目
  const count = {}
  // 初始滑动窗口的左右边界, 注意这里的右边界r是不包括的,为了方便后面进行slice
  let l = 0;
  let r = l + n;
  // 统计初始滑动窗口中各种颜色的数量
  arr.slice(l,r).forEach((c) => {
    if(!count[c]) count[c] = 0
    count[c]++
  })
  // 将初始化滑动窗口内部颜色最多数量给max
  let max = Math.max.apply(null, Object.values(count))
  // 如果滑动窗口右边界未达到数组的尾巴, 就继续右移
  // 注意, 初始化滑动窗口的右边界r是不包括的,因此r可以直接当成下一个滑动窗口的右边界使用
  while(r < arr.length) {
    // 但滑动窗口右移动, 新的滑动窗口相比移动前来看
    // 新增了arr[r], 失去了arr[l]
    const add = arr[r++];
    const remove = arr[l++];
    if(!count[add]) count[add] = 0;
    count[add]++;
    if(!count[remove]) count[remove] = 0;
    else count[remove]--;
    // 只有新增数量的颜色可能突破最大值
    max = Math.max(max, count[add]);
  }
  return max
}