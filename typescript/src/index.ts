interface IMyArr<T> {
  [key: number]: T
}
interface ICreateArray {
  <T>(x: number, y: T): IMyArr<T>
}
// interface 后面的类型和函数前面的类型区别, 如果放在函数前面 表示使用函数的时候确定了类型
// 放在接口后面表示使用接口的时候确定类型
const createArray: ICreateArray = <T>(times: number, value: T): IMyArr<T> => {
  let result = []
  for (let i = 0; i < times; i++) {
    result.push(value)
  }
  return result
}

// 泛型约束
// 约束 比如约束必须有length属性
type withLeng = {length:number}
const computerArrayLength = <T extends withLeng,K extends withLeng>(arr1:T, arr2:K) :number => {
  return arr1.length + arr2.length
}
computerArrayLength([1,2,3], {length: 4})


//-------
const getVal = <T extends object, K extends keyof T>(obj:T,key:K) => {

}
getVal({a:1,b:2}, 'b')