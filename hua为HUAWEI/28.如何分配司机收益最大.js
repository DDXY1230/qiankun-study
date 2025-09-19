function maxMoney(income) {
  if (income == null || income.length < 2 || (income.length & 1) != 0) {
    // 奇数
    return 0;
  }
  let N = income.length; // 司机数量一定是偶数,才能均分
  let M = N >> 1; // M = N / 2 要去A区域的人
  return process1(income, 0, M);
}
function process1(income, index, rest) {
  if (index === income.length) {
    return 0;
  }
  if (income.length - index == rest) {
    return income[index][0] + process1(income, index + 1, rest - 1);
  }
  if (rest == 0) {
    return income[index][1] + process1(income, index + 1, rest);
  }
  let p1 = income[index][0] + process1(income, index + 1, rest - 1);
  let p2 = income[index][1] + process1(income, index + 1, rest);
  return Math.max(p1, p2);
}
