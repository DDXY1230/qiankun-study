// either 函子
class Left {
  static of (value) {
    return new Left(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return this
  }
}
class Right {
  static of (value) {
    return new Right(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Right.of(fn(this._value))
  }
}
// let r1 = Right.of(12).map(x => x + 2)
// let l1 = Left.of(12).map(x => x + 2)
// console.log(r1)
// console.log(l1)

function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str))
  } catch (e) {
    return Left.of({
      error: e.message
    })
  }
}
let rr = parseJSON('{name: zs}')
let rr1 = parseJSON('{"name": "zs"}').map(x => x.name.toUpperCase())
console.log(rr)
console.log(rr1)