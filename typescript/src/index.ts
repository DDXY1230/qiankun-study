// 元组
const tuple: [string, boolean, number] = ['1', true, 1]
let r = tuple.pop();
tuple.push('str')
// tuple[3] = 100 // 不能通过索引更改元组

// 枚举类型
enum Role {
  USER,
  ADMIN,
  MANAGER = 'manager'
}
console.log(Role.USER)// 0
console.log(Role[1]) //ADMIN 枚举支持反举, 但是仅限于索引
console.log(Role.ADMIN)
console.log(Role.MANAGER)
console.log(Role) // 打印出来是一个对象

// const  常量枚举
const enum Good { // 加上const 变成常量枚举 常量枚举不能被编译成一个对象, 也无法访问反举
  APPLE,
  BANANA,
  MANGO
}

// null undefined  在严格模式下 undefined只能付给undefined null只能付给null
// never 表示代码无法达到终点,比如说出错 或者死循环 或者永远走不到的判断
function setVal(val: string) {
  if (typeof val === 'string') {

  } else {
    val //  走不到的逻辑  帮我们代码做完整校验 走不到else中 val就是never
  }
}
function throwError(): never {
  throw new Error()
}
function whileTrue(): never {
  while (true) {
    // 死循环走不到的never
  }
}


// void 
/* 
void表示函数返回值 也可以描述变量 void的值只能赋予null 和 undefined
严格模式下不能把null赋予给void类型
 */
function getVoid(): void {
  return undefined
  // return null //爆红线
}



//object 

let max = Number.MAX_SAFE_INTEGER
console.log(BigInt(max) + BigInt(1) === BigInt(max) + BigInt(2))// false


// 数字 字符串 布尔 数组 元组 any never void null  undefined 枚举
// 内置类型  自定义类型 高级类型



// 联合数据类型
let numOrStr: number | string;
// 默认联合类型在没有赋值的时候 调用的方法是两个的公共方法 比如valueof tostring...
numOrStr = 123321
numOrStr = '987987' // 如果赋值了,就会根据上下文自动推断类型的方法

const ele:HTMLElement | null = document.getElementById('app')
ele!.innerHTML  = 'abc' // 非空断言

// 直接强制转某个类型
// <HTMLElement>ele
let a:string | number | undefined;
(a as any) as boolean // 但是不建议这么写

export {} // 表示这里面的命名不影响其他类型