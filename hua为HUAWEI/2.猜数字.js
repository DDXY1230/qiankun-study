/**
 * 一个人设定一组四码的数字作为谜底, 另一方猜,
 * 每猜一个数, 
 * 出数者就要根据这个数字给出提示,提示以XAYB的形式呈现,直到猜中为止.
 * 其中 X表示数字正确且位置正确的数的个数
 * (数字正确且位置正确)
 * 而   Y表示数字正确而位置不对的数的个数
 * 例如:当谜底8123,而猜1052时,出题者提示0A2B
 * 例如:当谜底5637,而猜谜者猜4931时, 出题者必须提示1A0B
 */
  


  //解析:
  /**
   * javascript Node ACM模式 控制台输入获取
   */
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const lines = []
  let n;
  let infos;
  rl.on("line",(line) => {
    lines.push(line);
    if(line.length == 1) {
      n = lines[0] - 0
    }
    if(n && lines.length == n + 1) {
      lines.shift();
      infos = lines.map((line) => line.split(""))
      console.log(getResult());
      lines.length == 0
    }
  })



function getResult () {
  const num = getCombine();
  const cache = [];
  for(let c1 of num[0]){
    for(let c2 of num[1]) {
      for(let c3 of num[2]) {
        for(let c4 of num[3]) {
          const answer = `${c1}${c2}${c3}${c4}`
          if(isValid(answer)) cache.push(answer)
        }
      }
    }
  }
  // 答案不确定则输出NA
  if(cache.length != 1) return 'NA'
  else return cache[0]
}
// 剪枝逻辑
// 本题后期优化主要在这个逻辑里面
// 分别对应四码的谜底数字每一位,而每个集合元素又是一个Set,
// 里面存放谜底数字对应的位上可能是哪些数字
function getCombine() {
  // 初始时, 四个码谜底的每一位都有十种可能, 即每一位都能取值0-9
  const num = new Array(4).fill(0).map(() => new Set(new Array(10).fill(0).map(_,i) => i+ ''))
  // 遍历猜谜者猜的数字guess_num与提示guess_result
  for(let info of infos) {
    const [guess_num,guess_result] = info
    // 数字正确且位置正确的个数
    let countA = guess_result[0] - 0;
    // 数字正确且位置不正确的个数
    let countB = guess_result[2] - 0;
    // 如果countA == 0则说明当前guess_num的每一位上的数字的位置都不正确,对应位置上不应该出现该数字
    if(countA == 0) {
      for(let i = 0; i < 4; i++) {
        const c = guess_num[i];
        // 如果countB == 0 则说明当前guess_num上的数字都不正确,即任何位置都不应该出现该数字
        if(countB == 0) {
          num[0].delete(c)
          num[1].delete(c)
          num[2].delete(c)
          num[3].delete(c)
        }else {
          num[i].delete(c)
        }
      
      
      }
    }
  }
  return num
}
// 判断谜底answer是否正确, 即是否符合所有的猜测提示
function isValid(answer){
  for(let info of infos) {
    const [guess,expect_result] = info
    const real_result = getGuessResult(guess,answer)
    if(real_result!= expect_result) return false
  }
  return true
}
// 获取猜的数字guess在指定谜底answer下的猜测提示
function getGuessResult(guess,answer) {
  let countA = 0
  let countB = 0
  const answer_arr = new Array(10).fill(0)
  const guess_arr = new Array(10).fill(0)
  for(let i = 0; i < guess.length; i++) {
    const c1 = guess[i] - 0;
    const c2 = answer[i] - 0;
    if(c1 == c2) countA++
    else {
      guess_arr[c1]++
      answer_arr[c2] ++
    }
  }
  for(let i = 0; i < 10; i++) {
    countB += Math.min(answer_arr[i], guess_arr[i])
  }
  return `${countA}A${countB}B`
}
