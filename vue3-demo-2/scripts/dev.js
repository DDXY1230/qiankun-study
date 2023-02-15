// 只针对具体的某个包大包
// 把package下面所有的包都进行打包
const fs = require('fs')
const execa = require('execa') // 开启子进程 进行打包  最终使用rollup打包
// const targets = fs.readdirSync('packages').filter(f => {
//   if(fs.statSync(`packages/${f}`).isDirectory()) { // 判断拿到的是否是文件夹  因为要忽略文件
//     return true
//   }
//   return false // 忽略文件
// })
const targets = ['runtime-dom', 'runtime-core'] // 开发环境手动置需要打包的文件
// 对我们目标进行依次打包,并行打包
async function build(target) {
  console.log('当前打包的文件是==>',target)
  // -cw 会监控
  // await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {stdio: 'inherit'})// 当子进程打包的信息共享给父进程
  await execa('rollup', ['-c','--environment',`TARGET:${target}`],{stdio:'inherit'})
  

}
function runParallel(targets, iteratorFn) {
  const res = []
  for(const item of targets) {
    const p = iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}
runParallel(targets,build).then(() => {
  console.log('成功——————————————————')
})