
创建react项目: create-react-app study-react
## yarn create react-app qiankun-base --template typescript

如果上述命令安装过程中报错 error An unexpected error occurred: "https://registry.npmjs.org/create-react-app: ETIMEDOUT".
可以运行`yarn config set "strict-ssl" false -g`或者`npm config set "strict-ssl" false -g` 试试

## 再不行就切换镜像到淘宝镜像

`npm install -g cnpm --registry=https://registry.npm.taobao.org`
`npm config set registry https://registry.npm.taobao.org`
`npm get registry`

## 搭建 vue3 子应用(如果尚未安装过 vue cli)

`npm install --global @vue/cli@next`  // 全局安装vue-cli
创建一个新项目 创建vue3项目的方法
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



## git提交代码的钩子函数
"husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged && concurrently npm:test npm:lint"
    }
  },

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

## 好用的 cdn 工具

1. vscode 插件搜索 jsDelivr => 安装好之后, command + P 调出命令 输入:`>jsDelivr` 回车
   选择 jsdelivr 选择需要的 cdn 即可


## 用vite创建vue项目
1. `yarn create vite`  然后输入名字.....
2. `yarn add @vitejs/plugin-vue-jsx -D   ` 如果要在vite项目中写jsx需要安装这个插件
