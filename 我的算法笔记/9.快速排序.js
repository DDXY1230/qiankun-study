function quickSort(arr) {
  if(arr == null || arr.length == 0) return [];
  let leader = arr[0];
  // 小的站左边,大的站右边
  let left = []
  let right = []
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] < leader) left.push(arr[i])
    else right.push(arr[i])
  }
  left = quickSort(left)
  right = quickSort(right)
  left.push(leader)
  return left.concat(right)
}