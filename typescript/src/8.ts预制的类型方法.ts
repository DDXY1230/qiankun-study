//
interface User {
  age: number;
  name: string;
}

let u: Partial<User>;
u = {
  age: 12,
};
// 原理:
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

/**
 * Required<T>  必填
 * Readonly<T>  只读
 * Exclude<'a' | 'b','b'> 排除b
 * Exclude<T, null | undefined> // 剔除null和undefined
 * Extract<T, 'b'> 只保留b
 * NonNullable<T> 去除null undefined
 * ReturnType<func> 得到函数的返回类型 func是函数类型
 *
 *InstanceType  获取构造函数的函数类型
 */
function sum(a: number, b: number) {
  return a + b;
}
let aaa: ReturnType<typeof sum>;
