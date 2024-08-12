/**
 * 不创建新的数组,就在原始数组上进行操作
 */

let arr = [4,1,6,9,3,2,8,7]
function swap (arr,a,b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}
function quickSort(arr,begin,end) {
  if(begin >= end - 1){
    return
  }
  let left = begin;
  let right = end;
  do {
    do left ++; while (left < right && arr[left] < arr[begin]);
    do right --; while (right > left && arr[right] > arr[begin])
    if(left < right) swap(arr,left,right)
  }while(left < right);
// left right 有可能right到left左边了
  let swapPoint = left == right ? right - 1 : right;
  swap(arr,begin,swapPoint)
  quickSort(arr, begin,swapPoint)
  quickSort(arr,swapPoint+1,end)
}
quickSort(arr,0,arr.length)
console.log(arr)