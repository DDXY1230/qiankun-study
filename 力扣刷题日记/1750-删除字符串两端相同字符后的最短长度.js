/**
 * @param {string} s
 * @return {number}
 */
var minimumLength = function (s) {
    let n = s.length, low = 0, high = n - 1
    while (low < high && s[low] == s[high]) {
        let c = s[low]
        while (s[low] == c && low <= high) low++
        while (s[high] == c && low <= high) high--
    }
    return high - low + 1
};