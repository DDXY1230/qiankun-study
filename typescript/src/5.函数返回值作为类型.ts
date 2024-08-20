

// 函数的返回值作为类型约束
type Return<T> = T extends (...args: any[]) => infer R ? R : T;
type sum = (a: number, b: number) => number;
type concat = (a: any[], b: any[]) => any[]
let sumResult: Return<sum>
let concatResult: Return<concat>

// 函数第一个参数作为类型约束
type FirstArg<T> = T extends (x: infer F, ...arg: any[]) => any ? F : T;
type fa = FirstArg<(name: number, age: number) => void>; // number


// Promise 的返回值作为类型约束
type PromiseType<T> = T extends Promise<infer K> ? PromiseType<K> : T
type pt = PromiseType<Promise<Promise<string>>>



// 获取数组中每一项的类型作为联合数据类型
type ArrayType<T> = T extends (infer I)[] ? I : T;
type ItemType1 = ArrayType<[string, number]> // string | number
type ItemType2 = ArrayType<string[]> // string

// 克里化的函数推断
type Curried<A extends any[], R> = A extends [] ? () => R
  : A extends [infer ARG] ? (p: ARG) => R : A extends [infer ARG, ...infer REST] ?
  (p : ARG) => Curried<REST,R> : never;
declare function curry<A extends any[], R>(func: (...args: A) => R): Curried<A, R>
function sum(a: number, b: number) {
  return 112233
}
const curried = curry(sum)
const r = curried()