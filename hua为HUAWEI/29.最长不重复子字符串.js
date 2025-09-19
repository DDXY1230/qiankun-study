function lengthOfLongestSubstring(s) {
  if(s == null || s === '') return 0;
  let str = s.split('')
  let map = new Map()
  for(let i = 0; i < 256;i++) {
    map.set(i, -1)
  }
  map.set(str[0]) = 0
  let N = str.length
  let ans = 1
  let pre = 1
  for(let i = 1; i < N; i++) {
    pre = Math.min(i - map[str[i]], pre + 1)
    ans = Math.max(ans, pre)
    map.set(str[i],i)
  }
  return ans
}