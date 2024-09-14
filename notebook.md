## wujie 搭建的微应用

- main: vue3-main
- sub1: vue3-sub-1
- sub2: vue3-sub-2

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
git remote rm name // # 删除远程仓库
git remote rename old_name new_name // # 修改仓库名
git remote add name 远程仓库地址 // name 为要取的仓库名字 远程仓库地址 为要关联的远程仓库地址
