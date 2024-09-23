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
  const roots = [];
  for (const item of data) {
    if (item.pid === 0) {
      item.children = [];
      roots.push(item);
    } else {
      const parent = findParent(item, roots);
      if (parent) {
        item.children = [];
        parent.children.push(item);
      }
    }
  }
  return roots;
}
function findParent(item, roots) {
  for (const root of roots) {
    if (root.id == item.pid) {
      return root;
    }
    const parent = findParent(item, root.children);
    if (parent) {
      return parent;
    }
  }
}
console.log(toTree(arr));
