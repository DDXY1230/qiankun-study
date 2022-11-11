## yarn create react-app qiankun-base --template typescript
如果上述命令安装过程中报错error An unexpected error occurred: "https://registry.npmjs.org/create-react-app: ETIMEDOUT".
可以运行`yarn config set "strict-ssl" false -g`或者`npm config set "strict-ssl" false -g` 试试

再不行就切换镜像到淘宝镜像
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
`npm config set registry https://registry.npm.taobao.org`
`npm get registry`


echo "# study-react" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/DDXY1230/study-react.git
git push -u origin main

git remote -v // 查看本地已经关联的远程仓库
git remote rm name  // # 删除远程仓库
git remote rename old_name new_name  // # 修改仓库名
git remote add name 远程仓库地址 // name 为要取的仓库名字 远程仓库地址 为要关联的远程仓库地址



