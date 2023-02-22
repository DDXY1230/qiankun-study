const nodeResolve = require('@rollup/plugin-node-resolve')
const ts = require('rollup-plugin-typescript2')
const serve = require('rollup-plugin-serve')
const path = require('path')
module.exports = {
  input: 'src/index.ts',
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'),
    format: 'iife',
    // global 一个全局变量来接收
    // cjs 变成module.exports     
    // esm export default 
    // iife()
    // umd
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      port: 3000,
      contentBase: '',
      openPage: '/public',
      open: true
    })
  ]
}