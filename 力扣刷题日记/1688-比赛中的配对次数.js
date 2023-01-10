/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function(n) {
    let i = n, res = 0
    while(i > 1) {
        if(i % 2 == 0) {
            i /= 2
            res += i
        }else {
            res += (i - 1) / 2
            i = (i - 1) / 2 + 1
        }
    }
    return res
};