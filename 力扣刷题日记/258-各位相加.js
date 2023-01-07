/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
    function count (num) {
        if(num < 10) return num
        let toArr = num.toString().split(''), res = 0
        for(let i = 0; i < toArr.length; i++){
            res += Number(toArr[i])
        }
        return count(res)   
    }
    return count(num)
};