/**
 * @param {number} num
 * @return {number}
 */
var countEven = function(num) {
    let res = []
    for(let i = 1; i <= num; i++ ) {
        if(i < 10 && i % 2 == 0){
            res.push(i)
        }else if(i >= 10) {
            let toArr = i.toString().split(''), sum = 0
            for(let j = 0; j < toArr.length; j++) {
                sum += Number(toArr[j])
            }
            if(sum % 2 == 0) {
                res.push(i)
            }
        }
    }
    return res.length
};