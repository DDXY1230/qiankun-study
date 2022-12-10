test('测试Hello world', () => {
  const helloText = require('../01_test')
  console.log('test==>', helloText)
  expect(helloText)
  .toBe('hello world')
})