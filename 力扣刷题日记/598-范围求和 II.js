/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function (m, n, ops) {
    let xArr = [];
    let yArr = [];
    if (ops.length === 0) return m * n;
    for (let i = 0; i < ops.length; i++) {
        const arr = ops[i];
        xArr.push(arr[0]);
        yArr.push(arr[1]);
    }
    // 对数组进行从小到大排序
    xArr.sort((a, b) => a - b);
    yArr.sort((a, b) => a - b);
    return xArr[0] * yArr[0];
};