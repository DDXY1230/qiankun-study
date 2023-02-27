// 泛型

// 声明的时候需要<> 包裹起来, 传值的时候也需要
// function createArray<T>(times: number, value: T):T[] {//1
function createArray<T>(times: number, value: T):Array<T> {//2   1.2两种写法都可以
  let result = []
  for (let i = 0; i < times; i++) {
    result.push(value)
  }
  return result
}
let r = createArray<string>(5, 'abc')
let r1 = createArray<number>(3, 123)


// 元组进行类型交换
const swap = <T,K>(tuple:[T,K]):[K, T] => {
  return [tuple[1],tuple[0]]
}
swap<string, number>(['abc',123])
export {}