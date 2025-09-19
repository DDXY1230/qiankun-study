/**
 * 一个数组中有两种字符串“G”和“B”
 * 可以让G放在左边,让B放在右边
 * 或者B在左边,G在右边,
 * 但是只能在相邻之间进行操作, 请问至少要交换几次
 */
function minSteps(s) {
  if (s == null || s === "") return 0;
  let sArr = s.split("");
  let step1 = 0;
  let gi = 0;
  for (let i = 0; i < sArr.length; i++) {
    if (sArr[i] == "G") {
      step1 += i - gi++;
    }
  }
  let step2 = 0;
  let bi = 0;
  for (let i = 0; i < sArr.length; i++) {
    if (str[i] == "B") {
      step2 += i - bi++;
    }
  }
  return Math.min(step1, step2);
}
