require('./index.scss')
console.log('webpack打99999')
console.log('webpack打99999')
console.log('热模块替换')
if(process.env.NODE_ENV == 'development') {
  console.log('baseurl is localhost')
}else {
  console.log('baseurl is lxm.com')
}
const dfs = () => {
  console.log('这是一个箭头函数')
}
dfs()