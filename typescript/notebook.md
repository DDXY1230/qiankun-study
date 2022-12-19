## typescript 学习笔记

类型安全: 强类型 弱类型

1. `yarn nint -y`
2. `yarn add typescrit --dev`
3. 命令行执行 tsc xxx.ts 会输出一个.js 的文件
4. tsc 不仅仅编译一个 ts 文件,他还可以编译整个项目
5. 命令行执行 `yarn tsc --init` 会在项目目录下生成一个 tsconfig.json 文件

- target 编译成的结果标准
- module 输出的代码采用什么方式模块化
-

6. `tsc` 按照配置文件输出 课程说是 yarn tsc 但是我电脑只要 tsc 就可以了,不知道为什么
   "target": "es5",  
   "module": "commonjs",  
   "lib": ["ES2015","DOM"], // symbol console 爆红线
