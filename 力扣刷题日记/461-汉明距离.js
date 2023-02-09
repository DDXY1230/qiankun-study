// a = a & (a - 1)  会消除一个1
var hanmingDistance = function (x, y) {
  let distance = 0
  for (let xor = x ^ y; xor != 0; xor &= (xor - 1)) {
    distance++
  }
  return distance
}