import createRouteMap from "./create-route-map";
import createRoute from "./util/route";

export default function createMatcher(routes) {
  const { pathList, pathMap } = createRouteMap(routes);
  function match(path) {
    const record = pathMap[path];
    if (record) {
      // 创建路由数据对象
      return createRoute(record, path);
    }
    return createRoute(null, path);
  }
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }
  return {
    match,
    addRoutes,
  };
}
