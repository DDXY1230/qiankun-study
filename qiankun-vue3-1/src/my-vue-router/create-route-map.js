export default function createRouteMap(routes) {
  // 存储所有的路由地址
  const pathList = [];
  // 路由表, 路径和组件的相关信息
  const pathMap = {};

  //遍历所有的路由规则
  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap);
  });
  return {
    pathList,
    pathMap,
  };
}
function addRouteRecord(route, pathList, pathMap, parentRecord) {
  const path = route.path;
  const record = {
    path: path,
    component: route.component,
    parentRecord: parentRecord,
  };
  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }
  // 判断当前路由是否是子路由
  if (route.children) {
    record.children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathList, pathMap, route);
    });
  }
}
