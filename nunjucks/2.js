let nunjucks = require('nunjucks')
let path = require('path')

// 第一个参数是配置视图所在的路径, 当前文件夹中的view文件夹
nunjucks.configure(path.resolve('view'),{autoescape: true}) 
console.log(path.resolve())
console.log(process.cwd('view'))
let result = nunjucks.render('index.html', {name: 'lxm'})// view下面的index.html文件
console.log(result)
