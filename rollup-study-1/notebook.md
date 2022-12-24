## 
1. npm i rollup -D
2.  yarn rollup ./src/index.js --format iife 自执行的方式
3.  yarn rollup ./src/index.js --format iife --file dist/bundle.js
打包文件到dist/bundle.js中
   iife 最适合浏览器端的自调用函数格式
   

4. rollup 打包简洁,默认回开启tree-shaking, tree-shaking最早也是在rollup中提出的

5. 插件是rollup中唯一的扩展方式,不像webpack可以用插件和loader

6. yarn add rollup-plugin-json --dev

7. rollup配置文件可以使用esModule 所以在配置文件中可以使用import
8. yarn rollup --config rollup.config.js 指定rollup的配置文件

9. yarn add rollup-plugin-commonjs -D 为了实现可倒入commonjs 文件