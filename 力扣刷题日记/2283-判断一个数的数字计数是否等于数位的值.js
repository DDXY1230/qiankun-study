/**
 * @param {string} num
 * @return {boolean}
 */
var digitCount = function(num) {
    let numToArr = num.toString().split('')
    let n = numToArr.length
    let map = new Map()
    for(let i = 0; i < n; i++) {
        let cur = numToArr[i]
         map.set(cur, map.get(cur) ? map.get(cur) + 1 : 1)
    }
    for(let i = 0; i < n; i++) {
        let compVal = map.get(i.toString()) || '0'
        if(compVal != numToArr[i]) {
            return false
        }
    }
    return true
};