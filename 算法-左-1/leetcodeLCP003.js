/**
 * @param {string} command
 * @param {number[][]} obstacles
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var robot = function(command, obstacles, x, y) {
  let X = 0
  let Y = 0
  let set = new Set() // 用来存储一轮所涉及到的所有的点
  set.add(0)
  let cArr = command.split('')
  for(let c of cArr) {
    X += c == 'R' ? 1 : 0;
    Y += c == 'U' ? 1 : 0;
    set.add((X << 10) | Y)
  }
  // 不考虑任何额外的点,机器人能不能到达(x,y)
  if(!meet(x,y,X,Y,set)) {
    return false
  }
  for(let ob of obstacles) {
    if(ob[0] <= x && ob[1] <=y && meet(ob[0],ob[1],X,Y,set)){
      return false
    }
  }
  return true
};
function meet(x,y,X,Y,set) {
  if(X == 0) {
    return x == 0
  }
  if(Y == 0) {
    return y == 0
  }
  // js版本这里要记得取整数,不然出错
  let atLeast = Math.min(parseInt(x / X),parseInt(y / Y));
  let rx = x - atLeast * X;
  let ry = y - atLeast * Y;
  return set.has((rx << 10) | ry)
}

// test
let command = "UURRUUU"
let obstacles = [[4, 5], [6, 1], [7, 10], [9, 1], [1, 1], [5, 0], [2, 8]]
let x = 946
let y = 2365
robot(command, obstacles, x, y)
