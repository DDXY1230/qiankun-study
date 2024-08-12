function compare(a, b) {
  // 比较之后需要得到是否需要交换
  return b > a
}

function exchange(arr, a, b) {
  //将数组中ab位置里的值进行比较
  let temp = arr[a]
  arr[a] = arr[b];
  arr[b] = temp
}

function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let maxIndex = 0;
    for (let j = 0; j < arr.length - i; j++) {
      if (compare(arr[maxIndex], arr[j])) {
        maxIndex = j
      }
    }
    exchange(arr, maxIndex, arr.length - 1 - i)
  }
}

let arr = [9, 12,7,6,5,4,3,2,1]
sort(arr)
console.log(arr)