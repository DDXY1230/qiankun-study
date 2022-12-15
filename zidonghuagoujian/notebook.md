## 自动化构建学习笔记

1. yarn add sass --dev
2. npm i browser-sync -D 用于启动一个测试服务器
   在 package.json 中 scripts 中添加 "serve": "browser-sync ."

3. `"preserve": "npm run build","serve": "browser-sync ."` 在 package.json 中执行 npm run serve 会先执行 npm run build

4. npm i npm-run-all -D 安装了这个命令,可以在 package.json 中添加`"start": "run-p build serve"` 同时构建和运行服务

```
"scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "serve": "browser-sync . --files \"css/*.css\"",
    "start": "run-p build serve"
  },
```

5. 市面上常用的构建化工具`Grunt Gulp FIS`

## markdown 记笔记学习一下
