var obj = {
  b: 2,
};

// 得到属性描述符
// var desc = Object.getOwnPropertyDescriptor(obj, 'a');
// console.log(desc);

// 设置属性描述符
Object.defineProperty(obj, 'a', {
  value: 10,
  writable: false, // 不可重写
  enumerable: false, // 不可遍历
  configurable: false, // 不可修改描述符本身
});
// Object.defineProperty(obj, 'a', {
//   writable: true,
// });
obj.a = 'abc';
console.log(obj.a);
// for (var key in obj) {
//   console.log(key);
// }

// var keys = Object.keys(obj);
// console.log(keys);

// console.log(obj);


Object.defineProperty(obj, 'a', {
  get: function () {
    return 123;
  }, // 读取器 getter
  set: function (val) {
    throw new Error(
      `兄弟，你正在给a这个属性重新赋值，你所赋的值是${val}，但是，这个属性是不能复制，你再考虑考虑`
    );
  }, // 设置器 setter
});

