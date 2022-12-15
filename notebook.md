## yarn create react-app qiankun-base --template typescript

如果上述命令安装过程中报错 error An unexpected error occurred: "https://registry.npmjs.org/create-react-app: ETIMEDOUT".
可以运行`yarn config set "strict-ssl" false -g`或者`npm config set "strict-ssl" false -g` 试试

## 再不行就切换镜像到淘宝镜像

`npm install -g cnpm --registry=https://registry.npm.taobao.org`
`npm config set registry https://registry.npm.taobao.org`
`npm get registry`

## 搭建 vue3 子应用(如果尚未安装过 vue cli)

`npm install --global @vue/cli@next`
创建一个新项目
`vue create qiankun-vue3-1`

## 代码提交

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

## 安装 typescript

`npm install -g typescript`

`tsc -v`
自动生成 ts 配置
tsc --init
修改 tsconfig.json 配置
"outDir": "./js",
"strict": false,
然后启动监视任务: 终端-》运行任务=〉监视 tsconfig.jsons

## vscode 一些好用的插件

Live Server 小型服务器

## 代码格式化

//npm i stylelint -D
//npm i stylelint-config-standard
// npm i stylelint-config-sass-guidelines -D

##常用的一键格式化
//npm i prettier -D
// npx prettier style.css --write // 将格式化的文件输出到源文件
// npx prettier . --write // 将所有代码格式化
