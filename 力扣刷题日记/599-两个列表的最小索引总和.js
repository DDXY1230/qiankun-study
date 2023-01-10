/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function(list1, list2) {
    let list1Len = list1.length, list2Len = list2.length
    let common = []
    if(list1Len <= list2Len) {
        for(let i = 0; i < list1Len; i++){
            let idx = list2.indexOf(list1[i])
            if(idx > -1){
                common.push({name: list1[i], idx: idx + i})
            }
        }
    }else {
        for(let i = 0; i < list2Len; i++) {
            let idx = list1.indexOf(list2[i])
            if(idx > -1){
                common.push({name: list2[i], idx: idx + i})
            }
        }
    }
    common.sort((a,b) => a.idx - b.idx)
    let result = []
    for(let i = 0; i < common.length; i++) {
        if(common[0].idx == common[i].idx) {
            result.push(common[i].name)
        }
    }
    return result
};