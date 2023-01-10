var hIndex = function (citations) {
  let n = citations.length, left = 0, right = n - 1
  while(left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if(citations >= n - mid) {
      right = mid - 1
    }else {
      left = mid + 1
    }
  }
  return n - left
}