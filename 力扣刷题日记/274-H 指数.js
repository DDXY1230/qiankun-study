var hIndex = function(citations) {
  let n = citations.length,h = 0
  let i = n - 1
  citations.sort((a,b) => a -b)
  while(i >= 0 && citations[i] > h){
    h++
    i--
  }
}