const arr1 = [1,22,23,21,43,33]
const arr2 = [2,11,44,33,22,54]

const union = [...new Set([...arr1,...arr2])]
const cross = [...new Set(arr1.filter(it => arr2.includes(it)))]
const diff = union.filter(it => !cross.includes(it))