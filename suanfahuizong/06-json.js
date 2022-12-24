const json = {
  a: {b: {c: 1}},
  d: {e:33}
}
const path = ['a', 'b', 'c']
let p = json
path.forEach(k => {
  p = p[k]
}) 