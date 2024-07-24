/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function(rectangles) {
  if(rectangles.length === 0) {
    return false
  }
  let l = Infinity;
  let r = -Infinity;
  let d = Infinity;
  let u = -Infinity;
  let map = new Map();
  let area = 0;
  for(let rect of rectangles) {
    console.log('rect',rect)
    // 将矩形的四个点添加到表中
    add(map, rect[0], rect[1]);
    add(map, rect[0], rect[3]);
    add(map, rect[2], rect[1]);
    add(map, rect[2], rect[3]);
    // 矩形面积总和
    area += (rect[2] - rect[0]) * (rect[3] - rect[1]);
    // 四个顶点差值求面积
    l = Math.min(rect[0], l);
    r = Math.max(rect[2], r);
    d = Math.min(rect[1], d);
    u = Math.max(rect[3], u);
  }
  console.log('999')
  return checkPoint(map,l,d,r,u) && area == (r - l) * (u - d);
};
function add (map, row, col) {
  if(!map.has(row)) {
    map.set(row, new Map())
  }
  map.get(row).set(col,map.get(row).get(col)? map.get(row).get(col) + 1 : 1);
}
function checkPoint(map, l,d,r,u) {
  if(map.get(l).get(d) != 1
  || map.get(l).get(u) != 1
  || map.get(r).get(d) != 1
  || map.get(r).get(u) != 1) {
    return false;
  } 
  map.get(l).delete(d);
  map.get(l).delete(u);
  map.get(r).delete(d);
  map.get(r).delete(u);
  console.log(map)
  for(let key of map.entries()) {
    console.log(key)
    for(let value of map.get(key[0]).values()) {
      if((value & 1) != 0) {
        return false;
      }
    }
  }
  return true;
}