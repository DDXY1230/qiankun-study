const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

// 考虑各种数据类型, 存在构造函数的可以用new xxx()
// 考虑循环引用, 用weekMap记录下

const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  if (hash.has(obj)) return hash.get(obj);
  let allDesc = Object.getOwnPropertyDescriptor(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  // 继承原型
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};

// 验证
let obj = {
  num: 0,
  str: "9",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "dui对象" },
  arr: [2, 3, 4],
  func: function () {
    console.log("哈哈哈哈哈");
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
};
Object.defineProperty(obj, "innumerable", {
  enumerable: false,
  value: "不可枚举",
});
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
obj.loop = obj;
let cloneObj = deepClone(obj);
cloneObj.arr.push(44), console.log("obj", obj);
console.log("cloneObj", cloneObj);
