const {
  compose,
  curry
} = require('folktale/core/lambda')
const {
  toUpper,
  first,
  split,
  find
} = require('lodash/fp')
const fs = require('fs')
const {
  task
} = require('folktale/concurrency/task')

let f = curry(2, (x, y) => {
  return x + y
})
// console.log(f(2)(3))
// console.log(f(2, 3))
let f1 = compose(toUpper, first)
// console.log(f1(['one', 'two', 'three']))
//-----------------------------------
function readFile(filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) resolver.reject(err)
      resolver.resolve(data)
    })
  })
}
readFile('package.json')
  .map(split('\n'))
  .map(find(x => x.includes('version')))
  .run().listen({
    onRejected: err => {
      consolej.log(err)
    },
    onResolved: value => {
      console.log(value)
    }
  })