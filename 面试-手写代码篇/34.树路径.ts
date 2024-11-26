//
/**
 *
 * @param data 树状数据
 * @param children 下级名称字段
 * @param key    需要找的值在那个字段里
 * @param target 需要找的目标值
 * @returns Array
 * T = string | number
 *
 */
export const getDataCodeArray = <K extends object, T>(
  data: Array<K>,
  children = "children",
  key: keyof K,
  target: T
) => {
  let result: Array<T> = [];
  const DG = (path: Array<T>, data: Array<any>) => {
    if (!data.length) return;
    data.forEach((item) => {
      path.push(item[key as keyof K]);
      if (item[key as keyof K] === target) {
        result = JSON.parse(JSON.stringify(path));
      } else {
        const child = item[children] || [];
        DG(path, child);
        path.pop();
      }
    });
  };
  DG([], data);
  return result;
};
