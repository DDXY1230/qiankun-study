

/**
 * 总结: typeof作用于类,返回的就是泪的构造函数类型也就是类本身,
 * 如果直接写表示的是类的对象
 */
class User1 {
  loginid: string
  loginpwd: string
}
function createUser(cls: typeof User1): User {
  return new cls
}
const u1 = createUser(User1)


// keyof
/**
 * 可以作用于类、接口、类型别名,
 */

interface User2 {
  loginid: string
  loginpwd: string
  age: number
}
function printUserProperty(obj: User2, prop: keyof User2) {
  console.log(obj[prop])
}
const u2: User2 = {
  loginid: 'sdfs',
  loginpwd: 'sdfsdf',
  age: 44
}

printUserProperty(u2, 'age')





// in
/**
 * in这个关键字往往和keyof联用
 */

interface User3 {
  loginId: string,
  loginpwd: string,
  age: number
}
type Obj = {
 readonly [p in keyof User3]: User3[p] // 全部做成已读的
}
const u3: Obj = {
  loginId: "uu",
  loginpwd: "kk",
  age: 77
}

// 结合泛型
type UserPartial<T> = {
  [p in keyof T]?: T[p]
}
type readonly<T> = {
  readonly [p in keyof T]: T[p]
}

