// 检测当前pkgs是否存在循环依赖
const pkgs = [
  {
    name: "a",
    dependencies: {
      b: "^1.0.0",
    },
  },
  {
    name: "b",
    dependencies: {
      c: "^1.0.0",
    },
  },
  {
    name: "c",
    dependencies: {
      a: "^1.0.0",
    },
  },
];

const checkCircularDependency = (packages) => {
  const map = {};
  const states = {};
  // 初始化
  packages.forEach((pkg) => {
    map[pkg.name] = pkg.dependencies || [];
    states[pkg.name] = "UNVISITED";
  });
  // 从每个包开始进行DFS
  for (const pkgName in map) {
    if (states[pkgName] === "UNVISITED") {
      if (dfs(pkgName, map, states)) {
        return true;
      }
    }
  }
  return false;
};
const dfs = (pkgName, map, states) => {
  states[pkgName] = "VISITING";
  for (const dep in map[pkgName]) {
    const depState = states[dep];
    if (depState === "VISITING") {
      return true; // 存在循环依赖
    } else if (depState === "UNVISITED") {
      if (dfs(dep, map, states)) {
        return true; // 存在循环依赖
      }
    }
  }
  return false; // 不存在循环依赖
};
console.log(checkCircularDependency(pkgs));
