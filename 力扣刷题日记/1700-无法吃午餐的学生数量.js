/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function(students, sandwiches) {
    for(let i =0; i < sandwiches.length; i++) {
        if(students[0] == sandwiches[i]) {
            students.shift()
        }else {
            let idx = students.indexOf(sandwiches[i])
            if(idx == -1) {
                return students.length
            }else {
                let left = students.slice(0, idx)
                let right = students.slice(idx+1)
                students = right.concat(left)
            }
        }
    }
    return 0
};