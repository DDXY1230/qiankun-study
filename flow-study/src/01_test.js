//@flow

function sum(a: number, b: number) {
  return a + b;
}
sum(100, 100);
// sum("100", "100"); //类型推断会出错
let n: number = 100;
const a: string = " zifuchuan ";
const b: number = NaN;
const c: number = Infinity;
const d: boolean = false;
const e: null = null;
const f: void = undefined;
const g: symbol = Symbol();
const arr1: Array<number> = [1, 2, 3];
const arr2: Array<string> = ["1", "2", "3"];
const arr4: number[] = [1, 2, 3];
const arr5: string[] = ["2", "3"];
const arr6: boolean[] = [false, true];
// 多种类型,元组
const arr3: [string, number] = ["1", 2];
const obj1: { foo: string, bar: number } = { foo: "foo", bar: 123321 };
const obj2: { foo?: string, bar: number } = { bar: 123321 }; // 问号代表可有可无

const obj3: { [string]: string } = {};
obj3.key1 = "hhhhh";
// obj3.key2 = 22  报错

// 函数类型限制
function foo(callback: (string, number) => void) {
  callback("string", 100); // 没有返回值,或者返回undefined
}

// const a: 'foo' = 'foo'  只能是foo
let type: "success" | "warning" | "danger" = "danger";
let count: number | string = "综合";

// type
type StrNum = string | number;
let acount: StrNum = "综合";

// maybe
let gender: ?number = null;
//等同于
let gender1: number | null | void = undefined;

// mixed any
function passMixed(value: mixed) {
  // 此时这个函数可以传入任意类型
  // value.substr(1)// 这个地方会报错,强类型
  if (typeof value === "string") {
    console.log("string");
  }
  if (typeof value === "number") {
    console.log("number");
  }
}
let x: any = "sdsdf";
function passAny(value: any) {
  // 可以接收任意类型的参数  语法上不会报错, 弱类型的
  // any的存在只是为了兼容老项目中的问题
  value.substr(1);
}

const element: HTMLElement | null = document.getElementById("app");

//更多知识点整理可以参考:https://www.saltycrane.com/cheat-sheets/flow-type/latest/
