// 接口 interface  同一个文件同名的接口会合并

//类型的写法
type IObj = { name: string, age: number }
// const getObj = (obj: {name:string, age: number}) => {}
const getObj = (obj: IObj) => {
}
//接口的写法
interface IIobj {
  name: string,
  age: number,
}
const getObj2 = (obj: IIobj) => {

}
/* 以上的两种写法功能是一样的, 类型的写法后面可以继续加, 如果联合类型就用type比较好
 type IObj = { name: string, age: number } | string
*/

// 描述函数的类型
interface Isum1 {
  (a:string,b:string):string
}
type Isum2 = (a:string,b:string)=>string
const sum: Isum1 = (a:string, b: string):string => {
  return a + b
}

// 写一个计数器的例子,每次调用函数就累加1
interface Icount { // 这里面有函数  type就实现不了
  (): number
  count: number
}

const fn: Icount = (() => {
  return ++fn.count
}) as Icount
fn.count = 0

console.log(fn())
console.log(fn())
console.log(fn())

//-------------------------
// 下面1,2,3,4可以扩展接口的属性的方法
interface IVegetable {
  color: string
  taste: string
  [key:string]: any // 1任意接口, 上面两个是必填属性
}
// interface IVegetable { // 同名接口会合并
//   size: string
// }
const tomato:IVegetable = {
  color: 'red',
  taste: 'suan',
  size: 'small'
} as IVegetable // 这里要直接断言,不然size爆红线 断言的时候要保证接口中限制的属性必须得有
// 2如果不用断言可以另外命名一个IVegetable接口,会跟上面的IVegetable合并成一个,但是这种方法不推荐使用
// 3也可以写一个接口继承IVegetable接口,
interface ITomato extends IVegetable { // type 无法实现基层,所以要根据具体情况选用方案
  size: string
}
interface ITomato { // 4问好说明这个可有可无的属性
  tomatoType?: string
}

// 可索引接口
interface ILikeArray {
  [key:number] : any
}
let arr: ILikeArray = [1,2,3]
let arr1: ILikeArray = {1:1,2:2}


type MYType = {key:string, value: string}
interface xxx {
  n: MYType
}
interface IArr {
  arr: MYType
  a: xxx
}
type MYA = IArr['a']['n']


// 接口的实现  接口可以被类类实现
interface ISpeakable {
  readonly name: string
  speak():void
}
class Speak implements ISpeakable {
  name!: string //!感叹号非空断言
  speak(): void {
    throw new Error("Method not implemented.")
  }

}


// 抽象类 不能被实例化不能new 必须被继承之后由子类new
// abstract
abstract class Animal { // 抽象类不能使用new关键词 没有意义
  abstract name: string // 没有集体实现, 需要子类实现
  eat() {
    console.log('eat') // 抽象类可以有方法的具体实现, 接口没有
  }

}
class Cat extends Animal {
  name!: string
}


// 可以用接口来描述实例
//单例模式
let instance:any
type IPerson1 = new (name:string) => Person
interface IPerson2 {
  new (name:string): Person
}
function  createInstance(clazz:IPerson2,name: string):Person {
  if(instance) return instance // 单例模式只要有就不会再次创建
  return new clazz(name) // 没有才会创建
}
class Person {
  constructor(public name: string) {

  }
}
createInstance(Person, '张三')



export { }