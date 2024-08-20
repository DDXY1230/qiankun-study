/**
 * 题目描述
小明从糖果盒中随意抓一把糖果，每次小明会取出一半的糖果分给同学们。

当糖果不能平均分配时，小明可以选择从糖果盒中（假设盒中糖果足够）取出一个糖果或放回一个糖果。

小明最少需要多少次（取出、放回和平均分配均记一次），能将手中糖果分至只剩一颗。

输入描述
抓取的糖果数（<10000000000）：15

输出描述
最少分至一颗糖果的次数：5
 */


// 15  =》5
// 15 + 1
// 16/2 = 8
// 8/2 = 4
// 4 / 2= 2
// 2 / 2 = 1
// 所以是5次

/**Javascript Node ACM控制台输入 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', (line) => {
  console.log(getResult(Number(line)) + 'xinshuju')
})

function getResult(num) {
  ans = [Infinity];
  recursive(num, 0, ans);
  return ans[0]
}
function recursive(num, count, ans) {
  if(num == 1) {
    ans[0] = Math.min(ans[0], count)
    return
  }
  if(num%2 == 0) {
    recursive(num / 2, count + 1,ans)
  }else {
    recursive(num + 1, count + 1, ans)
    recursive(num - 1, count + 1, ans)
  }
}