const _ = require('lodash')
const log = (v) => {
  console.log(v)
  return v
}
// console.log(log.length) 函数的length值的是函数的实际参数个数
const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})
const split = _.curry((sep, str) => _.split(str, sep))
const join = _.curry((sep, array) => _.join(array, sep))
const map = _.curry((fn, array) => _.map(array, fn))
const f = _.flowRight(join('-'), trace('map 之后打印'), map(_.toLower), trace('split 之后打印'), split(' '))
console.log(f('nerver say good bye-BBBB'))