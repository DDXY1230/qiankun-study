// 原型链__proto__ 相当于链表的next
/* 
如果在A沿着原型链能找到B.prototype, 那么A instanceof B 为true
 */


// 简述instanceof 的特点
const instanceof11 = (A,B) => {
  let p = A
  while(p) {
    if(p == B.prototype) {
      return true
    }
    p = p.__proto__
  }
}
console.log(instanceof11([], Array))