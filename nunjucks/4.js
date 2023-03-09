let nunjucks = require('nunjucks')
nunjucks.configure({autoescape: true})
let result1 = nunjucks.renderString(
  `hello {{names | join('-')}}`, {names: ['a','b','c']}
)// hello a-b-c
let result2 = nunjucks.renderString(
  `hello {{names | replace('mm', 'aa')}}`, {names: 'lxm mm'}
)// hello lxm aa
let result3 = nunjucks.renderString(
  `hello {{names | replace('mm', 'aa') | capitalize}}`, {names: 'lxm mm'}
)// hello Lxm aa   首字母大写
console.log(result3)
