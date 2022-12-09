## 一个简单的教授教练习

1. yarn init
2. 创建一个cli.js文件, 修改文件头,修改读写权限
3. 在package.json中添加bin:cli.js 用于指定入口文件
4. 然后在命令行 yarn link 链接到全局
5. 然后在命令行执行: sample-scaffolding
6. mac 或者 linux需要修改读写权限为755
    返回文件上一层: sudo chmod -R 755 你的文件夹名
