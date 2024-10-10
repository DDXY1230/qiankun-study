function checkIsChildObject(target, obj) {
  // 基于层级，把 obj 所有的属性生成 map 映射存储
  // 让target和obj有层级关系对比
  let map = new Map();
  const setMapByObj = (obj, level) => {
    for (let key in obj) {
      let current = map.get(key) || {};
      // 可能存在嵌套对象Key重复，可以合并在一个key里面
      map.set(key, {
        ...current,
        [level]: obj[key],
      });
      // 把所有对象铺开
      if (typeof obj[key] === "object") {
        setMapByObj(obj[key], level + 1);
      }
    }
  };
  setMapByObj(obj, 0);
  // console.log(map, 'map');
  // target子对象去 map 里面寻找有没有哪一层的对象完全匹配自身,子属性只能找下一层的对象
  let level = -1;
  for (let key2 in target) {
    // 获取当前key的所有集合
    let current = map.get(key2);
    if (current !== undefined) {
      if (typeof target[key2] === "object") {
        // 只需要再判断一级
        if (!checkIsChildObject(target[key2], current)) {
          return false;
        }
      } else {
        //表示还没开始查找，需要找一下当前值在第几层
        if (level === -1) {
          for (let key3 in current) {
            if (current[key3] === target[key2]) {
              level = key3;
            }
          }
        }
        // 查找到层数，目标值不相等
        if (level !== -1 && current[level] !== target[key2]) {
          return false;
        }
      }
    } else {
      // Key没有直接返回false
      return false;
    }
  }
  return true;
}

const obj = {
  a: 0,
  c: "",
  d: true,
  e: {
    f: 1,
    e: {
      e: 0,
      f: 2,
    },
  },
};

console.log(checkIsChildObject({ a: 0 }, obj)); // true
console.log(checkIsChildObject({ e: 0 }, obj)); // true
console.log(checkIsChildObject({ a: 0, c: "" }, obj)); // true
console.log(checkIsChildObject({ a: 0, e: 0 }, obj)); // false
console.log(checkIsChildObject({ e: { f: 1 } }, obj)); // true
console.log(checkIsChildObject({ e: { f: 2, e: 0 } }, obj)); // true
console.log(checkIsChildObject({ e: { e: 0, f: 2 } }, obj)); // true
console.log(checkIsChildObject({ e: { f: 2 } }, obj)); // true
