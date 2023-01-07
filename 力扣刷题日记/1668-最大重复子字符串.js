/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
var maxRepeating = function(sequence, word) {
   if(word.length > sequence.length || !sequence.includes(word)) return 0
   let str = word, count = 0
   while(str.length <= sequence.length) {
       if(sequence.includes(str)) {
           str += word
           count++
       }else {
           return count
       }
   }
   return count
};