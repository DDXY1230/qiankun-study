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

const ele: HTMLElement | null = document.getElementById('app')
ele!.innerHTML = 'abc' // 非空断言 !感叹号非空断言

// 直接强制转某个类型
// <HTMLElement>ele  // 这个语法和jsx冲突,不建议使用
let a: string | number | undefined;
(a as any) as boolean // 但是不建议这么写

export { } // 表示这里面的命名不影响其他类型

let a1: boolean = false ?? true // ?? 表示排除null和undefined


type IType = 'a' | 'b' | 'c';
let type: IType = 'a'
let type2: IType = 'b'


// 函数的重载  重载方法必须放在真实方法的上面
function toArray(value: string): string[]
function toArray(value: number): number[]
function toArray(value: number | string): number[] | string[] {
  if (typeof value == 'string') {
    return value.split('');
  } else {
    return value.toString().split('').map(i => Number(i))
  }
}
let r11 = toArray('123321')
console.log(r11)


// 类
class Pointer {
  // x:number = 1 
  // y:number = 2 // 默认是public
  constructor(public x: number, public y: number) {
    // 加了public表示直接放在实例上,就可以简化不写上面x y 的声明了
    this.x = x;
    this.y = y;
  }
}
let pointer = new Pointer(100, 100)

// public 默认的修饰符
// protected  只有自己和自己的子类能访问
// private  只有自己能访问
// readonly 只读类似const 不能更改
class Animal {
  constructor(public name: string, public age: number) {
    console.log(name, age)
  }
  // static type = '哺乳动物' //编译成Animal.type = '哺乳动物';
  static get type() { // 这种方法遍以后是Object.defineProperty
    return "哺乳动物"
  }
  // static静态属性可以被继承
  aaa = 123321 //this.aaa = 123321;
  private bbb: string = '静态的属性'
  get getcontent() {
    return '属性获取器'
  }
  set setcontent(value: string) {
    this.bbb = value
  }
}
class Cat extends Animal {
  constructor(name: string, age: number, public readonly address: string) {
    super(name, age)
  }
}
let cat1 = new Cat('小白', 19, 'wojia')

// -------------------------------------------------
// 装饰器  只能修饰类 和 属性 用类扩展类中的属性和方法,不能修饰函数, 函数会有变量提升的问题
function toUpperClass1(target:any,key:string) {
  console.log(target,key)
  let val:string = ''
  Object.defineProperty(target, key, {
    get() {
      return val.toUpperCase()
    },
    set(value) {
      console.log('赋值', value)
      val = value
    }
  })
}
function addSay2(target: any) {
  console.log(target)// 是Person构造函数
}
function addSay1(target: any) {
  console.log(target)// 是Person构造函数
  let p = new target('张三李四')
  p.print()
}
function double(num:number) { // 修饰类里面的静态属性,只有get 不能去更改
  return function (target: any, key: string) {
    let val = target[key]
    Object.defineProperty(target, key, {
      get() {
        return num * val
      }
    })
  }
}
function Enum(bool:boolean) {
  return function(target:any, key:string,descriptor:PropertyDescriptor) {
    // console.log(target, key, descriptor)
    descriptor.enumerable = bool
  }
}
function params (target:any,key:string, index:number) {
  // target 原型 key drink index = 0
  console.log(target, key,index)
}
@addSay2
@addSay1
class Person {
  @toUpperClass1
  public name:string = 'abc'

  @double(2)
  static age:number = 10
  constructor(name: string) {
  }
  @Enum(false)
  drink(@params content:any) {

  }
  print() {
    console.log("打印一些文字")
    console.log(this.name)
    this.drink('咖啡')
  }
}
let p1 = new Person('alice')
console.log(p1.name)//ABC
console.log(Person.age) // 静态属性用类来调出来查看
p1.print()
// -------------------------------------------------
// 装饰器的洋葱模型
function printSay1(val: string) {
  console.log(val)
  return function (target: any) {
    console.log(111)
  }
}
function printSay2(val: string) {
  console.log(val)
  return function (target: any) {
    console.log(222)
  }
}
function printSay3(val: string) {
  console.log(val)
  return function (target: any) {
    console.log(333)
  }
}
@printSay1('11111')
@printSay2('22222')
@printSay3('33333')
class Caclat{
  constructor(public type: string) {
    console.log(type)
  }
}


