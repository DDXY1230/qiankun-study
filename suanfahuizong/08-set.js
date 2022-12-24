// new add delete has size
// 去重
const arr = [1,2,2,1]
const arr2 = [...new Set(arr)]
console.log(arr2)
const set1 = new Set(arr)
console.log(set1.has(1))

// 求交集
const set2 = new Set([2,3,4])
const set3 = [...set1].filter(i => set2.has(i))
console.log(set3)