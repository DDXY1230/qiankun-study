// const a: string = "hhhhh";
// const num: number = 999; // NaN Infinity
// const d: string = null;
// const e: boolean = null; // 严格模式下不能为空
// const g: void = null; //非严格模式可以是undefined/null  严格模式是null
// const f: null = null;
// const h: undefined = undefined;
// const i: symbol = Symbol("jj");
// const error: string = "111";

// const j: object = []; // [] {} function 这里的object可以是这些类型
// const l: {} = { foo: "foo" }; // 这里就只能是字面量类型
// const m: { foo: number; bar: string } = { foo: 100, bar: "beautiful" }; // 一一对应

// // 数组
// const arr1: Array<number> = [1, 2, 3, 4]; //纯数字组成的数组
// const arr2: number[] = [1, 2, 3, 4];
// function sum(...args: number[]) {
//   return args.reduce((prev, current) => prev + current, 0);
// }
// // sum(1,'foo')// 报错,

// // 元组类型
// const tuple: [number, string] = [18, "aaa"];
// const age1 = tuple[0];
// const [age, name1_3334] = tuple;

// enum PostStatus {
//   draft = 0,
//   unpublish = 1,
//   publish = 1,
// }
// const post = {
//   title: "是标题",
//   content: "typescript study",
//   status: PostStatus.draft,
// };

// function func1(a: number, b: number, ...rest: number[]): string {
//   return "string";
// }
// // func1('3', '33')
// const func2 = function (a: number, b: number): string {
//   return "string";
// };
// let fc: any = "kkkk"; // 不会有任何类型检查,不要轻易使用

// // 断言
// const num1 = 199;
// let num2 = num1 as number;
// let num3 = <number>num1; // 这种方式可能于jsx的语法有冲突 不推荐

// // 接口 Interface
// interface Post {
//   title: string;
//   klass: number;
//   subtitle?: string; // 可有可无
//   readonly summary: string; // 只读属性
// }
// function printPost(post: Post) {
//   console.log(post.title);
// }
// printPost({ title: "xxx", klass: 123, summary: "jjjjjj" });

// interface Cache {
//   [prop: string]: string;
// }
// // let a: Cache = {a: 'aa'}
// class Person {
//   public name: string; // 默认就是public
//   private age: number; // 私有
//   protected readonly gender: boolean; // readonly放在访问修饰符的后面
//   constructor(name: string, age: number) {
//     this.name = name;
//   }
// }
// // private protected 外部无法访问,子类可以放问protected
// class Student extends Person {
//   private constructor(name: string, age: number) {
//     super(name, age);
//   }
//   static create(name: string, age: number) {
//     return new Student(name, age);
//   }
// }
// const tom = Student.create("jack", 18);

// // 接口
// interface Eat {
//   eat(food: string): void;
// }
// interface Run {
//   run(distance: number): void;
// }
// class Person implements Eat, Run {
//   eat(food: string): void {}
//   run(distance: number): void {}
// }
// class Animal implements Eat, Run {
//   eat(food: string): void {}
//   run(distance: number): void {}
// }

// // 泛型
// function createNumber(length: number, value: number): number {
//   const arr = Array<number>(length).fill(value);
//   return arr.length;
// }
// function createString(length: number, value: string): number {
//   const arr = Array<string>(length).fill(value);
//   return arr.length;
// }
// function create<T>(length: number, value: T): T[] {
//   const arr = Array<T>(length).fill(value);
//   return arr;
// }
// // 把不明确的定义成一个参数
// const res = createNumber(3, 100);

// // 兼容一些第三方模块
// // import { camelCase } from 'lodash'
// // declare function camelClass(input:string): string

// // type
// type numT = number | string; // 别名
// let timeO: numT = "999";
// console.log(timeO)
