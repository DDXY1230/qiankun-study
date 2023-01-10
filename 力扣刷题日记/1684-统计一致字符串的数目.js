/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words) {
    let res = 0, aToArr = allowed.split('')
    for (let i = 0; i < words.length; i++) {
        let wToArr = words[i].split('')
        for (let j = 0; j < wToArr.length; j++) {
            if (aToArr.indexOf(wToArr[j]) == -1) {
                break
            }
            if (j == wToArr.length - 1) {
                res++
            }
        }
    }
    return res
};