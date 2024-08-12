/**
 * 给定两个数组, a,b,若a[i] == b[j] ,则称[i,j]为一个二元组, 
 * 求在给定的两个数组中, 二元组的个数.
 */

// 很简单的双重for  这个要是数据量很大的话就很傻了  太暴力了
function getResult_1(arrM, arrN){
  let count = 0;
  for(let i = 0; i < arrM.length; i++) {
    for(let j = 0; j < arrN.length; j++) {
      if(arrM[i] === arrN[j]){
        count++
      }
    }
  }
  return count
}



// 方法二
function getResult_2(arrM, arrN){
  const setM = new Set(arrM)
  const setN = new Set(arrN)
  const countM = {}
  for(let m of arrM) {
    if(setM.has(m)) countM[m] ? countM[m]++ : (countM[m] = 1)
  }
  const countN = {}
  for(let n of arrN) {
    if(setN.has(n)) countN[n] ? count[n]++ : (countN[n] = 1)
  }
  let count = 0
  for(let k in countM) {
    count += countM[k] * (countN[k] || 0)
  }
  return count
}
console.log(getResult_2([2,2,3],[2,4,3]))