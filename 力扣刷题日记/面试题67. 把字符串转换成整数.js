/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function(str) {
    if(str.length == 0) return 0
    let strToArr = str.trim().split(' ')[0],i = 0, res = 0, minus= false // 默认不是负数
    if(strToArr[0] !== '-' && strToArr[0] !== '+' && isNaN(strToArr[0])) {
        return 0
    }
    if(strToArr[0] == '-') {
        minus = true
        i++
    }
    if(strToArr[0] == '+') {
        i++
    }
    while(i < strToArr.length && !isNaN(strToArr[i])){
        res = res * 10 + Number(strToArr[i])
        console.log(res)
        if(res > (2 ** 31 - 1) && minus == false) {
            return (2 ** 31 - 1)
        }
        if(res > (2 ** 31 - 1) && minus == true) {
            return -(2 ** 31)
        }
        i++
    }
    return minus ? -res : res

};