function compare(a, b) {
  // 比较之后需要得到是否需要交换
  return b < a
}

function exchange(arr, a, b) {
  //将数组中ab位置里的值进行比较
  let temp = arr[a]
  arr[a] = arr[b];
  arr[b] = temp
}

function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1])) {
        exchange(arr, j, j + 1)
      }
    }
  }
}

let arr = [3, 2, 1, 6, 5, 2]
sort(arr)
console.log(arr)