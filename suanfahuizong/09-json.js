const json = {
  a: {b: {c: '111'}},
  // d: [1,2]
}
const dfs = (n) => {
  Object.keys(n).forEach(k => {
    console.log('===>',k)
    // dfs(n[k])
  })
}
dfs(json)