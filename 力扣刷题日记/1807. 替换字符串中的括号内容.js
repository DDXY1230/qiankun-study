/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function (s, knowledge) {
    let map = new Map()
    for (let i = 0; i < knowledge.length; i++) {
        map.set(knowledge[i][0], knowledge[i][1])
    }

    let isOpen = false, curKey = '', res = ''
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '(') {
            isOpen = true
        } else if (s[i] == ')') {
            isOpen = false
            res += map.get(curKey) || '?'
            curKey = ''
        } else {
            if (isOpen) {
                curKey += s[i]
            } else {
                res += s[i]
            }
        }
    }
    return res
};