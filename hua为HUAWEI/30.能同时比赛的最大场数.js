/**
 * 能力值相差k的才能匹配比赛
 * k=2 [3157]  13  57  两场  35的话,17没法比了
 */
function maxPairNum(arr, k) {
  if (k < 0 || arr == null || arr.length < 2) {
    return 0;
  }
  arr.sort((a, b) => a - b);
  let ans = 0;
  let n = arr.length;
  let l = 0;
  let r = 0;
  let usedR = Array(n).fill(false);
  while (l < n && r < n) {
    if (usedR[l]) {
      l++;
    } else if (l >= r) {
      r++;
    } else {
      let distance = arr[r] - arr[l];
      if (distance == k) {
        ans++;
        usedR[r++] = true;
        l++;
      } else if (distance < k) {
        r++;
      } else {
        l++;
      }
    }
  }
  return ans;
}
let res = maxPairNum([3, 5, 1, 7], 2);
console.log("返回结果", res);
