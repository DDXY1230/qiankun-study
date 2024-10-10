let arr = [
  {
    id: 1,
    name: "jj1",
  },
  {
    id: 2,
    name: "jj2",
  },
  {
    id: 1,
    name: "jj1",
  },
  {
    id: 3,
    name: "jj3",
  },
  {
    id: 2,
    name: "jj2",
  },
];
const unique = (arr) => {
  let map = new Map();
  return arr.reduce((prev, cur) => {
    // 当前map中没有, 说明可以和上一个合并
    if (!map.has(cur.id)) {
      map.set(cur.id, true);
      return [...prev, cur];
    } else {
      // 已经标记的就不用合并了
      return prev;
    }
  }, []);
};
console.log(unique(arr), "unique");

// 不使用reduce
const unique2 = (arr) => {
  let map = new Map();
  let result = [];
  arr.forEach((item) => {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      result.push(item);
    }
  });
  return result;
};
