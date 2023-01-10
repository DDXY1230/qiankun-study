/**
 * @param {string} number
 * @return {string}
 */
var reformatNumber = function (number) {
    let numToArr = number.trim().split('').filter(i => i != '-' && i != ' ')
    let res = [], len = numToArr.length
    for (let i = 0; i < len; i++) {
        if ((i + 1) % 3 == 0 && i > 0 && i < len - 1) {
            if (i == len - 2) {
                res.push('-')
                res.push(numToArr[i])
            } else {

                res.push(numToArr[i])
                res.push('-')
            }
        } else {
            res.push(numToArr[i])
        }
    }
    return res.join('')
};