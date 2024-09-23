const myCurrying = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...args2) => myCurrying(fn, ...args, ...args2);
  }
};
const add = (x, y, z) => {
  return x + y + z;
};
const addCurry = myCurrying(add);
const sum1 = addCurry(1, 2, 3);
const sum2 = addCurry(1)(2)(3);

console.log(sum1, "sum1");
console.log(sum2, "sum2");
