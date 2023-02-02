var rearrangeCharacters = function (s, target) {
  let sArr = s.split('').filter(i => i)
  let tArr = target.split('').filter(i => i)
  let map = new Map()
  for (let i = 0; i < tArr.length; i++) {
    let cur = tArr[i]
    map.has(cur) ? map.set(cur, map.get(cur) + 1) : map.set(cur, 1)
  }
  let sMap = new Map()
  for (let i = 0; i < sArr.length; i++) {
    let cur = sArr[i]
    sMap.has(cur) ? sMap.set(cur, sMap.get(cur) + 1) : sMap.set(cur, 1)
  }

  let min = Infinity
  for (let [code, num] of map) {
    let sNum = sMap.get(code) || 0
    if (sNum == 0) {
      min = 0
      return min
    }
    let time = Math.floor(sNum / num)
    min Math.min(time, min)
  }
  return min
}