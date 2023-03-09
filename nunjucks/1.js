let nunjucks = require('nunjucks')
nunjucks.configure({autoescape: true}) // 自动转译 可以阻挡xss攻击,会把输入的js标签转译掉
let result = nunjucks.renderString(
  `hello {{name}}`, {name: 'lxmmmmm'}
)
console.log(result)
