/**
 * 先构建map结构, 以各个子项的id为key
 * 在循环目标数组,判断上面构建的map中,是否存在当前便利的pid
 * 存在就可以进行children的插入
 * 不存在就是顶级节点,直接push即可
 */
let arr = [
  {
    id: 1,
    pid: 0,
    name: "body",
  },
  {
    id: 2,
    pid: 1,
    name: "title",
  },
  {
    id: 3,
    pid: 2,
    name: "div",
  },
];

function toTree(data) {
  let result = [];
  let map = {};
  // 1. 循环先构建map结构, 以各个子项目id为key
  data.forEach((item) => {
    map[item.id] = item;
  });
  // 2. 再循环目标数组,判断上面构建的map, 是否存在在当前遍历的pid
  data.forEach((item) => {
    let parent = map[item.pid];
    if (parent) {
      // 3. 存在就可以进行children的插入
      (parent.children || (parent.children = [])).push(item);
    } else {
      // 4. 不存在,那么它本身就是顶级节点,直接push即可
      result.push(item);
    }
  });
  return result;
}
console.log(toTree(arr));
