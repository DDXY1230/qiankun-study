// 查找id为10的节点, 输出节点路径[1,3,10]
const treeData = [
  {
    id: 1,
    name: "j1",
    children: [
      {
        id: 2,
        name: "j2",
        children: [
          {
            id: 4,
            name: "j4",
          },
        ],
      },
      {
        id: 3,
        name: "j3",
        children: [
          {
            id: 8,
            name: "j8",
            children: [
              {
                id: 5,
                name: "j5",
              },
            ],
          },
          {
            id: 9,
            name: "j9",
            children: [],
          },
          {
            id: 10,
            name: "j10",
            children: [],
          },
          {
            id: 11,
            name: "j11",
            children: [],
          },
          {
            id: 12,
            name: "j12",
            children: [],
          },
        ],
      },
      {
        id: "51",
        name: "j51",
        children: [
          {
            id: "52",
            name: "j52",
          },
        ],
      },
    ],
  },
  {
    id: 61,
    name: "j61",
  },
];
let path = findNum(10, treeData);
console.log("path", path);
// 具体实现的函数
function findNum(target, data) {
  let result = [];
  const DG = (path, data) => {
    if (!data.length) return;
    data.forEach((item) => {
      path.push(item.id);
      console.log("id", item.id);
      if (item.id === target) {
        result = JSON.parse(JSON.stringify(path));
      } else {
        const children = item.children || [];
        DG(path, children);
        path.pop();
      }
    });

    //--------------------- 优化start
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      path.push(item.id);
      console.log("for-id", item.id);
      if (item.id === target) {
        result = JSON.parse(JSON.stringify(path));
        return result;
      } else {
        const children = item.children || [];
        DG(path, children);
        path.pop();
      }
    }
    //--------------------- 优化end
  };
  DG([], data);
  return result;
}
