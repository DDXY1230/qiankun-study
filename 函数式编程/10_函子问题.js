const fs = require('fs')
const fp = require('lodash/fp')
class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }
  join() {
    return this._value()
  }
  flatMap(fn) {
    return this.map(fn).join()
  }
  constructor(fn) {
    this._value = fn
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}
let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}
let print = function (x) {
  return new IO(function () {
    // console.log(x)
    return x
  })
}
let cat = fp.flowRight(print, readFile)
// console.log(cat)
let r = cat('package.json')
// console.log(r)
// console.log(r._value()._value())
let r1 = readFile('package.json').map(x => x.toUpperCase()).flatMap(print).join()
console.log(r1)