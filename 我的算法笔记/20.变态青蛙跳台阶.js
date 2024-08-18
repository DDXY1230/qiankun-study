// 变态青蛙跳台阶
// 这只青蛙,一次跳1级, 2级, 或者n级台阶
// 这只青蛙,跳n级台阶有多少种方法


function jump(n) {
  if(n <= 0) return -1;
  if(n == 1) return 1;
  if(n == 2) return 2;
  let result = 0;
  for(let i = 1; i < n; i++) {
    result += jump(n - i);
  }
  return result + 1;// +1表示从0级台阶直接跳上去的情况
}
console.log(jump(4))