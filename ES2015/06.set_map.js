// set  值不重复     map 
//区别

let set = new Set([1,2,2,3,3,2,2,'a'])
set.add(8)
console.log(set.entries())// [Set Entries] { [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 'a', 'a' ], [ 8, 8 ] }
console.log(set) //Set(4) { 1, 2, 3, 8 }
set.forEach(i => console.log(i)) // 1,2,3,a,8

//=======================
// Map不能有重复的key
let map = new Map([['a','111'],['b','222'],['c','333']])
console.log(map) // Map(3) { 'a' => '111', 'b' => '222', 'c' => '333' }
map.set('d', '555')
map.forEach(i => console.log(i))// 111 222 333 555


let arr1 = [1,2,3,4], arr2 = [3,4,5,6];
// 求并集
function union(arr1,arr2) {
  let s = new Set([...arr1,...arr2])
  return [...s]
}
console.log(union(arr1,arr2))
// 求交集
function intersection(arr1, arr2) {
  let s1 = new Set(arr1);
  let s2 = new Set(arr2);
  return [...s1].filter(item => {
    return s2.has(item)
  })
}
console.log(intersection(arr1,arr2))



// weakMap 弱引用 垃圾回收 标记引用  每应用一次计数一次
// 示例
class MyTest{};
let my = new MyTest(); // 对象
// let map = new Map();
// map.set(my, 1)
// my= null
// console.log(map)

let wMap = new WeakMap() // weakmap的key只能是对象
wMap.set(my, 1)
console.log(wMap)
my = null
console.log(wMap) // 当你给一个变量设置null的时候 不会马上回收,浏览器会在合适的机会回收掉
//总结map应用对象不会被回收  weakmap引用的对象会被置为null的时候,后续会被清空
