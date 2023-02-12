// rollup的配置
console.log('环境变量', process.env.TARGET)
const path = require('path')
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const json = require('@rollup/plugin-json')
const resolvePlugin = require('@rollup/plugin-node-resolve')
const ts = require('rollup-plugin-typescript2')
console.log('packageDir', packageDir)

const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve('package.json')) // 拿到每个模块的package.jsonss
console.log('pkg', pkg)
// 对打包类型做一个映射表  
const name = path.basename(packageDir) // 取当前路径最后面的那个名字
console.log('name', name)
const outputConfig = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  "cjs": {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  },
  "global": {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife' // 立即执行函数
  }
}
const options = pkg.buildOptions; // 自己在package里面定义的格式数据

function createConfig(format, output) {
  output.name = options.name
  output.sourcemap = true
  console.log('===1',format, '===2',output)
  // 产生打包配置
  return {
    input: resolve(`src/index.ts`),
    output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      resolvePlugin()
    ]
  }
}
// 最终 rollup需要导出一个配置对象
const rollupConfig = options.formats.map(format => {
  // console.log(format)
  //  打包吧
  return createConfig(format, outputConfig[format])
})
module.exports = rollupConfig